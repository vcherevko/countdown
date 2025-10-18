<script lang="ts">
  import { onMount } from 'svelte';

  let isDarkTheme = false;

  onMount(() => {
    const checkTheme = () => {
      const bgColor = getComputedStyle(document.body).getPropertyValue('--tg-theme-bg-color').trim();

      if (bgColor && bgColor.startsWith('#')) {
        const hex = bgColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        isDarkTheme = brightness < 128;
      } else if (bgColor && bgColor.startsWith('rgb')) {
        const match = bgColor.match(/\d+/g);
        if (match && match.length >= 3) {
          const brightness = (parseInt(match[0]) * 299 + parseInt(match[1]) * 587 + parseInt(match[2]) * 114) / 1000;
          isDarkTheme = brightness < 128;
        }
      } else {
        isDarkTheme = window.Telegram?.WebApp?.colorScheme === 'dark';
      }
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  });

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));
</script>

<div class="particle-background" class:dark={isDarkTheme} class:light={!isDarkTheme}>
  {#each particles as particle (particle.id)}
    <div
      class="particle"
      style="
        left: {particle.left}%;
        top: {particle.top}%;
        width: {particle.size}px;
        height: {particle.size}px;
        animation-duration: {particle.duration}s;
        animation-delay: {particle.delay}s;
      "
    />
  {/each}
</div>

<style>
  .particle-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    border-radius: 50%;
    animation: twinkle linear infinite;
    will-change: opacity;
  }

  .light .particle {
    background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, rgba(102, 126, 234, 0.1) 100%);
    box-shadow: 0 0 4px rgba(102, 126, 234, 0.3);
  }

  .dark .particle {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .particle {
      animation: none;
      opacity: 0.3;
    }
  }
</style>
