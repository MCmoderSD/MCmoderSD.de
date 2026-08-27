import {Component, computed, inject, input, type InputSignal, PLATFORM_ID, resource, type ResourceLoaderParams, type ResourceRef, type Signal} from '@angular/core';
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

const PLACEHOLDER_VERSION: string = '0.0.0';

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

  private readonly versionResource: ResourceRef<string | undefined> = resource({
    params: (): string | undefined => (isPlatformBrowser(this.platformId) ? this.data().github : undefined),
    loader: ({ params }: ResourceLoaderParams<string | undefined>): Promise<string> => fetchLatestGithubTag(params)
  });

  protected readonly error: Signal<Error | undefined> = this.versionResource.error;

  protected readonly loading: Signal<boolean> = computed((): boolean => !this.versionResource.hasValue());

  protected readonly snippet: Signal<string> = computed((): string => {
    const { groupId, artifactId } = this.coordinates();
    const version: string = this.versionResource.value() ?? PLACEHOLDER_VERSION;

    return [
      '<dependency>',
      `    <groupId>${groupId}</groupId>`,
      `    <artifactId>${artifactId}</artifactId>`,
      `    <version>${version}</version>`,
      '</dependency>',
    ].join('\n');
  });
}