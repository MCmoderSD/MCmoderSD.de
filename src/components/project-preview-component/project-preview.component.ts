import { Component, input } from '@angular/core';
import { ToolIcon, ToolIconSize } from '../../lib/tool-icon-types';

export interface ProjectPreviewData {
  name: string;
  description: string;
  tools: ToolIcon[];
  github: string;
}

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.scss',
  standalone: false,
})
export class ProjectPreviewComponent {

  readonly data = input.required<ProjectPreviewData>();

  protected readonly size = ToolIconSize;
}