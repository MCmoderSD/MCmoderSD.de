import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Floor on the thumb, so a very long page still leaves something you can actually grab. */
const MIN_THUMB_HEIGHT = 32;

/**
 * Replacement for the native viewport scrollbar, which styles.scss removes. It floats over the
 * content rather than reserving a gutter beside it, which is what keeps the page background
 * unbroken all the way to the right edge - see the comment there for why the native one could not.
 *
 * Reveal is not this component's decision: app.ts puts .scrollbar-visible on <html> while the
 * pointer is near the right edge, and the stylesheet keys off that. Here it only stays pinned open
 * for the duration of a drag.
 */
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
  /** Also the track height: the host is inset to the full viewport height. */
  private readonly viewportHeight: WritableSignal<number> = signal(0);

  protected readonly dragging: WritableSignal<boolean> = signal(false);

  /** A thumb that fills the whole track is just a decoration, so nothing is drawn in that case. */
  protected readonly scrollable: Signal<boolean> = computed(
    () => this.scrollHeight() - this.viewportHeight() > 1,
  );

  protected readonly thumbHeight: Signal<number> = computed(() => {
    const content = this.scrollHeight();
    const viewport = this.viewportHeight();
    if (content <= 0) return 0;

    return Math.max(MIN_THUMB_HEIGHT, Math.round((viewport / content) * viewport));
  });

  protected readonly thumbOffset: Signal<number> = computed(() => {
    const travel = this.scrollHeight() - this.viewportHeight();
    if (travel <= 0) return 0;

    return ((this.viewportHeight() - this.thumbHeight()) * this.scrollTop()) / travel;
  });

  /** Pointer position and scroll offset at the moment the drag started. */
  private dragOrigin = { pointerY: 0, scrollTop: 0 };

  constructor() {
    afterNextRender(() => {
      this.measure();

      // Route changes and image loads change the document height without a scroll or a resize, and
      // a thumb sized against a stale height is worse than no thumb at all.
      const observer = new ResizeObserver(() => this.measure());
      observer.observe(this.document.body);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /**
   * Reading three layout properties per scroll event is deliberate: they are all already computed
   * for the scroll itself, so this forces no extra layout, and the signals below only notify when
   * a value actually changed.
   */
  protected measure(): void {
    const root = this.document.documentElement;
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
    const track = this.viewportHeight() - this.thumbHeight();
    if (track <= 0) return;

    const travel = this.scrollHeight() - this.viewportHeight();
    const moved = event.clientY - this.dragOrigin.pointerY;

    this.document.documentElement.scrollTop = this.dragOrigin.scrollTop + (moved * travel) / track;
  }

  protected onPointerUp(): void {
    this.dragging.set(false);
  }
}
