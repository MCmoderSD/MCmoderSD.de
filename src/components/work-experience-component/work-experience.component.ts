import { Component, computed, input } from '@angular/core';
import { ToolIcon, ToolIconSize } from '../../lib/tool-icon-types';

export interface WorkExperienceData {
  company: string;
  position: string;
  from: string;
  /** Omit for a current position, which renders as "Present". */
  to?: string;
  location?: string;
  /** Final grade on the German scale, e.g. "1.7". */
  grade?: string;
  description?: string;
  tools?: ToolIcon[];
}

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss',
  standalone: false,
})
export class WorkExperienceComponent {

  readonly data = input.required<WorkExperienceData>();

  protected readonly period = computed(() => `${this.data().from} — ${this.data().to ?? 'Present'}`);
  protected readonly tools = computed(() => this.data().tools ?? []);

  protected readonly size = ToolIconSize;
}
