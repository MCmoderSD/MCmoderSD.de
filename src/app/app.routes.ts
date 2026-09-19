import { type Routes } from '@angular/router';

// Every page is loaded on demand, so the initial bundle only carries the shell (navbar, footer,
// theme switch, scrollbar) plus whichever page was requested first.
export const routes: Routes = [
  // Startpage is temporarily disabled ("Big Work in Progress"); About is the default landing
  // page for now. Restore this route to bring the startpage back as the default.
  // {
  //   path: '',
  //   loadComponent: () => import('../pages/startpage/startpage.component').then((m) => m.StartpageComponent),
  //   title: 'MCmoderSD.de'
  // },
  {
    path: '',
    loadComponent: () => import('../pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
    title: 'MCmoderSD.de'
  },
  {
    path: 'projects',
    loadComponent: () => import('../pages/project-page/project-page.component').then((m) => m.ProjectPageComponent),
    title: 'Projects'
  },
  {
    path: 'dependencies',
    loadComponent: () => import('../pages/dependencies-page/dependencies-page.component').then((m) => m.DependenciesPageComponent),
    title: 'Dependencies'
  },
  {
    path: 'services',
    loadComponent: () => import('../pages/service-page/service-page.component').then((m) => m.ServicePageComponent),
    title: 'Services'
  },
  {
    path: 'imprint',
    loadComponent: () => import('../pages/imprint-page/imprint-page.component').then((m) => m.ImprintPageComponent),
    title: 'Imprint'
  },
  {
    path: 'privacy',
    loadComponent: () => import('../pages/privacy-policy-page/privacy-policy-page.component').then((m) => m.PrivacyPolicyPageComponent),
    title: 'Privacy Policy'
  },
];