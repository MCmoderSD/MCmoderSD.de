import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from '../pages/startpage/startpage.component';
import { DependenciesPageComponent } from '../pages/dependencies-page/dependencies-page.component';
import { ServicePageComponent } from '../pages/service-page/service-page.component';
import { ImprintPageComponent } from '../pages/imprint-page/imprint-page.component';
import { PrivacyPolicyPageComponent } from '../pages/privacy-policy-page/privacy-policy-page.component';

const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'dependencies', component: DependenciesPageComponent },
  { path: 'services', component: ServicePageComponent },
  { path: 'imprint', component: ImprintPageComponent },
  { path: 'privacy', component: PrivacyPolicyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
