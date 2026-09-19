import { Component, computed, type Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [RouterLink],
})
export class FooterComponent {
  protected readonly year: Signal<number> = computed((): number => new Date().getFullYear());
}