import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolIconComponent } from './tool-icon.component';

describe('ToolIconComponent', () => {
  let component: ToolIconComponent;
  let fixture: ComponentFixture<ToolIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});