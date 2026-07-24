import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesPageComponent } from './dependencies-page.component';
import { DependencyPreviewComponent } from '../../components/dependency-preview-component/dependency-preview.component';
import { CodeSnippetComponent } from '../../components/code-snippet-component/code-snippet.component';

describe('DependenciesPageComponent', () => {
  let component: DependenciesPageComponent;
  let fixture: ComponentFixture<DependenciesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DependenciesPageComponent, DependencyPreviewComponent, CodeSnippetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependenciesPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});