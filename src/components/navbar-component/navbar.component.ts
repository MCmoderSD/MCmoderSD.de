import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface NavLink {
  path: string;
  label: string;
  /** Only "/" needs an exact match; any other path is the root of its own subtree. */
  exact?: boolean;
}

/** Where one link sits inside .navbar__links, which is where the pill has to move to. */
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

  private readonly destroyRef = inject(DestroyRef);
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');
  private readonly linkElements = viewChildren<ElementRef<HTMLAnchorElement>>('linkElement');

  protected readonly links: NavLink[] = [
    { path: '/', label: 'Home', exact: true },
    // No "About" entry: it is what "/" serves while the startpage is disabled.
    { path: '/projects', label: 'Projects' },
    { path: '/dependencies', label: 'Dependencies' },
    { path: '/services', label: 'Services' },
  ];

  /** -1 on pages that have no navbar entry, e.g. /imprint - the pill is hidden there. */
  protected readonly activeIndex = signal(-1);

  /**
   * Empty until the first browser-side measurement; the server has no layout to measure. The pill
   * is therefore never in the prerendered HTML, and gets inserted with its final position already
   * bound - a freshly inserted element has no previous value to transition from, so it appears in
   * place instead of sliding in from the left.
   */
  private readonly bounds = signal<LinkBounds[]>([]);

  protected readonly pill = computed(() => this.bounds()[this.activeIndex()] ?? null);

  /** Guards the layout reads in measure(), which the server's DOM emulation cannot answer. */
  private rendered = false;

  constructor() {
    // The active link is derived from the URL rather than read back from routerLinkActive's
    // class, so the pill's target never depends on when that directive updates the DOM.
    const router = inject(Router);
    this.setActive(router.url);

    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.setActive(event.urlAfterRedirects);
        // Navigating does not move the links, so this is not what keeps the pill in sync - it is
        // a second, independent chance to pick up a layout change, since the link widths now
        // scale with the viewport and a missed resize would leave the pill visibly offset.
        this.measure();
      });

    afterNextRender(() => {
      this.rendered = true;
      this.measure();

      // Navigating never moves the links themselves, only the pill, so re-measuring is only
      // needed when layout actually changes: a window resize, or the webfont swapping in.
      // Deliberately not relied on for the first measurement above.
      const observer = new ResizeObserver(() => this.measure());
      observer.observe(this.list().nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private setActive(url: string): void {
    // Query strings and fragments do not select a different nav entry.
    const path = url.split(/[?#]/)[0];

    this.activeIndex.set(
      this.links.findIndex((link) => (link.exact ? path === link.path : path.startsWith(link.path))),
    );
  }

  private measure(): void {
    if (!this.rendered) {
      return;
    }

    this.bounds.set(
      this.linkElements().map(({ nativeElement }) => ({
        left: nativeElement.offsetLeft,
        width: nativeElement.offsetWidth,
      })),
    );
  }
}
