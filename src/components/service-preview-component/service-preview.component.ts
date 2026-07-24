import { Component, input } from '@angular/core';
import { ServiceIcon, ServiceIconSize } from '../../lib/service-icon-types';

export interface ServicePreviewData {
  name: string;
  description: string;
  icon: ServiceIcon;
  link: string;
}

@Component({
  selector: 'app-service-preview',
  templateUrl: './service-preview.component.html',
  styleUrl: './service-preview.component.scss',
  standalone: false,
})
export class ServicePreviewComponent {

  readonly data = input.required<ServicePreviewData>();

  protected readonly size = ServiceIconSize;
}