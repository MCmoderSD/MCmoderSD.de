import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutOverlayComponent } from './shortcut-overlay.component';
import { ServiceIconComponent } from '../service-icon-component/service-icon.component';

describe('ShortcutOverlayComponent', () => {
  let component: ShortcutOverlayComponent;
  let fixture: ComponentFixture<ShortcutOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortcutOverlayComponent, ServiceIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortcutOverlayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
