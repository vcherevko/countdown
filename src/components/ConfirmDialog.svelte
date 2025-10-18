<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { ConfirmDialogConfig } from '../lib/types';

  export let config: ConfirmDialogConfig | null = null;

  function handleConfirm() {
    if (config) {
      config.onConfirm();
      config = null;
    }
  }

  function handleCancel() {
    if (config) {
      config.onCancel?.();
      config = null;
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      handleCancel();
    }
  }
</script>

{#if config}
  <div
    class="dialog-backdrop"
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    transition:fade={{ duration: 200 }}
    role="presentation"
  >
    <div class="dialog" role="dialog" aria-modal="true" transition:fade={{ duration: 200, delay: 100 }}>
      <h3>{config.title}</h3>
      <p>{config.message}</p>
      <div class="dialog-actions">
        <button class="btn-cancel" on:click={handleCancel}>
          {config.cancelText || 'Cancel'}
        </button>
        <button class="btn-confirm" on:click={handleConfirm}>
          {config.confirmText || 'Confirm'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .dialog {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    .dialog {
      background: rgba(30, 30, 30, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  h3 {
    margin: 0 0 12px 0;
    font-size: 20px;
    color: var(--tg-theme-text-color, #333);
  }

  p {
    margin: 0 0 24px 0;
    color: var(--tg-theme-hint-color, #666);
    line-height: 1.5;
  }

  .dialog-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-cancel {
    background: var(--tg-theme-bg-color, #e0e0e0);
    color: var(--tg-theme-text-color, #333);
  }

  .btn-cancel:hover {
    opacity: 0.8;
  }

  .btn-confirm {
    background: #e74c3c;
    color: white;
  }

  .btn-confirm:hover {
    opacity: 0.9;
  }
</style>
