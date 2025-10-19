<script lang="ts">
  import { fade } from 'svelte/transition';
  import { ArrowLeft } from 'lucide-svelte';

  export let onBack: () => void;
</script>

<div class="settings-page" in:fade={{ duration: 300 }}>
  <div class="settings-header">
    <button class="btn-back" on:click={onBack} title="Go Back">
      <ArrowLeft size={24} />
    </button>
    <h1>Settings</h1>
  </div>

  <div class="settings-content">
    <div class="placeholder">
      <div class="placeholder-icon">⚙️</div>
      <h2>Settings Coming Soon</h2>
      <p>Configuration options will be available in a future update.</p>
    </div>
  </div>
</div>

<style>
  .settings-page {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
  }

  .settings-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 20px 24px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .settings-header {
      background: rgba(30, 30, 30, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .btn-back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background: transparent;
    color: var(--tg-theme-text-color, #333);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btn-back:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    .btn-back:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: var(--tg-theme-text-color, #333);
  }

  .settings-content {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .settings-content {
      background: rgba(30, 30, 30, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
  }

  .placeholder-icon {
    font-size: 80px;
    margin-bottom: 24px;
    opacity: 0.6;
  }

  .placeholder h2 {
    margin: 0 0 12px 0;
    font-size: 24px;
    font-weight: 700;
    color: var(--tg-theme-text-color, #333);
  }

  .placeholder p {
    margin: 0;
    font-size: 16px;
    color: var(--tg-theme-hint-color, #666);
    max-width: 400px;
    line-height: 1.6;
  }

  @media (max-width: 600px) {
    .settings-page {
      padding: 16px;
    }

    h1 {
      font-size: 24px;
    }

    .settings-header {
      padding: 16px 20px;
    }

    .settings-content {
      padding: 24px;
    }

    .placeholder {
      padding: 40px 20px;
    }

    .placeholder-icon {
      font-size: 64px;
    }

    .placeholder h2 {
      font-size: 20px;
    }

    .placeholder p {
      font-size: 14px;
    }
  }
</style>
