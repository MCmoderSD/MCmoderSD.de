import { afterNextRender, Component, computed, DestroyRef, inject, type Signal, signal, type WritableSignal,} from '@angular/core';
import { DOCUMENT } from '@angular/common';

const MIN_THUMB_HEIGHT: number = 32;
const HIDDEN_QUERY: string = '(pointer: coarse), (hover: none)';

@Component({
  selector: 'app-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrl: './scrollbar.component.scss',
  standalone: false,
  host: {
    '[class.scrollbar--dragging]': 'dragging()',
    '(document:pointermove)': 'onPointerMove($event)',
    '(document:pointerup)': 'onPointerUp()',
    '(document:pointercancel)': 'onPointerUp()',
    '(window:scroll)': 'measure()',
    '(window:resize)': 'measure()',
  },
})
export class ScrollbarComponent {

  private readonly document: Document = inject(DOCUMENT);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private readonly scrollTop: WritableSignal<number> = signal(0);
  private readonly scrollHeight: WritableSignal<number> = signal(0);
  private readonly viewportHeight: WritableSignal<number> = signal(0);

  protected readonly dragging: WritableSignal<boolean> = signal(false);

  private readonly hidden: WritableSignal<boolean> = signal(false);

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

  private dragOrigin = { pointerY: 0, scrollTop: 0 };

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;
      const query = view === null ? null : view.matchMedia(HIDDEN_QUERY);

      const sync: () => void = (): void => {
        this.hidden.set(query !== null && query.matches);
        this.measure();
      };

      sync();

      if (query !== null) {
        query.addEventListener('change', sync);
        this.destroyRef.onDestroy((): void => query.removeEventListener('change', sync));
      }

      // Route changes and image loads change the document height without a scroll or a resize, and
      // a thumb sized against a stale height is worse than no thumb at all.
      const observer = new ResizeObserver(() => this.measure());
      observer.observe(this.document.body);
      this.destroyRef.onDestroy((): void => observer.disconnect());
    });
  }

  protected measure(): void {
    if (this.hidden()) return;

    const root: HTMLElement = this.document.documentElement;
    this.scrollTop.set(root.scrollTop);
    this.scrollHeight.set(root.scrollHeight);
    this.viewportHeight.set(root.clientHeight);
  }

  protected onThumbPointerDown(event: PointerEvent): void {
    // Stops the drag from turning into a text selection of whatever is behind the bar.
    event.preventDefault();

    this.dragging.set(true);
    this.dragOrigin = { pointerY: event.clientY, scrollTop: this.scrollTop() };

    // Capture keeps the moves coming even when the pointer slides off the thumb mid-drag, which is
    // exactly what happens on a bar this narrow.
    (event.target as Element).setPointerCapture(event.pointerId);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) return;

    // The thumb travels the track, the page travels the overflow, so a pixel of pointer movement is
    // worth the ratio between the two.
    const track: number = this.viewportHeight() - this.thumbHeight();
    if (track <= 0) return;

    const travel: number = this.scrollHeight() - this.viewportHeight();
    const moved: number = event.clientY - this.dragOrigin.pointerY;

    this.document.documentElement.scrollTop = this.dragOrigin.scrollTop + (moved * travel) / track;
  }

  protected onPointerUp(): void {
    this.dragging.set(false);
  }
}