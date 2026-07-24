import { Component, computed, inject, input, PLATFORM_ID, resource } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fetchLatestGithubTag } from '../../helper/github-helper';

export interface DependencyPreviewData {
  name: string;
  github: string;
  description: string;
}

export interface MavenCoordinates {
  groupId: string;
  artifactId: string;
}

@Component({
  selector: 'app-dependency-preview',
  templateUrl: './dependency-preview.component.html',
  styleUrl: './dependency-preview.component.scss',
  standalone: false,
})
export class DependencyPreviewComponent {

  private readonly platformId = inject(PLATFORM_ID);

  readonly data = input.required<DependencyPreviewData>();
  readonly coordinates = input.required<MavenCoordinates>();

  private readonly versionResource = resource({
    params: () => (isPlatformBrowser(this.platformId) ? this.data().github : undefined),
    loader: ({ params }) => fetchLatestGithubTag(params),
  });

  protected readonly error = this.versionResource.error;

  protected readonly snippet = computed(() => {
    if (this.versionResource.status() !== 'resolved') return null;

    const version = this.versionResource.value();
    const { groupId, artifactId } = this.coordinates();
    return `<dependency>\n    <groupId>${groupId}</groupId>\n    <artifactId>${artifactId}</artifactId>\n    <version>${version}</version>\n</dependency>`;
  });
}