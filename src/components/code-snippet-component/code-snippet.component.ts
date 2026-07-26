import { Component, input, type InputSignal, signal, type WritableSignal } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.scss',
  standalone: false,
})
export class CodeSnippetComponent {

  readonly code:InputSignal<string> = input.required<string>();
  readonly language:InputSignal<string> = input.required<string>();

  protected readonly copied:WritableSignal<boolean> = signal(false);

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout((): void => this.copied.set(false), 1500);
  }
}