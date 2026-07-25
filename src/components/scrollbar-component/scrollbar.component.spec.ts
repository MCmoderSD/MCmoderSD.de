import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollbarComponent } from './scrollbar.component';

describe('ScrollbarComponent', () => {
  let fixture: ComponentFixture<ScrollbarComponent>;
  let component: ScrollbarComponent;

  const thumb = () => fixture.nativeElement.querySelector('.scrollbar__thumb') as HTMLElement | null;

  /** Stands in for the document metrics the component reads straight off documentElement. */
  const setMetrics = (scrollHeight: number, clientHeight: number, scrollTop = 0) => {
    const root = document.documentElement;
    for (const [prop, value] of Object.entries({ scrollHeight, clientHeight, scrollTop })) {
      Object.defineProperty(root, prop, { configurable: true, value });
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrollbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('draws no thumb when the page does not scroll', () => {
    setMetrics(800, 800);
    component['measure']();
    fixture.detectChanges();

    expect(thumb()).toBeNull();
  });

  it('sizes the thumb by the share of the content that is on screen', () => {
    // A quarter of the content is visible, so the thumb takes a quarter of the track.
    setMetrics(4000, 1000);
    component['measure']();
    fixture.detectChanges();

    expect(thumb()).not.toBeNull();
    expect(component['thumbHeight']()).toBe(250);
  });

  it('never shrinks the thumb below its minimum, however long the page', () => {
    setMetrics(1_000_000, 1000);
    component['measure']();

    expect(component['thumbHeight']()).toBe(32);
  });

  it('puts the thumb at the top at rest and at the bottom when fully scrolled', () => {
    setMetrics(4000, 1000, 0);
    component['measure']();
    expect(component['thumbOffset']()).toBe(0);

    setMetrics(4000, 1000, 3000);
    component['measure']();
    // Track leftover is 1000 - 250; fully scrolled means the thumb sits at the end of it.
    expect(component['thumbOffset']()).toBe(750);
  });
});
