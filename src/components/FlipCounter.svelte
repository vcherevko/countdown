<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let value: number;
  export let label: string;

  let prevValue = value;
  let digits: { current: number; prev: number; isFlipping: boolean }[] = [];
  let isInitialMount = true;

  function splitIntoDigits(num: number): number[] {
    const str = num.toString().padStart(2, '0');
    return str.split('').map(d => parseInt(d));
  }

  function initDigits() {
    const currentDigits = splitIntoDigits(value);
    digits = currentDigits.map(d => ({
      current: d,
      prev: d,
      isFlipping: false
    }));
  }

  function handleAnimationEnd(index: number) {
    if (digits[index] && digits[index].isFlipping) {
      digits[index] = {
        current: digits[index].current,
        prev: digits[index].current,
        isFlipping: false
      };
      digits = [...digits];
    }
  }

  function updateDigits(newValue: number) {
    if (isInitialMount || digits.length === 0) return;

    const newDigits = splitIntoDigits(newValue);
    const updatedDigits = [...digits];

    for (let i = 0; i < newDigits.length; i++) {
      if (updatedDigits[i] && newDigits[i] !== updatedDigits[i].current) {
        updatedDigits[i] = {
          prev: updatedDigits[i].current,
          current: newDigits[i],
          isFlipping: true
        };
      }
    }

    digits = updatedDigits;
  }

  $: {
    if (isInitialMount) {
      initDigits();
    } else if (value !== prevValue) {
      updateDigits(value);
      prevValue = value;
    }
  }

  onMount(() => {
    setTimeout(() => {
      isInitialMount = false;
    }, 100);
  });
</script>

<div class="flip-counter">
  <div class="flip-digits">
    {#each digits as digitData, i (i)}
      <div class="flip-digit">
        <!-- Static top half (new number) -->
        <div class="digit-half digit-top-static">
          <span>{digitData.current}</span>
        </div>

        <!-- Static bottom half (shows prev during flip, current after) -->
        <div class="digit-half digit-bottom-static">
          <span>{digitData.isFlipping ? digitData.prev : digitData.current}</span>
        </div>

        <!-- Animated flipping top half -->
        <div
          class="digit-top-flip"
          class:flipping={digitData.isFlipping}
          on:animationend={() => handleAnimationEnd(i)}
        >
          <div class="flip-half flip-front">
            <span class="top-half">{digitData.prev}</span>
          </div>
          <div class="flip-half flip-back">
            <span class="bottom-half">{digitData.current}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="flip-label">{label}</div>
</div>

<style>
  .flip-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .flip-digits {
    display: flex;
    gap: 4px;
    perspective: 1000px;
  }

  .flip-digit {
    position: relative;
    width: 48px;
    height: 64px;
    backface-visibility: hidden;
    transform: translateZ(0);
  }

  /* Shared styles for all halves */
  .digit-half,
  .flip-half {
    position: absolute;
    width: 100%;
    height: 50%;
    overflow: hidden;
    background: linear-gradient(180deg, #0f3460 0%, #1a4d7a 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
  }

  /* Static top half - shows new number after flip */
  .digit-top-static {
    top: 0;
    left: 0;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  /* Static bottom half - always shows current number */
  .digit-bottom-static {
    bottom: 0;
    left: 0;
    border-radius: 0 0 8px 8px;
    background: linear-gradient(180deg, #0a2540 0%, #0f3460 100%);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  /* Animated flipping top half container */
  .digit-top-flip {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    transform-style: preserve-3d;
    transform-origin: bottom center;
    z-index: 2;
    transform: rotateX(0deg);
  }

  .digit-top-flip.flipping {
    animation: flipDown 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
    will-change: transform;
  }

  .digit-top-flip:not(.flipping) {
    will-change: auto;
  }

  @keyframes flipDown {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(-180deg);
    }
  }

  /* Front face of flipping element (old number) */
  .flip-front {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  /* Back face of flipping element (new number) */
  .flip-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: rotateX(180deg);
    border-radius: 0 0 8px 8px;
    background: linear-gradient(180deg, #0a2540 0%, #0f3460 100%);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* Number styling */
  .digit-half span,
  .flip-half span {
    position: absolute;
    width: 100%;
    left: 0;
    font-size: 40px;
    font-weight: 700;
    color: #00d4ff;
    text-align: center;
    text-shadow: 0 2px 8px rgba(0, 212, 255, 0.5);
    line-height: 1;
  }

  /* Top half numbers - show top portion */
  .digit-top-static span,
  .flip-half span.top-half {
    top: 6px;
  }

  /* Bottom half numbers - show bottom portion */
  .digit-bottom-static span,
  .flip-half span.bottom-half {
    top: -26px;
  }

  .flip-label {
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }

  @media (max-width: 600px) {
    .flip-digit {
      width: 36px;
      height: 48px;
    }

    .digit-half span,
    .flip-half span {
      font-size: 28px;
    }

    .digit-top-static span,
    .flip-half span.top-half {
      top: 8px;
    }

    .digit-bottom-static span,
    .flip-half span.bottom-half {
      top: -14px;
    }

    .flip-label {
      font-size: 9px;
    }
  }
</style>
