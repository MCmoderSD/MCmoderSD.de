import { Component, computed, input, InputSignal, Signal } from '@angular/core';
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

  readonly data:InputSignal<EducationData> = input.required<EducationData>();

  protected readonly period:Signal<string> = computed(() => `${this.data().from} — ${this.data().to ?? 'Present'}`);
  protected readonly tools:Signal<ToolIcon[]> = computed(() => this.data().tools ?? []);

  protected readonly size = ToolIconSize;
}