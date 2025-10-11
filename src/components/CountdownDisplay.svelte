<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import type { TimeRemaining, TimeUnit } from '../lib/types';
  import { formatTargetDate } from '../lib/utils';

  export let targetDateTimestamp: number | null;
  export let timeRemaining: TimeRemaining | null;
  export let timeUnits: TimeUnit[];

  $: targetDate = targetDateTimestamp ? new Date(targetDateTimestamp) : null;
</script>

{#if targetDate && timeRemaining}
  <div class="countdown-section" transition:fade>
    <div class="target-date">
      <div class="target-date-label">Target Date</div>
      <div class="target-date-value">{formatTargetDate(targetDate)}</div>
    </div>

    <div class="time-grid">
      {#each timeUnits as unit, index (index)}
        <div class="time-card">
          <div class="time-value">{unit.value}</div>
          <div class="time-label">{unit.label}</div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .countdown-section {
    margin-top: 40px;
  }

  .target-date {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 30px;
  }

  .target-date-label {
    font-size: 12px;
    color: #777;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }

  .target-date-value {
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }

  .time-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 15px;
    margin-top: 10px;
  }

  .time-card {
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.1) 100%
    );
    border-radius: 12px;
    padding: 20px 10px;
    text-align: center;
    transition: transform 0.2s ease;
  }

  .time-card:hover {
    transform: translateY(-2px);
  }

  .time-value {
    font-size: 36px;
    font-weight: 700;
    color: #667eea;
    line-height: 1;
    margin-bottom: 8px;
  }

  .time-label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .time-grid {
      gap: 10px;
    }

    .time-card {
      padding: 15px 8px;
    }

    .time-value {
      font-size: 28px;
    }

    .time-label {
      font-size: 10px;
    }
  }
</style>
