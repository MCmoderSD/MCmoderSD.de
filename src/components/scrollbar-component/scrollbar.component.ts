import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  type EffectCleanupRegisterFn,
  inject,
  input,
  type InputSignal,
  type Signal,
  signal,
  type WritableSignal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

const MIN_THUMB_HEIGHT: number = 32;
const HIDDEN_QUERY: string = '(pointer: coarse), (hover: none)';

interface DragOrigin {
  pointerY: number;
  scrollTop: number;
}

@Component({
  selector: 'app-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrl: './scrollbar.component.scss',
  host: {
    '[class.scrollbar--dragging]': 'dragging()',
    '[class.scrollbar--inline]': 'target() !== null',
    '[class.scrollbar--revealed]': 'hovered()',
    '(document:pointermove)': 'onPointerMove($event)',
    '(document:pointerup)': 'onPointerUp()',
    '(document:pointercancel)': 'onPointerUp()',
    '(window:resize)': 'measure()',
  },
})
export class ScrollbarComponent {

  private readonly document: Document = inject(DOCUMENT);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  /**
   * The element whose overflow this bar drives. Left unset it drives the page itself, which is the
   * single instance the app shell renders. Pass a scroll container - a dialog's content, say - and
   * the same bar floats inside that container instead, so a scrollable region that is not the page
   * gets this bar rather than the native one it would otherwise fall back to.
   */
  readonly target: InputSignal<HTMLElement | null> = input<HTMLElement | null>(null);

  private readonly scrollTop: WritableSignal<number> = signal(0);
  private readonly scrollHeight: WritableSignal<number> = signal(0);
  private readonly viewportHeight: WritableSignal<number> = signal(0);

  protected readonly dragging: WritableSignal<boolean> = signal(false);

  /**
   * Only ever set in target mode. The page instance is revealed by the right-edge proximity class
   * instead (see the stylesheet), and a scroll container sitting in the middle of the page has no
   * equivalent of that signal - so there, pointing at the content is what asks for the bar.
   */
  protected readonly hovered: WritableSignal<boolean> = signal(false);

  private readonly hidden: WritableSignal<boolean> = signal(false);
  private readonly rendered: WritableSignal<boolean> = signal(false);

  protected readonly scrollable: Signal<boolean> = computed(
    (): boolean => this.scrollHeight() - this.viewportHeight() > 1,
  );

  protected readonly thumbHeight: Signal<number> = computed((): number => {
    const content: number = this.scrollHeight();
    const viewport: number = this.viewportHeight();
    if (content <= 0) return 0;

    return Math.max(MIN_THUMB_HEIGHT, Math.round((viewport / content) * viewport));
  });

  protected readonly thumbOffset: Signal<number> = computed((): number => {
    const travel: number = this.scrollHeight() - this.viewportHeight();
    if (travel <= 0) return 0;

    return ((this.viewportHeight() - this.thumbHeight()) * this.scrollTop()) / travel;
  });

  private dragOrigin: DragOrigin = { pointerY: 0, scrollTop: 0 };

  constructor() {
    afterNextRender((): void => {
      const view: Window | null = this.document.defaultView;
      const query: MediaQueryList | null = view === null ? null : view.matchMedia(HIDDEN_QUERY);

      const sync: () => void = (): void => {
        this.hidden.set(query !== null && query.matches);
        this.measure();
      };

      sync();

      if (query !== null) {
        query.addEventListener('change', sync);
        this.destroyRef.onDestroy((): void => query.removeEventListener('change', sync));
      }

      this.rendered.set(true);
    });

    // Everything the effect wires up touches the DOM, so it waits on the render flag rather than
    // running on the server. Past that it re-runs whenever the target changes, which is what lets
    // one component serve both the page and a container without either knowing about the other.
    effect((onCleanup: EffectCleanupRegisterFn): void => {
      if (!this.rendered()) return;
      onCleanup(this.watch(this.target()));
    });
  }

  /** The element being scrolled: the target when there is one, the page otherwise. */
  private scroller(): HTMLElement {
    return this.target() ?? this.document.documentElement;
  }

  /** Subscribes to everything that can move the thumb; returns the teardown for all of it. */
  private watch(target: HTMLElement | null): () => void {
    const measure: () => void = (): void => this.measure();

    // Scrolling the page is reported at the document rather than at <html>, so the page case has to
    // listen somewhere other than the element it measures.
    const source: EventTarget | null = target ?? this.document.defaultView;
    source?.addEventListener('scroll', measure, { passive: true });

    // A scroll container's own box does not grow when its contents do - that is what makes it one -
    // so the children are what has to be watched for the thumb to stay honest about the travel.
    const resizes: ResizeObserver = new ResizeObserver(measure);
    const observed: Element[] = target === null
      ? [this.document.body]
      : [target, ...Array.from(target.children)];
    for (const element of observed) resizes.observe(element);

    // A Material overlay pins <html> to position: fixed for as long as it is open, which takes the
    // page's overflow away without firing a scroll or a resize. Nothing else would tell this bar
    // that the travel it is drawing no longer exists, and it would sit there with a thumb that
    // answers to nothing. The class the CDK sets alongside those styles is the notification.
    //
    // Attributes only, and only the class: the per-frame cursor variables app.ts writes to the same
    // element land in its style attribute and are deliberately not woken up here, and
    // classList.toggle mutates only on an actual change - crossing the reveal band, not every move.
    const mutations: MutationObserver = new MutationObserver(measure);
    if (target === null) {
      mutations.observe(this.document.documentElement, { attributeFilter: ['class'] });
    }

    const enter: () => void = (): void => this.hovered.set(true);
    const leave: () => void = (): void => this.hovered.set(false);
    target?.addEventListener('pointerenter', enter);
    target?.addEventListener('pointerleave', leave);

    this.measure();

    return (): void => {
      source?.removeEventListener('scroll', measure);
      target?.removeEventListener('pointerenter', enter);
      target?.removeEventListener('pointerleave', leave);
      resizes.disconnect();
      mutations.disconnect();
      this.hovered.set(false);
    };
  }

  protected measure(): void {
    if (this.hidden()) return;

    const element: HTMLElement = this.scroller();
    this.scrollTop.set(element.scrollTop);
    this.scrollHeight.set(element.scrollHeight);
    this.viewportHeight.set(element.clientHeight);
  }

  protected onThumbPointerDown(event: PointerEvent): void {
    event.preventDefault();

    this.dragging.set(true);
    this.dragOrigin = { pointerY: event.clientY, scrollTop: this.scrollTop() };

    (event.target as Element).setPointerCapture(event.pointerId);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) return;

    const track: number = this.viewportHeight() - this.thumbHeight();
    if (track <= 0) return;

    const travel: number = this.scrollHeight() - this.viewportHeight();
    const moved: number = event.clientY - this.dragOrigin.pointerY;

    this.scroller().scrollTop = this.dragOrigin.scrollTop + (moved * travel) / track;
  }

  protected onPointerUp(): void {
    this.dragging.set(false);
  }
}
