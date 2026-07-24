import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageComponent } from './service-page.component';
import { ServicePreviewComponent } from '../../components/service-preview-component/service-preview.component';
import { ServiceIconComponent } from '../../components/service-icon-component/service-icon.component';

describe('ServicePageComponent', () => {
  let component: ServicePageComponent;
  let fixture: ComponentFixture<ServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePageComponent, ServicePreviewComponent, ServiceIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});