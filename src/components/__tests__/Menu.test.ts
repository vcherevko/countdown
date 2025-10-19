import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Menu from '../Menu.svelte';

describe('Menu', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(Menu, {
      props: {
        isOpen: false,
        onSettings: vi.fn(),
        onAbout: vi.fn(),
        onClose: vi.fn()
      }
    });

    expect(container.querySelector('.menu-dropdown')).toBeFalsy();
  });

  it('should render when isOpen is true', () => {
    const { container } = render(Menu, {
      props: {
        isOpen: true,
        onSettings: vi.fn(),
        onAbout: vi.fn(),
        onClose: vi.fn()
      }
    });

    expect(container.querySelector('.menu-dropdown')).toBeTruthy();
  });

  it('should display Settings and About menu items', () => {
    const { container } = render(Menu, {
      props: {
        isOpen: true,
        onSettings: vi.fn(),
        onAbout: vi.fn(),
        onClose: vi.fn()
      }
    });

    const menuItems = container.querySelectorAll('.menu-item');
    expect(menuItems).toHaveLength(2);
    expect(menuItems[0].textContent).toContain('Settings');
    expect(menuItems[1].textContent).toContain('About');
  });

  it('should call onSettings and onClose when Settings is clicked', async () => {
    const onSettings = vi.fn();
    const onClose = vi.fn();

    const { container } = render(Menu, {
      props: {
        isOpen: true,
        onSettings,
        onAbout: vi.fn(),
        onClose
      }
    });

    const settingsItem = container.querySelectorAll('.menu-item')[0];
    await fireEvent.click(settingsItem);

    expect(onSettings).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onAbout and onClose when About is clicked', async () => {
    const onAbout = vi.fn();
    const onClose = vi.fn();

    const { container } = render(Menu, {
      props: {
        isOpen: true,
        onSettings: vi.fn(),
        onAbout,
        onClose
      }
    });

    const aboutItem = container.querySelectorAll('.menu-item')[1];
    await fireEvent.click(aboutItem);

    expect(onAbout).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
