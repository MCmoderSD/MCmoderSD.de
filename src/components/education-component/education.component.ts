import { Component, computed, input } from '@angular/core';
import { ToolIcon, ToolIconSize } from '../../lib/tool-icon-types';

export interface EducationData {
  institution: string;
  qualification: string;
  from: string;
  to?: string;
  location?: string;
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