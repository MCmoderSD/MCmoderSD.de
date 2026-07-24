import { Component, inject } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';

/** Height of the fixed navbar, so fragment jumps land below it. Matches app.scss padding-top. */
const SCROLL_OFFSET = 104;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
  },
})
export class App {
  private readonly document = inject(DOCUMENT);

  constructor() {
    // Angular scrolls to fragments with window.scrollTo() rather than scrollIntoView,
    // so it ignores scroll-margin-top and needs the navbar height declared here.
    inject(ViewportScroller).setOffset([0, SCROLL_OFFSET]);
  }

  protected onMouseMove(event: MouseEvent): void {
    const root = this.document.documentElement.style;
    root.setProperty('--cursor-x', `${event.clientX}px`);
    root.setProperty('--cursor-y', `${event.clientY}px`);
  }
}