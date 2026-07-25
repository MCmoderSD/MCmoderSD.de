import { Component, computed, inject, input, InputSignal, PLATFORM_ID, resource, ResourceRef, Signal } from '@angular/core';
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

  private readonly platformId: Object = inject(PLATFORM_ID);

  readonly data:InputSignal<DependencyPreviewData> = input.required<DependencyPreviewData>();
  readonly coordinates:InputSignal<MavenCoordinates> = input.required<MavenCoordinates>();

  private readonly versionResource: ResourceRef<string> = resource({
    params: (): string | undefined => (isPlatformBrowser(this.platformId) ? this.data().github : undefined),
    loader: ({ params }: { params: string | undefined }): Promise<string> => fetchLatestGithubTag(params),
  });

  protected readonly error:Signal<Error> = this.versionResource.error;

  protected readonly snippet = computed(() => {
    if (this.versionResource.status() !== 'resolved') return null;

    const version = this.versionResource.value();
    const { groupId, artifactId } = this.coordinates();
    return `
<dependency>
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>${version}</version>
</dependency>
`;
  });
}