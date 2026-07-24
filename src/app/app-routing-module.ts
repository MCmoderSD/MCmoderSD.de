import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from '../pages/startpage/startpage.component';
import { DependenciesPageComponent } from '../pages/dependencies-page/dependencies-page.component';

const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'dependencies', component: DependenciesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
