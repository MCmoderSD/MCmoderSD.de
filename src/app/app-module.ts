import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration()],
  bootstrap: [App],
})
export class AppModule { }