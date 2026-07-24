import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyPreviewComponent } from './dependency-preview.component';

describe('DependencyPreviewComponent', () => {
  let component: DependencyPreviewComponent;
  let fixture: ComponentFixture<DependencyPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DependencyPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependencyPreviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', { name: 'Test', github: 'https://github.com/test/test', description: 'Test description' });
    fixture.componentRef.setInput('coordinates', { groupId: 'de.test', artifactId: 'Test' });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});