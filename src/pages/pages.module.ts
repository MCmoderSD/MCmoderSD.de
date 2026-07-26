import { NgModule } from '@angular/core';

import { StartpageComponent } from "./startpage/startpage.component";
import { DependenciesPageComponent } from "./dependencies-page/dependencies-page.component";
import { ServicePageComponent } from "./service-page/service-page.component";
import { ImprintPageComponent } from "./imprint-page/imprint-page.component";
import { PrivacyPolicyPageComponent } from "./privacy-policy-page/privacy-policy-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { ProjectPageComponent } from "./project-page/project-page.component";
import { ComponentsModule } from "../components/components.module";

const components: any[] = [
  StartpageComponent,
  DependenciesPageComponent,
  ServicePageComponent,
  ImprintPageComponent,
  PrivacyPolicyPageComponent,
  AboutPageComponent,
  ProjectPageComponent
];

@NgModule({
  declarations: [components],
  imports: [ComponentsModule],
  exports: [components]
})
export class PagesModule { }