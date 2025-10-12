<script lang="ts">
  import { fade } from 'svelte/transition';
  import CountdownForm from './components/CountdownForm.svelte';
  import CountdownDisplay from './components/CountdownDisplay.svelte';
  import ControlButtons from './components/ControlButtons.svelte';
  import { countdownStore } from './stores/countdown';
  import { formatTimeDisplay } from './lib/utils';
  import type { DisplayFormat } from './lib/types';

  $: timeUnits =
    $countdownStore.timeRemaining && $countdownStore.format
      ? formatTimeDisplay($countdownStore.timeRemaining, $countdownStore.format)
      : [];

  function handleStart(dob: string, targetAge: number, format: DisplayFormat) {
    countdownStore.start(dob, targetAge, format);
  }

  function handlePause() {
    countdownStore.pause();
  }

  function handleResume() {
    countdownStore.resume();
  }

  function handleReset() {
    countdownStore.reset();
  }
</script>

<main>
  <div class="countdown-app">
    <h2>Countdown to Target Age</h2>

{#key $countdownStore.isRunning}
      {#if !$countdownStore.isRunning}
        <div in:fade={{ duration: 250, delay: 150 }} out:fade={{ duration: 150 }}>
          <CountdownForm
            onStart={handleStart}
            disabled={$countdownStore.isRunning}
          />
        </div>
      {/if}

      <ControlButtons
        isRunning={$countdownStore.isRunning}
        isPaused={$countdownStore.isPaused}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
      />

      {#if $countdownStore.isRunning}
        <div in:fade={{ duration: 250, delay: 150 }} out:fade={{ duration: 150 }}>
          <CountdownDisplay
            targetDateTimestamp={$countdownStore.targetDateTimestamp}
            timeRemaining={$countdownStore.timeRemaining}
            {timeUnits}
          />
        </div>
      {/if}
    {/key}
  </div>
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--tg-theme-bg-color, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .countdown-app {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    padding: 40px;
    max-width: 500px;
    width: 100%;
  }

  h2 {
    color: #333;
    font-size: 28px;
    margin-bottom: 30px;
    text-align: center;
  }

  @media (max-width: 600px) {
    .countdown-app {
      padding: 30px 20px;
    }

    h2 {
      font-size: 24px;
    }
  }
</style>
