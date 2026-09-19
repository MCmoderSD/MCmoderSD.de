import { Component, inject, input, type InputSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { type ToolIcon, ToolIconSize } from '../../lib/tool-icon-types';
import { ProjectDialogComponent } from '../project-dialog-component/project-dialog.component';
import { ToolIconComponent } from '../tool-icon-component/tool-icon.component';

export interface ProjectPreviewData {
  name: string;
  description: string;
  details: string[];
  tools: ToolIcon[];
  github: string;
}

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.scss',
  imports: [ToolIconComponent],
})
export class ProjectPreviewComponent {

  private readonly dialog: MatDialog = inject(MatDialog);

  readonly data: InputSignal<ProjectPreviewData> = input.required<ProjectPreviewData>();

  protected readonly size = ToolIconSize;

  protected openDetails(): void {
    this.dialog.open(ProjectDialogComponent, {
      data: this.data(),
      autoFocus: 'dialog',
      width: 'min(54rem, 92vw)',
      maxWidth: 'min(54rem, 92vw)',
      panelClass: 'project-dialog-panel',
    });
  }
}