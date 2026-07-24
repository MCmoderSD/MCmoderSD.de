import { Component } from '@angular/core';
import { ServiceIcon, ServiceIconSize } from '../../lib/service-icon-types';

export interface ShortcutData {
  name: string;
  icon: ServiceIcon;
  link: string;
}

@Component({
  selector: 'app-shortcut-overlay',
  templateUrl: './shortcut-overlay.component.html',
  styleUrl: './shortcut-overlay.component.scss',
  standalone: false,
})
export class ShortcutOverlayComponent {

  protected readonly shortcuts: ShortcutData[] = [
    { name: 'Jellyfin', icon: ServiceIcon.jellyfin, link: 'https://mcmodersd.de/jellyfin/' },
    { name: 'Sonatype Nexus', icon: ServiceIcon.nexus, link: 'https://mcmodersd.de/nexus/' },
    { name: 'OpenSpeedTest', icon: ServiceIcon.speedtest, link: 'https://mcmodersd.de/speedtest/' },
  ];

  protected readonly size = ServiceIconSize;
}
