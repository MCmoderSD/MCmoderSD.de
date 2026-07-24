import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToolIconComponent} from "./tool-icon-component/tool-icon.component";
import {ProjectPreviewComponent} from "./project-preview-component/project-preview.component";
import {DependencyPreviewComponent} from "./dependency-preview-component/dependency-preview.component";
import {CodeSnippetComponent} from "./code-snippet-component/code-snippet.component";
import {NavbarComponent} from "./navbar-component/navbar.component";
import {ServiceIconComponent} from "./service-icon-component/service-icon.component";
import {ServicePreviewComponent} from "./service-preview-component/service-preview.component";
import {ShortcutOverlayComponent} from "./shortcut-overlay-component/shortcut-overlay.component";
import {FooterComponent} from "./footer-component/footer.component";


const components: any[] = [
  ToolIconComponent,
  ProjectPreviewComponent,
  DependencyPreviewComponent,
  CodeSnippetComponent,
  NavbarComponent,
  ServiceIconComponent,
  ServicePreviewComponent,
  ShortcutOverlayComponent,
  FooterComponent
];

@NgModule({
  declarations: components,
  imports: [
    RouterModule
  ],
  exports: [components]
})
export class ComponentsModule { }