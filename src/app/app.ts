import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Height of the fixed navbar, so fragment jumps land below it. Matches app.scss padding-top. */
const SCROLL_OFFSET = 104;

/**
 * How close to the right edge the pointer has to be before the scrollbar reveals itself. Wider
 * than the scrollbar's own hit area (see styles.scss) so it can be found without pixel-perfect
 * aim, narrow enough that it still reads as "went all the way to the edge" rather than "hovered
 * the page".
 */
const SCROLLBAR_REVEAL_ZONE = 48;

/**
 * The same idea for the colour scheme switch, but a wider band: the control sits about 54px in
 * from the right edge, so a 48px zone would stop matching exactly as the pointer arrives on it and
 * the button would fade out from under the cursor. This has to comfortably contain the control
 * plus the approach to it.
 */
const TOGGLE_REVEAL_ZONE = 140;

/** The site answers on mcmodersd.de and www.mcmodersd.de, so pick one for search engines. */
const CANONICAL_ORIGIN = 'https://mcmodersd.de';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    // Otherwise the last pointer position (possibly inside the reveal zone) lingers forever once
    // the mouse leaves the viewport - e.g. onto the OS taskbar - since no further mousemove fires
    // to correct it.
    '(document:mouseleave)': 'onMouseLeave()',
  },
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  /** Latest pointer position, flushed to CSS once per frame instead of once per event. */
  private pointer: { x: number; y: number } | null = null;
  private frame = 0;

  constructor() {
    // Angular scrolls to fragments with window.scrollTo() rather than scrollIntoView,
    // so it ignores scroll-margin-top and needs the navbar height declared here.
    inject(ViewportScroller).setOffset([0, SCROLL_OFFSET]);

    inject(Router).events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      ).subscribe((event) => this.setCanonical(event.urlAfterRedirects));

    // Guarded because a frame is only ever scheduled in the browser, and cancelAnimationFrame
    // is not part of the server platform's globals.
    this.destroyRef.onDestroy(() => {
      if (this.frame) {
        cancelAnimationFrame(this.frame);
      }
    });
  }

  protected onMouseMove(event: MouseEvent): void {
    // Writing --cursor-x/y on :root invalidates style for the whole tree, so coalesce the
    // ~120 events/s a mouse produces down to one write per animation frame.
    this.pointer = { x: event.clientX, y: event.clientY };
    if (this.frame) return;

    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      const pointer = this.pointer;
      if (!pointer) return;

      const html = this.document.documentElement;
      const root = html.style;
      root.setProperty('--cursor-x', `${pointer.x}px`);
      root.setProperty('--cursor-y', `${pointer.y}px`);

      // innerWidth rather than the html element's width: the scrollbar itself sits in that gap,
      // so measuring against the element it lives on would shrink the reveal zone by its own width.
      const view = this.document.defaultView;
      if (view === null) return;

      const fromRight = view.innerWidth - pointer.x;
      html.classList.toggle('scrollbar-visible', fromRight <= SCROLLBAR_REVEAL_ZONE);
      html.classList.toggle('toggle-visible', fromRight <= TOGGLE_REVEAL_ZONE);
    });
  }

  protected onMouseLeave(): void {
    this.pointer = null;
    this.document.documentElement.classList.remove('scrollbar-visible', 'toggle-visible');
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      head.appendChild(link);
    }

    // Fragments and query strings do not identify a separate document here.
    link.href = CANONICAL_ORIGIN + url.split(/[?#]/)[0];
  }
}