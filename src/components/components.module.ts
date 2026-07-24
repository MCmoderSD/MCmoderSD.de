import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TemplateComponent} from "./template-component/template.component";
import {ToolIconComponent} from "./tool-icon-component/tool-icon.component";
import {ProjectPreviewComponent} from "./project-preview-component/project-preview.component";
import {DependencyPreviewComponent} from "./dependency-preview-component/dependency-preview.component";
import {CodeSnippetComponent} from "./code-snippet-component/code-snippet.component";
import {NavbarComponent} from "./navbar-component/navbar.component";


const components: any[] = [
  TemplateComponent,
  ToolIconComponent,
  ProjectPreviewComponent,
  DependencyPreviewComponent,
  CodeSnippetComponent,
  NavbarComponent
];

@NgModule({
  declarations: components,
  imports: [
    RouterModule
  ],
  exports: [components]
})
export class ComponentsModule { }