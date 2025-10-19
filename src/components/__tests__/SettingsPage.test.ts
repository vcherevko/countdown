import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import SettingsPage from '../SettingsPage.svelte';

describe('SettingsPage', () => {
  it('should render the Settings page', () => {
    const { container } = render(SettingsPage, {
      props: {
        onBack: vi.fn()
      }
    });

    expect(container.querySelector('.settings-page')).toBeTruthy();
  });

  it('should display "Settings" heading', () => {
    const { container } = render(SettingsPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const heading = container.querySelector('h1');
    expect(heading?.textContent).toBe('Settings');
  });

  it('should display "Settings Coming Soon" placeholder message', () => {
    const { container } = render(SettingsPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const placeholder = container.querySelector('.placeholder h2');
    expect(placeholder?.textContent).toBe('Settings Coming Soon');
  });

  it('should display placeholder description', () => {
    const { container } = render(SettingsPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const description = container.querySelector('.placeholder p');
    expect(description?.textContent).toContain('Configuration options will be available');
  });

  it('should have a back button', () => {
    const { container } = render(SettingsPage, {
      props: {
        onBack: vi.fn()
      }
    });

    const backButton = container.querySelector('.btn-back');
    expect(backButton).toBeTruthy();
  });

  it('should call onBack when back button is clicked', async () => {
    const onBack = vi.fn();

    const { container } = render(SettingsPage, {
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
