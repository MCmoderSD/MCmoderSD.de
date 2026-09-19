import { type Routes } from '@angular/router';
import { AboutPageComponent } from '../pages/about-page/about-page.component';
import { ProjectPageComponent } from '../pages/project-page/project-page.component';
import { DependenciesPageComponent } from '../pages/dependencies-page/dependencies-page.component';
import { ServicePageComponent } from '../pages/service-page/service-page.component';
import { ImprintPageComponent } from '../pages/imprint-page/imprint-page.component';
import { PrivacyPolicyPageComponent } from '../pages/privacy-policy-page/privacy-policy-page.component';

export const routes: Routes = [
  // Startpage is temporarily disabled ("Big Work in Progress"); About is the default landing
  // page for now. Restore this route to bring the startpage back as the default.
  // {
  //   path: '',
  //   component: StartpageComponent,
  //   title: 'MCmoderSD.de',
  // },
  {
    path: '',
    component: AboutPageComponent,
    title: 'MCmoderSD.de',
  },
  {
    path: 'projects',
    component: ProjectPageComponent,
    title: 'Projects',
  },
  {
    path: 'dependencies',
    component: DependenciesPageComponent,
    title: 'Dependencies',
  },
  {
    path: 'services',
    component: ServicePageComponent,
    title: 'Services',
  },
  {
    path: 'imprint',
    component: ImprintPageComponent,
    title: 'Imprint',
  },
  {
    path: 'privacy',
    component: PrivacyPolicyPageComponent,
    title: 'Privacy Policy',
  },
];