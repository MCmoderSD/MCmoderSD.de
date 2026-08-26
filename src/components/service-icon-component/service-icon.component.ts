import { Component, computed, input, type InputSignal, type Signal } from '@angular/core';
import { type ServiceIcon, ServiceIconSize } from '../../lib/service-icon-types';
import { SERVICE_ICON_PRESETS, serviceIconUrl, type ServiceIconPreset } from './service-icon-presets';

@Component({
  selector: 'app-service-icon',
  templateUrl: './service-icon.component.html',
  styleUrl: './service-icon.component.scss',
  standalone: false,
  host: {
    '[class.service-icon--sm]': 'size() === ServiceIconSize.Small',
    '[class.service-icon--lg]': 'size() === ServiceIconSize.Large',
  },
})
export class ServiceIconComponent {

  readonly icon: InputSignal<ServiceIcon> = input.required<ServiceIcon>();
  readonly size: InputSignal<ServiceIconSize> = input<ServiceIconSize>(ServiceIconSize.Medium);

  protected readonly preset: Signal<ServiceIconPreset> = computed((): ServiceIconPreset => SERVICE_ICON_PRESETS[this.icon()]);

  protected readonly src: Signal<string> = computed((): string => serviceIconUrl(this.preset().slug));

  protected readonly lightSrc: Signal<string | null> = computed((): string | null => {
    const lightSlug: string | undefined = this.preset().lightSlug;
    return lightSlug === undefined ? null : serviceIconUrl(lightSlug);
  });

  protected readonly ServiceIconSize = ServiceIconSize;
}