import {NgModule} from '@angular/core';
import {StartpageComponent} from "./startpage/startpage.component";
import {DependenciesPageComponent} from "./dependencies-page/dependencies-page.component";
import {ComponentsModule} from "../components/components.module";

const components: any[] = [
  StartpageComponent,
  DependenciesPageComponent
];

@NgModule({
  declarations: components,
  imports: [
    ComponentsModule

  ],
  exports: [components]
})
export class PagesModule { }