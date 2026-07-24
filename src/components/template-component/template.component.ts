import { Component } from '@angular/core';

interface Link {
  title: string;
  link: string;
}

@Component({
  selector: 'app-template-component',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
  standalone: false
})
export class TemplateComponent {
  protected readonly title: string = 'Webpage';
  protected readonly links: Link[] = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai'},
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' }
  ];
}
