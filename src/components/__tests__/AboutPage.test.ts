import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import AboutPage from '../AboutPage.svelte';

describe('AboutPage', () => {
  it('should render the About page', () => {
    const { container } = render(AboutPage, {
      props: {
        onBack: vi.fn()
      }
    });

    expect(container.querySelector('.about-page')).toBeTruthy();
  });

  it('should display "About" heading', () => {
    const { container } = render(AboutPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const heading = container.querySelector('h1');
    expect(heading?.textContent).toBe('About');
  });

  it('should display "Countdown App" title', () => {
    const { container } = render(AboutPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const title = container.querySelector('.version-info h2');
    expect(title?.textContent).toBe('Countdown App');
  });

  it('should display version information', () => {
    const { container } = render(AboutPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const versionItems = container.querySelectorAll('.version-item');
    expect(versionItems.length).toBeGreaterThanOrEqual(2);
  });

  it('should display Version label', () => {
    const { container } = render(AboutPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const labels = container.querySelectorAll('.label');
    const versionLabel = Array.from(labels).find(
      (label) => label.textContent === 'Version:'
    );
    expect(versionLabel).toBeTruthy();
  });

  it('should display Git Hash label', () => {
    const { container } = render(AboutPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const labels = container.querySelectorAll('.label');
    const gitHashLabel = Array.from(labels).find(
      (label) => label.textContent === 'Git Hash:'
    );
    expect(gitHashLabel).toBeTruthy();
  });

  it('should have a back button', () => {
    const { container } = render(AboutPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const backButton = container.querySelector('.btn-back');
    expect(backButton).toBeTruthy();
  });

  it('should call onBack when back button is clicked', async () => {
    const onBack = vi.fn();

    const { container } = render(AboutPage, {
      props: {
        onBack
      }
    });

    const backButton = container.querySelector('.btn-back');
    if (backButton) {
      await fireEvent.click(backButton);
      expect(onBack).toHaveBeenCalledTimes(1);
    }
  });
});
