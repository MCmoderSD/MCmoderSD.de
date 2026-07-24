import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIconComponent } from './service-icon.component';
import { ServiceIcon } from '../../lib/service-icon-types';

describe('ServiceIconComponent', () => {
  let component: ServiceIconComponent;
  let fixture: ComponentFixture<ServiceIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceIconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', ServiceIcon.jellyfin);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});