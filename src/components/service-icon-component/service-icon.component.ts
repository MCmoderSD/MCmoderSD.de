import { Component, computed, input } from '@angular/core';
import { ServiceIcon, ServiceIconSize } from '../../lib/service-icon-types';
import { SERVICE_ICON_PRESETS } from './service-icon-presets';

@Component({
  selector: 'app-service-icon',
  templateUrl: './service-icon.component.html',
  styleUrl: './service-icon.component.scss',
  standalone: false,
})
export class ServiceIconComponent {

  readonly icon = input.required<ServiceIcon>();
  readonly size = input<ServiceIconSize>(ServiceIconSize.Medium);

  protected readonly preset = computed(() => SERVICE_ICON_PRESETS[this.icon()]);

  protected readonly ServiceIconSize = ServiceIconSize;
}