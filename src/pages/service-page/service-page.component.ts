import { Component } from '@angular/core';
import { ServiceIcon } from '../../lib/service-icon-types';
import { ServicePreviewData } from '../../components/service-preview-component/service-preview.component';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss',
  standalone: false,
})
export class ServicePageComponent {

  protected readonly services: ServicePreviewData[] = [
    {
      name: 'Jellyfin',
      description: 'My own media server. Jellyfin is a free, self-hosted, open-source alternative to Plex and Netflix that lets me stream movies, shows, and music over my own network without a subscription or tracking.',
      icon: ServiceIcon.jellyfin,
      link: 'https://mcmodersd.de/jellyfin/',
    },
    {
      name: 'OpenSpeedTest',
      description: 'My own speed test server. A self-hosted, open-source alternative to Speedtest.net that lets me measure the connection to my server without relying on any third party.',
      icon: ServiceIcon.speedtest,
      link: 'https://mcmodersd.de/speedtest/',
    },
    {
      name: 'Sonatype Nexus',
      description: 'My own artifact repository. I host and manage my Java packages through it myself instead of publishing them to Maven Central.',
      icon: ServiceIcon.nexus,
      link: 'https://mcmodersd.de/nexus/',
    },
    {
      name: 'Portainer',
      description: 'My container management. Portainer gives me an overview of all Docker containers and stacks running on my servers.',
      icon: ServiceIcon.portainer,
      link: 'https://mcmodersd.de/portainer/',
    },
    /*
    {
        name: 'TrueNAS Scale',
        description: 'My own NAS. TrueNAS Scale manages my network storage and the Docker/app workloads that run this website and the other services, among other things.',
        icon: ServiceIcon.truenas,
        link: 'https://home.mcmodersd.de/',
    },
    */
  ];
}