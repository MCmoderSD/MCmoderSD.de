import { afterNextRender, Component, computed, DestroyRef, ElementRef, inject, type Signal, signal, viewChild, viewChildren, type WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface NavLink {
  path: string;
  label: string;
  exact?: boolean;
}

interface LinkBounds {
  left: number;
  width: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: false,
})
export class NavbarComponent {

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly list: Signal<ElementRef<HTMLElement>> = viewChild.required<ElementRef<HTMLElement>>('list');
  private readonly linkElements: Signal<readonly ElementRef<HTMLAnchorElement>[]> = viewChildren<ElementRef<HTMLAnchorElement>>('linkElement');

  protected readonly links: NavLink[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/projects', label: 'Projects' },
    { path: '/dependencies', label: 'Dependencies' },
    { path: '/services', label: 'Services' },
  ];

  protected readonly activeIndex: WritableSignal<number> = signal(-1);

  private readonly bounds: WritableSignal<LinkBounds[]> = signal<LinkBounds[]>([]);

  protected readonly pill: Signal<LinkBounds | null> = computed((): LinkBounds | null => this.bounds()[this.activeIndex()] ?? null);

  private rendered: boolean = false;

  constructor() {
    const router: Router = inject(Router);
    this.setActive(router.url);

    router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      ).subscribe((event: NavigationEnd): void => {
        this.setActive(event.urlAfterRedirects);
        this.measure();
      });

    afterNextRender((): void => {
      this.rendered = true;
      this.measure();

      const observer = new ResizeObserver((): void => this.measure());
      observer.observe(this.list().nativeElement);

      this.destroyRef.onDestroy((): void => observer.disconnect());
    });
  }

  private setActive(url: string): void {
    const path: string = url.split(/[?#]/)[0] ?? '';

    this.activeIndex.set(
      this.links.findIndex((link: NavLink): boolean => (link.exact ? path === link.path : path.startsWith(link.path))),
    );
  }

  private measure(): void {
    if (!this.rendered) return;

    this.bounds.set(
      this.linkElements().map(({ nativeElement }: ElementRef<HTMLAnchorElement>): LinkBounds => ({
        left: nativeElement.offsetLeft,
        width: nativeElement.offsetWidth,
      })),
    );
  }
}