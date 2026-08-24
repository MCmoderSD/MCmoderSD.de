import { ServiceIcon } from '../../lib/service-icon-types';

const CDN_BASE = {
  dashboardIcons: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/svg',
  selfhst: 'https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg',
} as const;

export type ServiceIconSource = keyof typeof CDN_BASE;

export function serviceIconUrl(slug: string, source: ServiceIconSource): string {
  return `${CDN_BASE[source]}/${slug}.svg`;
}

export interface ServiceIconPreset {
  name: string;
  source: ServiceIconSource;
  slug: string;
  lightSlug?: string;
}

export const SERVICE_ICON_PRESETS = {
  [ServiceIcon.jellyfin]: { name: 'Jellyfin', source: 'dashboardIcons', slug: 'jellyfin' },
  [ServiceIcon.nexus]: { name: 'Sonatype Nexus', source: 'dashboardIcons', slug: 'nexus-dark', lightSlug: 'nexus' },
  [ServiceIcon.speedtest]: { name: 'OpenSpeedTest', source: 'dashboardIcons', slug: 'openspeedtest' },
  [ServiceIcon.truenas]: { name: 'TrueNAS', source: 'dashboardIcons', slug: 'truenas' },
  [ServiceIcon.portainer]: { name: 'Portainer', source: 'selfhst', slug: 'portainer-light', lightSlug: 'portainer' },
} as const;