import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorScheme, ColorSchemeSwitchComponent } from './color-scheme-switch.component';

/**
 * The test environment has no Storage implementation, so persistence is asserted against a stub.
 * Installed rather than skipped because remembering the choice is half of what the switch does.
 */
function installStorageStub(): Map<string, string> {
  const entries = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string): string | null => entries.get(key) ?? null,
      setItem: (key: string, value: string): void => {
        entries.set(key, value);
      },
      removeItem: (key: string): void => {
        entries.delete(key);
      },
    },
  });
  return entries;
}

describe('ColorSchemeSwitchComponent', () => {
  let fixture: ComponentFixture<ColorSchemeSwitchComponent>;
  let stored: Map<string, string>;

  const button = () => fixture.nativeElement.querySelector('button') as HTMLButtonElement;

  beforeEach(async () => {
    stored = installStorageStub();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      declarations: [ColorSchemeSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorSchemeSwitchComponent);
    await fixture.whenStable();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts on dark, with no theme attribute and nothing stored', () => {
    expect(button().getAttribute('aria-checked')).toBe('false');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(stored.size).toBe(0);
  });

  it('switches to light and remembers it', () => {
    button().click();
    fixture.detectChanges();

    expect(button().getAttribute('aria-checked')).toBe('true');
    expect(document.documentElement.getAttribute('data-theme')).toBe(ColorScheme.Light);
    expect(stored.get('color-scheme')).toBe(ColorScheme.Light);
  });

  it('switches back to dark, dropping the attribute rather than setting it to dark', () => {
    button().click();
    fixture.detectChanges();
    button().click();
    fixture.detectChanges();

    expect(button().getAttribute('aria-checked')).toBe('false');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(stored.get('color-scheme')).toBe(ColorScheme.Dark);
  });

  it('restores a stored light preference on load', async () => {
    stored.set('color-scheme', ColorScheme.Light);

    const restored = TestBed.createComponent(ColorSchemeSwitchComponent);
    await restored.whenStable();
    restored.detectChanges();

    expect(document.documentElement.getAttribute('data-theme')).toBe(ColorScheme.Light);
    expect(restored.nativeElement.querySelector('button').getAttribute('aria-checked')).toBe('true');
  });

  it('survives storage that throws, as a partitioned or private context does', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('denied', 'SecurityError');
      },
    });

    expect(() => button().click()).not.toThrow();
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('data-theme')).toBe(ColorScheme.Light);
  });
});