import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from '../pages/startpage/startpage.component';
import { DependenciesPageComponent } from '../pages/dependencies-page/dependencies-page.component';
import { ServicePageComponent } from '../pages/service-page/service-page.component';
import { ImprintPageComponent } from '../pages/imprint-page/imprint-page.component';
import { PrivacyPolicyPageComponent } from '../pages/privacy-policy-page/privacy-policy-page.component';
import { AboutPageComponent } from '../pages/about-page/about-page.component';
import { ProjectPageComponent } from '../pages/project-page/project-page.component';

const routes: Routes = [
  // Startpage is temporarily disabled ("Big Work in Progress"); About is the default landing
  // page for now. Restore this route to bring the startpage back as the default.
  // { path: '', component: StartpageComponent, title: 'MCmoderSD.de' },
  { path: '', component: AboutPageComponent, title: 'MCmoderSD.de — Seraphin Berger' },
  //{ path: 'about', component: AboutPageComponent, title: 'About — MCmoderSD.de' },
  { path: 'projects', component: ProjectPageComponent, title: 'Projects — MCmoderSD.de' },
  { path: 'dependencies', component: DependenciesPageComponent, title: 'Dependencies — MCmoderSD.de' },
  { path: 'services', component: ServicePageComponent, title: 'Services — MCmoderSD.de' },
  { path: 'imprint', component: ImprintPageComponent, title: 'Imprint — MCmoderSD.de' },
  { path: 'privacy', component: PrivacyPolicyPageComponent, title: 'Privacy Policy — MCmoderSD.de' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Lets fragment links such as /about#experience scroll to the matching id.
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }