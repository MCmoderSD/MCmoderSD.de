import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import { ServiceIcon, ServiceIconSize } from '../../lib/service-icon-types';
import { SERVICE_ICON_PRESETS, ServiceIconPreset } from './service-icon-presets';

@Component({
  selector: 'app-service-icon',
  templateUrl: './service-icon.component.html',
  styleUrl: './service-icon.component.scss',
  standalone: false,
})
export class ServiceIconComponent {

  readonly icon: InputSignal<ServiceIcon> = input.required<ServiceIcon>();
  readonly size: InputSignal<ServiceIconSize> = input<ServiceIconSize>(ServiceIconSize.Medium);

  protected readonly preset: Signal<ServiceIconPreset> = computed(() => SERVICE_ICON_PRESETS[this.icon()]);

  protected readonly ServiceIconSize = ServiceIconSize;
}