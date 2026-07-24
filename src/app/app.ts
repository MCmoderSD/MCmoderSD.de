import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {ToolIcon, ToolIconSize, ToolIconVariant} from "../lib/tool-icon-types";

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

  protected readonly tool = ToolIcon;
  protected readonly size = ToolIconSize;
  protected readonly variant = ToolIconVariant;

  protected onMouseMove(event: MouseEvent): void {
    const root = this.document.documentElement.style;
    root.setProperty('--cursor-x', `${event.clientX}px`);
    root.setProperty('--cursor-y', `${event.clientY}px`);
  }
}