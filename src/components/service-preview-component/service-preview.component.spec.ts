import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePreviewComponent } from './service-preview.component';
import { ServiceIconComponent } from '../service-icon-component/service-icon.component';
import { ServiceIcon } from '../../lib/service-icon-types';

describe('ServicePreviewComponent', () => {
  let component: ServicePreviewComponent;
  let fixture: ComponentFixture<ServicePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePreviewComponent, ServiceIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePreviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      name: 'Test',
      description: 'Test description',
      icon: ServiceIcon.jellyfin,
      link: 'https://example.com',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});