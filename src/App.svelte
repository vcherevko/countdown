<script lang="ts">
  import { fade } from 'svelte/transition';
  import CountdownList from './components/CountdownList.svelte';
  import CountdownEditPage from './components/CountdownEditPage.svelte';
  import SettingsPage from './components/SettingsPage.svelte';
  import AboutPage from './components/AboutPage.svelte';
  import ConfirmDialog from './components/ConfirmDialog.svelte';
  import ParticleBackground from './components/ParticleBackground.svelte';
  import { countdownsStore, sortedCountdowns } from './stores/countdown';
  import type { ConfirmDialogConfig, DisplayFormat } from './lib/types';

  let confirmDialogConfig: ConfirmDialogConfig | null = null;

  function showConfirmDialog(config: ConfirmDialogConfig) {
    confirmDialogConfig = config;
  }

  function handleAdd() {
    countdownsStore.navigateTo('add', null);
  }

  function handleEdit(id: string) {
    countdownsStore.navigateTo('edit', id);
  }

  function handleDelete(id: string) {
    countdownsStore.deleteCountdown(id);
  }

  function handleSettings() {
    countdownsStore.navigateTo('settings', null);
  }

  function handleAbout() {
    countdownsStore.navigateTo('about', null);
  }

  function handleSave(title: string, dob: string, targetAge: number, format: DisplayFormat) {
    if ($countdownsStore.currentPage === 'add') {
      countdownsStore.addCountdown(title, dob, targetAge, format);
    } else if ($countdownsStore.currentPage === 'edit' && $countdownsStore.activeId) {
      countdownsStore.updateCountdown($countdownsStore.activeId, {
        title,
        dob,
        targetAge,
        format,
      });
    }
    countdownsStore.navigateTo('list', null);
  }

  function handleCancel() {
    countdownsStore.navigateTo('list', null);
  }

  function handleBack() {
    countdownsStore.navigateTo('list', null);
  }

  $: activeCountdown = $countdownsStore.activeId
    ? $countdownsStore.items.find((item) => item.id === $countdownsStore.activeId) || null
    : null;
</script>

<ParticleBackground />

<main>
  <div class="countdown-app">
    {#if $countdownsStore.currentPage === 'list'}
      <div in:fade={{ duration: 200 }}>
        <CountdownList
          countdowns={$sortedCountdowns}
          timeRemainingMap={$countdownsStore.timeRemainingMap}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSettings={handleSettings}
          onAbout={handleAbout}
          {showConfirmDialog}
        />
      </div>
    {:else if $countdownsStore.currentPage === 'add'}
      <div in:fade={{ duration: 200 }}>
        <CountdownEditPage
          countdown={null}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    {:else if $countdownsStore.currentPage === 'edit'}
      <div in:fade={{ duration: 200 }}>
        <CountdownEditPage
          countdown={activeCountdown}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    {:else if $countdownsStore.currentPage === 'settings'}
      <div in:fade={{ duration: 200 }}>
        <SettingsPage onBack={handleBack} />
      </div>
    {:else if $countdownsStore.currentPage === 'about'}
      <div in:fade={{ duration: 200 }}>
        <AboutPage onBack={handleBack} />
      </div>
    {/if}
  </div>

  <ConfirmDialog bind:config={confirmDialogConfig} />
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--tg-theme-bg-color, #f5f5f5);
    color: var(--tg-theme-text-color, #333);
    min-height: 100vh;
    margin: 0;
  }

  main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .countdown-app {
    width: 100%;
    max-width: 840px;
    position: relative;
  }

  @media (max-width: 600px) {
    main {
      padding: 10px;
    }
  }
</style>
