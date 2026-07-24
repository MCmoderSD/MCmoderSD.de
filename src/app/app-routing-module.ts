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
  // { path: '', component: StartpageComponent },
  { path: '', component: AboutPageComponent },
  //{ path: 'about', component: AboutPageComponent },
  { path: 'projects', component: ProjectPageComponent },
  { path: 'dependencies', component: DependenciesPageComponent },
  { path: 'services', component: ServicePageComponent },
  { path: 'imprint', component: ImprintPageComponent },
  { path: 'privacy', component: PrivacyPolicyPageComponent },
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
