import { afterNextRender, Component, computed, DestroyRef, effect, type EffectCleanupRegisterFn, inject, input, type InputSignal, type Signal, signal, type WritableSignal } from '@angular/core';
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

  readonly target: InputSignal<HTMLElement | null> = input<HTMLElement | null>(null);

  private readonly scrollTop: WritableSignal<number> = signal(0);
  private readonly scrollHeight: WritableSignal<number> = signal(0);
  private readonly viewportHeight: WritableSignal<number> = signal(0);

  protected readonly dragging: WritableSignal<boolean> = signal(false);
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

  private readonly dragOrigin: WritableSignal<DragOrigin> = signal<DragOrigin>({ pointerY: 0, scrollTop: 0 });

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

    effect((onCleanup: EffectCleanupRegisterFn): void => {
      if (!this.rendered()) return;
      onCleanup(this.watch(this.target()));
    });
  }

  private scroller(): HTMLElement {
    return this.target() ?? this.document.documentElement;
  }

  private watch(target: HTMLElement | null): () => void {
    const measure: () => void = (): void => this.measure();

    const source: EventTarget | null = target ?? this.document.defaultView;
    source?.addEventListener('scroll', measure, { passive: true });

    const resizes: ResizeObserver = new ResizeObserver(measure);
    const observed: Element[] = target === null
      ? [this.document.body]
      : [target, ...Array.from(target.children)];
    for (const element of observed) resizes.observe(element);

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
    this.dragOrigin.set({ pointerY: event.clientY, scrollTop: this.scrollTop() });

    (event.target as Element).setPointerCapture(event.pointerId);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) return;

    const track: number = this.viewportHeight() - this.thumbHeight();
    if (track <= 0) return;

    const travel: number = this.scrollHeight() - this.viewportHeight();
    const origin: DragOrigin = this.dragOrigin();
    const moved: number = event.clientY - origin.pointerY;

    this.scroller().scrollTop = origin.scrollTop + (moved * travel) / track;
  }

  protected onPointerUp(): void {
    this.dragging.set(false);
  }
}