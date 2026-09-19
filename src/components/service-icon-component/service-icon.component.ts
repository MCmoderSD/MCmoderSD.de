import { Component, computed, input, type InputSignal, type Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { type ServiceIcon, ServiceIconSize } from '../../lib/service-icon-types';
import { SERVICE_ICON_PRESETS, serviceIconUrl, type ServiceIconPreset } from './service-icon-presets';

// Rendered edge length per size, mirroring --service-icon-size in the stylesheet (1.35rem, 2.75rem,
// 4.5rem at a 16px root). NgOptimizedImage needs these as width/height so the box is reserved before
// the file arrives; the stylesheet still decides the size that is actually drawn.
const ICON_PIXELS: Record<ServiceIconSize, number> = {
  [ServiceIconSize.Small]: 22,
  [ServiceIconSize.Medium]: 44,
  [ServiceIconSize.Large]: 72,
};

@Component({
  selector: 'app-service-icon',
  templateUrl: './service-icon.component.html',
  styleUrl: './service-icon.component.scss',
  imports: [NgOptimizedImage],
  host: {
    '[class.service-icon--sm]': 'size() === ServiceIconSize.Small',
    '[class.service-icon--lg]': 'size() === ServiceIconSize.Large',
  },
})
export class ServiceIconComponent {

  readonly icon: InputSignal<ServiceIcon> = input.required<ServiceIcon>();
  readonly size: InputSignal<ServiceIconSize> = input<ServiceIconSize>(ServiceIconSize.Medium);

  protected readonly preset: Signal<ServiceIconPreset> = computed((): ServiceIconPreset => SERVICE_ICON_PRESETS[this.icon()]);

  protected readonly pixels: Signal<number> = computed((): number => ICON_PIXELS[this.size()]);

  protected readonly src: Signal<string> = computed((): string => serviceIconUrl(this.preset().slug));

  protected readonly lightSrc: Signal<string | null> = computed((): string | null => {
    const lightSlug: string | undefined = this.preset().lightSlug;
    return lightSlug === undefined ? null : serviceIconUrl(lightSlug);
  });

  protected readonly ServiceIconSize = ServiceIconSize;
}