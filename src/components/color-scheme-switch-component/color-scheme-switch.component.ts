import { afterNextRender, Component, computed, inject, type Signal, signal, type WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { readStored, writeStored } from '../../helper/storage-helper';

export enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

@Component({
  selector: 'app-color-scheme-switch',
  templateUrl: './color-scheme-switch.component.html',
  styleUrl: './color-scheme-switch.component.scss',
  standalone: false,
})
export class ColorSchemeSwitchComponent {

  private readonly document: Document = inject(DOCUMENT);

  protected readonly scheme: WritableSignal<ColorScheme> = signal<ColorScheme>(ColorScheme.Dark);
  protected readonly isLight: Signal<boolean> = computed((): boolean => this.scheme() === ColorScheme.Light);

  constructor() {
    afterNextRender((): void => {
      if (readStored('color-scheme') === ColorScheme.Light) {
        this.apply(ColorScheme.Light, false);
      }
    });
  }

  protected toggle(): void {
    this.apply(this.scheme() === ColorScheme.Dark ? ColorScheme.Light : ColorScheme.Dark, true);
  }

  private apply(scheme: ColorScheme, persist: boolean): void {
    this.scheme.set(scheme);

    if (scheme === ColorScheme.Light) {
      this.document.documentElement.setAttribute('data-theme', ColorScheme.Light);
    } else {
      this.document.documentElement.removeAttribute('data-theme');
    }

    if (persist) {
      writeStored('color-scheme', scheme);
    }
  }
}