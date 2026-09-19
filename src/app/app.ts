import { Component, DestroyRef, inject, signal, type WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from '../components/navbar-component/navbar.component';
import { ColorSchemeSwitchComponent } from '../components/color-scheme-switch-component/color-scheme-switch.component';
import { FooterComponent } from '../components/footer-component/footer.component';
import { ScrollbarComponent } from '../components/scrollbar-component/scrollbar.component';

const SCROLL_OFFSET: number = 104;
const SCROLLBAR_REVEAL_ZONE: number = 48;
const TOGGLE_REVEAL_ZONE: number = 140;
const CANONICAL_ORIGIN: string = 'https://mcmodersd.de';

interface Pointer {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, NavbarComponent, ColorSchemeSwitchComponent, FooterComponent, ScrollbarComponent],
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseleave)': 'onMouseLeave()'
  }
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly pointer: WritableSignal<Pointer | null> = signal<Pointer | null>(null);
  private readonly frame: WritableSignal<number> = signal(0);

  constructor() {
    inject(ViewportScroller).setOffset([0, SCROLL_OFFSET]);

    inject(Router).events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      ).subscribe((event: NavigationEnd): void => this.setCanonical(event.urlAfterRedirects));

    this.destroyRef.onDestroy((): void => {
      const frame: number = this.frame();
      if (frame) cancelAnimationFrame(frame);
    });
  }

  protected onMouseMove(event: MouseEvent): void {
    this.pointer.set({ x: event.clientX, y: event.clientY });
    if (this.frame()) return;

    this.frame.set(requestAnimationFrame((): void => {
      this.frame.set(0);
      const pointer: Pointer | null = this.pointer();
      if (!pointer) return;

      const html: HTMLElement = this.document.documentElement;
      const root: CSSStyleDeclaration = html.style;
      root.setProperty('--cursor-x', `${pointer.x}px`);
      root.setProperty('--cursor-y', `${pointer.y}px`);

      const view: Window | null = this.document.defaultView;
      if (view === null) return;

      const fromRight: number = view.innerWidth - pointer.x;
      html.classList.toggle('scrollbar-visible', fromRight <= SCROLLBAR_REVEAL_ZONE);
      html.classList.toggle('toggle-visible', fromRight <= TOGGLE_REVEAL_ZONE);
    }));
  }

  protected onMouseLeave(): void {
    this.pointer.set(null);
    this.document.documentElement.classList.remove('scrollbar-visible', 'toggle-visible');
  }

  private setCanonical(url: string): void {
    const head: HTMLHeadElement = this.document.head;
    let link: HTMLLinkElement | null = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      head.appendChild(link);
    }

    link.href = CANONICAL_ORIGIN + url.split(/[?#]/)[0];
  }
}