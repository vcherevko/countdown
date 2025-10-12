<script lang="ts">
  import { fade } from 'svelte/transition';
  import CountdownItem from './CountdownItem.svelte';
  import type { CountdownItem as CountdownItemType, ConfirmDialogConfig } from '../lib/types';
  import type { TimeRemaining } from '../lib/types';

  export let countdowns: CountdownItemType[] = [];
  export let timeRemainingMap: Map<string, TimeRemaining>;
  export let onAdd: () => void;
  export let onEdit: (id: string) => void;
  export let onDelete: (id: string) => void;
  export let showConfirmDialog: (config: ConfirmDialogConfig) => void;

  function handleDelete(countdown: CountdownItemType) {
    showConfirmDialog({
      title: 'Delete Countdown',
      message: `Are you sure you want to delete "${countdown.title}"?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => onDelete(countdown.id),
    });
  }
</script>

<div class="list-page">
  <div class="list-header">
    <h1>My Countdowns</h1>
    <button class="btn-add" on:click={onAdd} title="Add New Countdown">
      +
    </button>
  </div>

  {#if countdowns.length === 0}
    <div class="empty-state" in:fade={{ duration: 300 }}>
      <div class="empty-icon">⏰</div>
      <h3>No Countdowns Yet</h3>
      <p>Create your first countdown to start tracking important dates!</p>
    </div>
  {:else}
    <div class="countdown-list">
      {#each countdowns as countdown (countdown.id)}
        <div in:fade={{ duration: 200 }}>
          <CountdownItem
            {countdown}
            timeRemaining={timeRemainingMap.get(countdown.id)}
            onEdit={() => onEdit(countdown.id)}
            onDelete={() => handleDelete(countdown)}
          />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .list-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px 24px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .btn-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 32px;
    font-weight: 300;
    line-height: 1;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .btn-add:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  .btn-add:active {
    transform: scale(0.95) rotate(90deg);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 2px dashed rgba(255, 255, 255, 0.2);
  }

  .empty-icon {
    font-size: 96px;
    margin-bottom: 24px;
    opacity: 0.6;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  .empty-state h3 {
    margin: 0 0 12px 0;
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .empty-state p {
    margin: 0;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    max-width: 400px;
    line-height: 1.6;
  }

  .countdown-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 600px) {
    .list-page {
      padding: 16px;
    }

    h1 {
      font-size: 24px;
    }

    .list-header {
      padding: 16px 20px;
    }

    .btn-add {
      width: 48px;
      height: 48px;
      font-size: 28px;
    }

    .empty-state {
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 72px;
    }

    .empty-state h3 {
      font-size: 22px;
    }

    .empty-state p {
      font-size: 14px;
    }
  }
</style>
