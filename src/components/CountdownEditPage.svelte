<script lang="ts">
  import { fade } from 'svelte/transition';
  import { ArrowLeft } from 'lucide-svelte';
  import type { CountdownItem, DisplayFormat } from '../lib/types';

  export let countdown: CountdownItem | null = null;
  export let onSave: (title: string, dob: string, targetAge: number, format: DisplayFormat) => void;
  export let onCancel: () => void;

  let title = countdown?.title || '';
  let dob = countdown?.dob || '';
  let targetAge = countdown?.targetAge || 18;
  let format: DisplayFormat = countdown?.format || 'days';

  let titleError = '';
  let dobError = '';
  let ageError = '';

  function validateTitle(): boolean {
    if (!title.trim()) {
      titleError = 'Title is required';
      return false;
    }
    if (title.length > 50) {
      titleError = 'Title must be 50 characters or less';
      return false;
    }
    titleError = '';
    return true;
  }

  function validateDob(): boolean {
    if (!dob) {
      dobError = 'Date of birth is required';
      return false;
    }
    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
      dobError = 'Date of birth cannot be in the future';
      return false;
    }
    dobError = '';
    return true;
  }

  function validateAge(): boolean {
    if (!targetAge || targetAge < 1) {
      ageError = 'Target age must be at least 1';
      return false;
    }
    if (targetAge > 150) {
      ageError = 'Target age must be 150 or less';
      return false;
    }
    ageError = '';
    return true;
  }

  function handleSubmit() {
    const isTitleValid = validateTitle();
    const isDobValid = validateDob();
    const isAgeValid = validateAge();

    if (isTitleValid && isDobValid && isAgeValid) {
      onSave(title.trim(), dob, targetAge, format);
    }
  }
</script>

<div class="edit-page" in:fade={{ duration: 300 }}>
  <div class="edit-header">
    <button class="btn-back" on:click={onCancel} title="Go Back">
      <ArrowLeft size={24} />
    </button>
    <h1>{countdown ? 'Edit' : 'Create'}</h1>
  </div>

  <div class="edit-content">
    <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="title">
        Title
        <span class="char-count">{title.length}/50</span>
      </label>
      <input
        id="title"
        type="text"
        bind:value={title}
        on:blur={validateTitle}
        placeholder="Enter countdown title"
        maxlength="50"
        class:error={titleError}
      />
      {#if titleError}
        <span class="error-message">{titleError}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="dob">Date of Birth</label>
      <input
        id="dob"
        type="date"
        bind:value={dob}
        on:blur={validateDob}
        max={new Date().toISOString().split('T')[0]}
        class:error={dobError}
      />
      {#if dobError}
        <span class="error-message">{dobError}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="targetAge">Target Age</label>
      <input
        id="targetAge"
        type="number"
        bind:value={targetAge}
        on:blur={validateAge}
        min="1"
        max="150"
        class:error={ageError}
      />
      {#if ageError}
        <span class="error-message">{ageError}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="format">Display Format</label>
      <select id="format" bind:value={format}>
        <option value="days">Days (+ Hours, Minutes, Seconds)</option>
        <option value="hours">Hours (+ Minutes, Seconds)</option>
        <option value="minutes">Minutes (+ Seconds)</option>
        <option value="seconds">Seconds Only</option>
      </select>
    </div>

    <button type="submit" class="btn-save">
      {countdown ? 'Save Changes' : 'Create'}
    </button>
  </form>
  </div>
</div>

<style>
  .edit-page {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
  }

  .edit-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 20px 24px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .edit-header {
      background: rgba(30, 30, 30, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .btn-back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background: transparent;
    color: var(--tg-theme-text-color, #333);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btn-back:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    .btn-back:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: var(--tg-theme-text-color, #333);
  }

  .edit-content {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .edit-content {
      background: rgba(30, 30, 30, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--tg-theme-text-color, #333);
    font-size: 14px;
  }

  .char-count {
    font-size: 12px;
    color: var(--tg-theme-hint-color, #999);
    font-weight: 400;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--tg-theme-hint-color, rgba(0, 0, 0, 0.15));
    border-radius: 8px;
    font-size: 16px;
    background: var(--tg-theme-bg-color, #ffffff);
    color: var(--tg-theme-text-color, #333);
    transition: border-color 0.2s ease;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: var(--tg-theme-link-color, #667eea);
  }

  input.error {
    border-color: #e74c3c;
  }

  .error-message {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #e74c3c;
  }

  button[type="submit"],
  .btn-save {
    width: 100%;
    padding: 14px 24px;
    margin-top: 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    background: var(--tg-theme-button-color, #667eea);
    color: var(--tg-theme-button-text-color, #ffffff);
  }

  button[type="submit"]:hover,
  .btn-save:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  button[type="submit"]:active,
  .btn-save:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    .edit-page {
      padding: 16px;
    }

    h1 {
      font-size: 24px;
    }

    .edit-header {
      padding: 16px 20px;
    }

    .edit-content {
      padding: 24px;
    }
  }
</style>
