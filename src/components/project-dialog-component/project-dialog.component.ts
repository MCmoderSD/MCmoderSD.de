import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { type ProjectPreviewData } from '../project-preview-component/project-preview.component';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss',
  imports: [MatDialogModule],
})
export class ProjectDialogComponent {
  protected readonly data: ProjectPreviewData = inject(MAT_DIALOG_DATA);
}