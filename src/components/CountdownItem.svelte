<script lang="ts">
  import type { CountdownItem, TimeRemaining } from '../lib/types';
  import { formatTimeDisplay } from '../lib/utils';

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
        ✏️
      </button>
      <button class="btn-icon btn-delete" on:click={onDelete} aria-label="Delete countdown">
        🗑️
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
            <div class="time-unit">
              <span class="time-value">{unit.value}</span>
              <span class="time-label">{unit.label}</span>
            </div>
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
    font-size: 18px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .btn-icon:hover {
    background: #f0f0f0;
  }

  .btn-delete:hover {
    background: #fee;
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
    gap: 12px;
    flex-wrap: wrap;
  }

  .time-display.loading {
    color: #999;
    font-style: italic;
  }

  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
  }

  .time-value {
    font-size: 24px;
    font-weight: 700;
    color: #667eea;
  }

  .time-label {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
  }

  @media (max-width: 600px) {
    .countdown-card {
      padding: 16px;
    }

    h3 {
      font-size: 18px;
    }

    .time-value {
      font-size: 20px;
    }
  }
</style>
