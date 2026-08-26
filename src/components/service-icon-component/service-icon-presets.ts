import { ServiceIcon } from '../../lib/service-icon-types';

export function serviceIconUrl(slug: string): string {
  return `/svg/${slug}.svg`;
}

export interface ServiceIconPreset {
  name: string;
  slug: string;
  lightSlug?: string;
}

export const SERVICE_ICON_PRESETS = {
  [ServiceIcon.jellyfin]: { name: 'Jellyfin', slug: 'jellyfin' },
  [ServiceIcon.nexus]: { name: 'Sonatype Nexus', slug: 'nexus-dark', lightSlug: 'nexus-light' },
  [ServiceIcon.speedtest]: { name: 'OpenSpeedTest', slug: 'openspeedtest' },
  [ServiceIcon.truenas]: { name: 'TrueNAS Scale', slug: 'truenas-scale' },
  [ServiceIcon.portainer]: { name: 'Portainer', slug: 'portainer-dark', lightSlug: 'portainer-light' },
} as const;