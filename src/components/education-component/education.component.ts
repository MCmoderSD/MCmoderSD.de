import { Component, computed, input, type InputSignal, type Signal } from '@angular/core';
import { type ToolIcon, ToolIconSize } from '../../lib/tool-icon-types';

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

  protected readonly period:Signal<string> = computed((): string => `${this.data().from} — ${this.data().to ?? 'Present'}`);
  protected readonly tools:Signal<ToolIcon[]> = computed((): ToolIcon[] => this.data().tools ?? []);

  protected readonly size = ToolIconSize;
}