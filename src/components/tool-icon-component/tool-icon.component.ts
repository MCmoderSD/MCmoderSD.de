import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import { ToolIcon, ToolIconSize, ToolIconVariant } from '../../lib/tool-icon-types';
import {TOOL_ICON_PRESETS, ToolIconPreset} from './tool-icon-presets';

@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.component.html',
  styleUrl: './tool-icon.component.scss',
  standalone: false
})
export class ToolIconComponent {

  readonly tool: InputSignal<ToolIcon> = input.required<ToolIcon>();
  readonly variant: InputSignal<ToolIconVariant> = input<ToolIconVariant>(ToolIconVariant.Icon);
  readonly size: InputSignal<ToolIconSize> = input<ToolIconSize>(ToolIconSize.Medium);

  protected readonly preset: Signal<ToolIconPreset> = computed((): ToolIconPreset => TOOL_ICON_PRESETS[this.tool()]);

  protected readonly ToolIconVariant = ToolIconVariant;
  protected readonly ToolIconSize = ToolIconSize;
}