<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import type { TimeRemaining } from '../lib/types';
  import { formatTargetDate } from '../lib/utils';

  export let targetDateTimestamp: number | null;
  export let timeRemaining: TimeRemaining | null;
  export let displayText: string;

  $: targetDate = targetDateTimestamp ? new Date(targetDateTimestamp) : null;
</script>

{#if targetDate && timeRemaining}
  <div class="countdown-section" transition:fade>
    <div class="target-date">
      <div class="target-date-label">Target Date</div>
      <div class="target-date-value">{formatTargetDate(targetDate)}</div>
    </div>

    <h1 class="time" transition:scale>{displayText}</h1>
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
    margin-bottom: 20px;
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

  .time {
    font-size: 48px;
    color: #667eea;
    text-align: center;
    font-weight: 700;
    line-height: 1.2;
    padding: 20px;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.1) 100%
    );
    border-radius: 12px;
    margin: 0;
  }

  @media (max-width: 600px) {
    .time {
      font-size: 32px;
      padding: 15px;
    }
  }
</style>
