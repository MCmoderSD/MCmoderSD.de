import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { ComponentsModule } from '../components/components.module';
import { PagesModule } from "../pages/pages.module";

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule, PagesModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration()],
  bootstrap: [App],
})
export class AppModule { }