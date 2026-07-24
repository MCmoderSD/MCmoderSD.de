import { Component } from '@angular/core';
import { ToolIcon } from '../../lib/tool-icon-types';
import { ProjectPreviewData } from '../../components/project-preview-component/project-preview.component';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss',
  standalone: false,
})
export class StartpageComponent {

  protected readonly projects: ProjectPreviewData[] = [
    {
      name: 'MCmoderSD.de',
      description: 'Persönliche Portfolio-Website, gebaut mit Angular und einem eigenen dunklen Glow-Theme.',
      tools: [ToolIcon.angular, ToolIcon.typescript, ToolIcon.sass, ToolIcon.docker],
    }
  ];
}