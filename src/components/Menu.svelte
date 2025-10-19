<script lang="ts">
  import { slide, scale } from 'svelte/transition';
  import { Settings, Info } from 'lucide-svelte';

  export let isOpen = false;
  export let onSettings: () => void;
  export let onAbout: () => void;
  export let onClose: () => void;

  function handleMenuClick(action: () => void) {
    action();
    onClose();
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-dropdown') && !target.closest('.btn-menu')) {
      onClose();
    }
  }

  $: if (isOpen && typeof window !== 'undefined') {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
  } else if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleClickOutside);
  }
</script>

{#if isOpen}
  <div
    class="menu-dropdown"
    transition:scale={{ duration: 200, start: 0.95, opacity: 0 }}
  >
    <button class="menu-item" on:click={() => handleMenuClick(onSettings)}>
      <Settings size={24} strokeWidth={2} />
      <span>Settings</span>
    </button>
    <button class="menu-item" on:click={() => handleMenuClick(onAbout)}>
      <Info size={24} strokeWidth={2} />
      <span>About</span>
    </button>
  </div>
{/if}

<style>
  .menu-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 12px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 10px 20px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(0, 0, 0, 0.02);
    overflow: hidden;
    min-width: 260px;
    z-index: 1000;
    transform-origin: top left;
  }

  @media (prefers-color-scheme: dark) {
    .menu-dropdown {
      background: rgba(30, 30, 30, 0.98);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow:
        0 4px 6px rgba(0, 0, 0, 0.3),
        0 10px 20px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 18px 24px;
    background: transparent;
    border: none;
    color: var(--tg-theme-text-color, #333);
    font-size: 17px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-item:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  .menu-item:active {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(0.98);
  }

  @media (prefers-color-scheme: dark) {
    .menu-item:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .menu-item:active {
      background: rgba(255, 255, 255, 0.18);
    }
  }

  .menu-item:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  @media (prefers-color-scheme: dark) {
    .menu-item:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
  }

  @media (max-width: 600px) {
    .menu-dropdown {
      min-width: 240px;
    }

    .menu-item {
      padding: 16px 20px;
      gap: 14px;
    }
  }
</style>
