<script lang="ts">
  import type { DisplayFormat } from '../lib/types';
  import { validateDob, validateTargetAge } from '../lib/utils';

  export let onStart: (dob: string, targetAge: number, format: DisplayFormat) => void;
  export let disabled = false;

  let dob = '';
  let targetAge: number | '' = '';
  let format: DisplayFormat = 'days';
  let dobError = '';
  let ageError = '';

  function handleSubmit() {
    dobError = validateDob(dob);
    ageError = validateTargetAge(Number(targetAge));

    if (dobError || ageError) return;

    onStart(dob, Number(targetAge), format);
  }

  function clearErrors() {
    dobError = '';
    ageError = '';
  }
</script>

<div class="input-group">
  <label for="dob">Date of Birth:</label>
  <input
    type="date"
    id="dob"
    bind:value={dob}
    on:input={clearErrors}
    class:error={dobError}
    {disabled}
  />
  {#if dobError}
    <div class="error-message">{dobError}</div>
  {/if}
</div>

<div class="input-group">
  <label for="age">Target Age:</label>
  <input
    type="number"
    id="age"
    min="1"
    placeholder="e.g., 30"
    bind:value={targetAge}
    on:input={clearErrors}
    class:error={ageError}
    {disabled}
  />
  {#if ageError}
    <div class="error-message">{ageError}</div>
  {/if}
</div>

<div class="input-group">
  <label for="format">Display Format:</label>
  <select id="format" bind:value={format} {disabled}>
    <option value="days">Days</option>
    <option value="hours">Hours</option>
    <option value="minutes">Minutes</option>
    <option value="seconds">Seconds</option>
  </select>
</div>

<button class="btn-start" on:click={handleSubmit} {disabled}>
  Start Countdown
</button>

<style>
  .input-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    color: #555;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 14px;
  }

  input[type='date'],
  input[type='number'],
  select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    background: white;
  }

  input[type='date']:focus,
  input[type='number']:focus,
  select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  input:disabled,
  select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    border-color: #e74c3c !important;
  }

  .error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
  }

  .btn-start {
    width: 100%;
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin-top: 10px;
  }

  .btn-start:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }

  .btn-start:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
