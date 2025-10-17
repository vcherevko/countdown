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
        <div
          class="flip-card"
          class:flipping={digitData.isFlipping}
          on:animationend={() => handleAnimationEnd(i)}
        >
          <div class="flip-card-face flip-card-front">
            <div class="flip-card-half flip-card-top">
              <span>{digitData.prev}</span>
            </div>
            <div class="flip-card-half flip-card-bottom">
              <span>{digitData.prev}</span>
            </div>
          </div>
          <div class="flip-card-face flip-card-back">
            <div class="flip-card-half flip-card-top">
              <span>{digitData.current}</span>
            </div>
            <div class="flip-card-half flip-card-bottom">
              <span>{digitData.current}</span>
            </div>
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
  }

  .flip-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
  }

  .flip-card.flipping {
    animation: flip 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
  }

  @keyframes flip {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(-180deg);
    }
  }

  .flip-card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .flip-card-front {
    transform: rotateX(0deg);
  }

  .flip-card-back {
    transform: rotateX(180deg);
  }

  .flip-card-half {
    position: absolute;
    width: 100%;
    height: 50%;
    overflow: hidden;
    background: linear-gradient(180deg, #0f3460 0%, #1a4d7a 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .flip-card-top {
    top: 0;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .flip-card-bottom {
    bottom: 0;
    border-radius: 0 0 8px 8px;
    background: linear-gradient(180deg, #0a2540 0%, #0f3460 100%);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .flip-card-half span {
    position: absolute;
    width: 100%;
    left: 0;
    font-size: 40px;
    font-weight: 700;
    color: #00d4ff;
    text-align: center;
    text-shadow: 0 2px 8px rgba(0, 212, 255, 0.5);
  }

  .flip-card-top span {
    top: 2px;
  }

  .flip-card-bottom span {
    top: -29px;
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

    .flip-card-half span {
      font-size: 28px;
    }

    .flip-card-top span {
      top: 6px;
    }

    .flip-card-bottom span {
      top: -16px;
    }

    .flip-label {
      font-size: 9px;
    }
  }
</style>
