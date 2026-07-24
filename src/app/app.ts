import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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

  protected onMouseMove(event: MouseEvent): void {
    const root = this.document.documentElement.style;
    root.setProperty('--cursor-x', `${event.clientX}px`);
    root.setProperty('--cursor-y', `${event.clientY}px`);
  }
}