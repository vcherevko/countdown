<script lang="ts">
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

<div class="edit-page">
  <h2>{countdown ? 'Edit Countdown' : 'New Countdown'}</h2>

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

    <div class="form-actions">
      <button type="button" class="btn-cancel" on:click={onCancel}>
        Cancel
      </button>
      <button type="submit" class="btn-save">
        {countdown ? 'Save Changes' : 'Create Countdown'}
      </button>
    </div>
  </form>
</div>

<style>
  .edit-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  h2 {
    margin: 0 0 24px 0;
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  form {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    color: #333;
    font-size: 14px;
  }

  .char-count {
    font-size: 12px;
    color: #999;
    font-weight: 400;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s ease;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #667eea;
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

  .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  button[type="submit"],
  .btn-save {
    flex: 1;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #667eea;
    color: white;
  }

  button[type="submit"]:hover,
  .btn-save:hover {
    background: #5568d3;
    transform: translateY(-1px);
  }

  .btn-cancel {
    flex: 1;
    padding: 12px 24px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    background: white;
    color: #666;
  }

  .btn-cancel:hover {
    border-color: #ccc;
    background: #f5f5f5;
  }

  @media (max-width: 600px) {
    .edit-page {
      padding: 16px;
    }

    form {
      padding: 20px;
    }

    h2 {
      font-size: 24px;
    }

    .form-actions {
      flex-direction: column;
    }
  }
</style>
