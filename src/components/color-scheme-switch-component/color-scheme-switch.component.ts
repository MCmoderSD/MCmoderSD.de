import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type ColorScheme = 'light' | 'dark';

/** Shared with the bootstrap script in index.html, which reads it before the first paint. */
const STORAGE_KEY = 'color-scheme';

/**
 * Storage is treated as a nicety rather than a dependency: reading or writing it throws outright in
 * a partitioned third-party context and in some private modes, and the object is missing entirely
 * outside a browser. Losing the preference is survivable, taking the switch down with it is not.
 */
function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStored(value: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Nothing to recover: the switch still works for this page view, it just will not be remembered.
  }
}

@Component({
  selector: 'app-color-scheme-switch',
  templateUrl: './color-scheme-switch.component.html',
  styleUrl: './color-scheme-switch.component.scss',
  standalone: false,
})
export class ColorSchemeSwitchComponent {

  private readonly document = inject(DOCUMENT);

  /** Dark is the default absent any stored preference - matches :root, which defines the dark palette. */
  protected readonly scheme = signal<ColorScheme>('dark');
  protected readonly isLight = computed(() => this.scheme() === 'light');

  constructor() {
    // Guarded to the browser: the server has no localStorage, and a prerendered attribute would
    // never match a client whose stored preference differs, causing a hydration mismatch.
    afterNextRender(() => {
      if (readStored() === 'light') {
        this.apply('light', false);
      }
    });
  }

  protected toggle(): void {
    this.apply(this.scheme() === 'dark' ? 'light' : 'dark', true);
  }

  private apply(scheme: ColorScheme, persist: boolean): void {
    this.scheme.set(scheme);

    // No attribute at all means dark, so the default markup needs no theme selector of its own.
    if (scheme === 'light') {
      this.document.documentElement.setAttribute('data-theme', 'light');
    } else {
      this.document.documentElement.removeAttribute('data-theme');
    }

    if (persist) {
      writeStored(scheme);
    }
  }
}
