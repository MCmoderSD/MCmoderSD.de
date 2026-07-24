import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { TemplateComponent } from '../components/template-component/template.component';
import { ToolIconComponent } from '../components/tool-icon-component/tool-icon.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        TemplateComponent,
        ToolIconComponent
      ],
      declarations: [
        App
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Webpage');
  });
});
