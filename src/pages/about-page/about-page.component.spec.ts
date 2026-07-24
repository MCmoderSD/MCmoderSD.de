import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about-page.component';
import { EducationComponent } from '../../components/education-component/education.component';
import { WorkExperienceComponent } from '../../components/work-experience-component/work-experience.component';
import { ToolIconComponent } from '../../components/tool-icon-component/tool-icon.component';

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutPageComponent, EducationComponent, WorkExperienceComponent, ToolIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
