import { Component, computed, input, type InputSignal, type Signal } from '@angular/core';
import { type ToolIcon, ToolIconSize } from '../../lib/tool-icon-types';

export interface WorkExperienceData {
  company: string;
  position: string;
  from: string;
  to?: string;
  location?: string;
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

  readonly data: InputSignal<WorkExperienceData> = input.required<WorkExperienceData>();

  protected readonly period: Signal<string> = computed((): string => `${this.data().from} — ${this.data().to ?? 'Present'}`);
  protected readonly tools: Signal<ToolIcon[]> = computed((): ToolIcon[] => this.data().tools ?? []);

  protected readonly size = ToolIconSize;
}