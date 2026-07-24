import {NgModule} from '@angular/core';
import {TemplateComponent} from "./template-component/template.component";
import {ToolIconComponent} from "./tool-icon-component/tool-icon.component";


const components: any[] = [
  TemplateComponent,
  ToolIconComponent
];

@NgModule({
  declarations: components,
  imports: [

  ],
  exports: [components]
})
export class ComponentsModule { }