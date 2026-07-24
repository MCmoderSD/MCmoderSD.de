import { Component, computed, input } from '@angular/core';
import { ToolIcon, ToolIconSize } from '../../lib/tool-icon-types';

export interface EducationData {
  institution: string;
  qualification: string;
  from: string;
  /** Omit for an ongoing education, which renders as "Present". */
  to?: string;
  location?: string;
  /** Final grade on the German scale, e.g. "1.7". */
  grade?: string;
  description?: string;
  tools?: ToolIcon[];
}

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  standalone: false,
})
export class EducationComponent {

  readonly data = input.required<EducationData>();

  protected readonly period = computed(() => `${this.data().from} — ${this.data().to ?? 'Present'}`);
  protected readonly tools = computed(() => this.data().tools ?? []);

  protected readonly size = ToolIconSize;
}
