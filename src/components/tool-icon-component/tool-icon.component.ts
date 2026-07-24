import { Component, computed, input } from '@angular/core';
import { ToolIcon, ToolIconSize, ToolIconVariant } from '../../lib/tool-icon-types';
import { TOOL_ICON_PRESETS } from './tool-icon-presets';

@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.component.html',
  styleUrl: './tool-icon.component.scss',
  standalone: false
})
export class ToolIconComponent {

  readonly tool = input.required<ToolIcon>();
  readonly variant = input<ToolIconVariant>(ToolIconVariant.Icon);
  readonly size = input<ToolIconSize>(ToolIconSize.Medium);

  protected readonly preset = computed(() => TOOL_ICON_PRESETS[this.tool()]);

  protected readonly ToolIconVariant = ToolIconVariant;
  protected readonly ToolIconSize = ToolIconSize;
}