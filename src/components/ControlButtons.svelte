<script lang="ts">
  import { fade } from 'svelte/transition';

  export let isRunning = false;
  export let isPaused = false;
  export let onPause: () => void;
  export let onResume: () => void;
  export let onReset: () => void;

  function handlePauseResume() {
    if (isPaused) {
      onResume();
    } else {
      onPause();
    }
  }
</script>

{#if isRunning}
  <div class="button-group" transition:fade={{ duration: 200 }}>
    <button class="btn-pause" on:click={handlePauseResume}>
      {isPaused ? 'Resume' : 'Pause'}
    </button>
    <button class="btn-reset" on:click={onReset}>Reset</button>
  </div>
{/if}

<style>
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 30px;
  }

  button {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-pause {
    background: #f39c12;
    color: white;
  }

  .btn-pause:hover {
    background: #e67e22;
  }

  .btn-reset {
    background: #95a5a6;
    color: white;
  }

  .btn-reset:hover {
    background: #7f8c8d;
  }

  @media (max-width: 600px) {
    .button-group {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
</style>
