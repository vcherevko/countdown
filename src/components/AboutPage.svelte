<script lang="ts">
  import { fade } from 'svelte/transition';
  import { ArrowLeft } from 'lucide-svelte';

  export let onBack: () => void;

  const version = __APP_VERSION__;
  const gitHash = __GIT_HASH__;
</script>

<div class="about-page" in:fade={{ duration: 300 }}>
  <div class="about-header">
    <button class="btn-back" on:click={onBack} title="Go Back">
      <ArrowLeft size={24} />
    </button>
    <h1>About</h1>
  </div>

  <div class="about-content">
    <div class="version-info">
      <div class="app-icon">⏰</div>
      <h2>Countdown App</h2>
      <div class="version-details">
        <div class="version-item">
          <span class="label">Version:</span>
          <span class="value">{version}</span>
        </div>
        <div class="version-item">
          <span class="label">Git Hash:</span>
          <span class="value">#{gitHash}</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .about-page {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
  }

  .about-header {
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
    .about-header {
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

  .about-content {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .about-content {
      background: rgba(30, 30, 30, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .version-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .app-icon {
    font-size: 80px;
    margin-bottom: 24px;
    opacity: 0.8;
  }

  .version-info h2 {
    margin: 0 0 32px 0;
    font-size: 28px;
    font-weight: 700;
    color: var(--tg-theme-text-color, #333);
  }

  .version-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 400px;
  }

  .version-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
  }

  @media (prefers-color-scheme: dark) {
    .version-item {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .label {
    font-size: 14px;
    color: var(--tg-theme-hint-color, #666);
    font-weight: 500;
  }

  .value {
    font-size: 14px;
    color: var(--tg-theme-text-color, #333);
    font-weight: 600;
    font-family: monospace;
  }

  @media (max-width: 600px) {
    .about-page {
      padding: 16px;
    }

    h1 {
      font-size: 24px;
    }

    .about-header {
      padding: 16px 20px;
    }

    .about-content {
      padding: 24px;
    }

    .app-icon {
      font-size: 64px;
    }

    .version-info h2 {
      font-size: 24px;
      margin-bottom: 24px;
    }

    .version-item {
      padding: 10px 16px;
    }

    .label,
    .value {
      font-size: 13px;
    }
  }
</style>
