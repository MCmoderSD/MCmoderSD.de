import { Component, computed, input, type InputSignal, signal, type Signal, type WritableSignal } from '@angular/core';

interface PlaceholderRow {
  indent: number;
  text: string;
}

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.scss',
  standalone: false,
})
export class CodeSnippetComponent {

  readonly code:InputSignal<string> = input.required<string>();
  readonly language:InputSignal<string> = input.required<string>();
  readonly loading:InputSignal<boolean> = input(false);

  protected readonly copied:WritableSignal<boolean> = signal(false);

  protected readonly placeholderRows:Signal<PlaceholderRow[]> = computed((): PlaceholderRow[] =>
    this.code().split('\n').map((line: string): PlaceholderRow => {
      const text: string = line.trimStart();
      return { indent: line.length - text.length, text };
    }));

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout((): void => this.copied.set(false), 1500);
  }
}