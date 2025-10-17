<script lang="ts">
  import type { CountdownItem, TimeRemaining } from '../lib/types';
  import { formatTimeDisplay } from '../lib/utils';
  import FlipCounter from './FlipCounter.svelte';
  import { Pencil, Trash2 } from 'lucide-svelte';

  export let countdown: CountdownItem;
  export let timeRemaining: TimeRemaining | undefined;
  export let onEdit: () => void;
  export let onDelete: () => void;

  function formatTargetDate(targetDate: number, targetAge: number): string {
    const date = new Date(targetDate);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return `Target: ${date.toLocaleDateString('en-US', options)} (Age ${targetAge})`;
  }

  $: timeUnits = timeRemaining
    ? formatTimeDisplay(timeRemaining, countdown.format)
    : [];
</script>

<div class="countdown-card">
  <div class="card-header">
    <h3>{countdown.title}</h3>
    <div class="card-actions">
      <button class="btn-icon btn-edit" on:click={onEdit} aria-label="Edit countdown">
        <Pencil size={18} />
      </button>
      <button class="btn-icon btn-delete" on:click={onDelete} aria-label="Delete countdown">
        <Trash2 size={18} />
      </button>
    </div>
  </div>

  <div class="card-body">
    <div class="target-date">
      {formatTargetDate(countdown.targetDate, countdown.targetAge)}
    </div>

    {#if timeRemaining}
      <div class="time-display">
        {#each timeUnits as unit}
          {#if unit.show}
            <FlipCounter value={unit.value} label={unit.label} />
          {/if}
        {/each}
      </div>
    {:else}
      <div class="time-display loading">Loading...</div>
    {/if}
  </div>
</div>

<style>
  .countdown-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .countdown-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0;
    font-size: 20px;
    color: #333;
    flex: 1;
  }

  .card-actions {
    display: flex;
    gap: 8px;
  }

  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }

  .btn-icon:hover {
    background: #f0f0f0;
  }

  .btn-edit:hover {
    color: #667eea;
  }

  .btn-delete:hover {
    background: #fee;
    color: #e74c3c;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .target-date {
    color: #666;
    font-size: 14px;
  }

  .time-display {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 16px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 12px;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .time-display.loading {
    color: #999;
    font-style: italic;
  }

  @media (max-width: 600px) {
    .countdown-card {
      padding: 16px;
    }

    h3 {
      font-size: 18px;
    }

    .time-display {
      gap: 12px;
      padding: 12px;
    }
  }
</style>
