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
      description: 'Mein eigener Media-Server. Jellyfin ist eine freie, selbst gehostete Open-Source-Alternative zu Plex und Netflix, mit der ich Filme, Serien und Musik ohne Abo oder Tracking über das eigene Netzwerk streamen kann.',
      icon: ServiceIcon.jellyfin,
      link: 'https://mcmodersd.de/jellyfin/',
    },
    {
      name: 'OpenSpeedTest',
      description: 'Mein eigener Speedtest-Server. Eine selbst gehostete, quelloffene Alternative zu Speedtest.net, mit der ich die Verbindung zu meinem Server ganz ohne Drittanbieter messen kann.',
      icon: ServiceIcon.speedtest,
      link: 'https://mcmodersd.de/speedtest/',
    },
    {
      name: 'Sonatype Nexus',
      description: 'Mein eigenes Artefakt-Repository. Darüber hoste und verwalte ich meine Java-Packages selbst, anstatt sie auf Maven Central zu veröffentlichen.',
      icon: ServiceIcon.nexus,
      link: 'https://mcmodersd.de/nexus/',
    },
    {
      name: 'Portainer',
      description: 'Meine Container-Verwaltung. Mit Portainer behalte ich den Überblick über alle Docker-Container und -Stacks auf meinen Servern.',
      icon: ServiceIcon.portainer,
      link: 'https://mcmodersd.de/portainer/',
    },
    /*
    {
        name: 'TrueNAS Scale',
        description: 'Mein eigenes NAS. TrueNAS Scale verwaltet meinen Netzwerkspeicher und die Docker-/App-Workloads, auf denen unter anderem diese Website und die anderen Dienste laufen.',
        icon: ServiceIcon.truenas,
        link: 'https://home.mcmodersd.de/',
    },
    */
  ];
}