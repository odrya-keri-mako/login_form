<script lang="ts">
  import { onMount } from 'svelte';
  import { validate } from './validators';

  let email = '';
  let password = '';
  let showPassword = false;

  let isDark = true;

  let emailEl: HTMLInputElement | null = null;
  let passwordEl: HTMLInputElement | null = null;

  // derived
  $: hasEmail = email.trim().length > 0;
  $: hasPass  = password.trim().length > 0;

  $: emailValid = validate('email', email);
  $: passValid  = validate('password', password);

  $: canLogin = emailValid && passValid;

  // theme apply
  $: document.body?.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');

  onMount(() => {
    emailEl?.focus();
  });

  function clearEmail() {
    email = '';
    queueMicrotask(() => emailEl?.focus());
  }

  function clearPassword() {
    password = '';
    queueMicrotask(() => passwordEl?.focus());
  }

  function resetAll() {
    email = '';
    password = '';
    showPassword = false;
    queueMicrotask(() => emailEl?.focus());
  }

  function onLogin() {
    alert(`Email cím: ${email.trim()}\n
           Jelszó: ${password.trim()}`);
    resetAll();
  }

  function onCancel() {
    const hasAny = hasEmail || hasPass;

    if (hasAny && !confirm('Az adatok elvesznek, biztos megszakítja?')) {
      queueMicrotask(() => emailEl?.focus());
      return;
    }

    alert('Megszakítva!');
    resetAll();
  }
</script>

<div class="container-fluid">
  <div class="row vh-100 px-2 position-relative 
              justify-content-center align-items-center">

    <!-- Toggle theme -->
    <button type="button"
            class="position-fixed top-0 end-0 w-auto 
                   p-3 z-3 cursor-pointer btn btn-link"
            title="Toggle theme"
            on:click={() => (isDark = !isDark)}>
      <i class="fa-solid fa-moon fa-lg text-black" class:d-none={isDark}></i>
      <i class="fa-solid fa-sun fa-lg text-white" class:d-none={!isDark}></i>
    </button>

    <!-- Form -->
    <form class="w-auto p-3 border rounded 
                 shadow-sm-bottom-end scale-in" 
          on:submit|preventDefault>

      <!-- Title -->
      <div class="row my-4 justify-content-center">
        <img src="/svelte.svg" 
             class="mb-3" 
             height="50" 
             alt="logo" 
             loading="lazy">
        <h4 class="text-center">
          <i class="fa-solid fa-right-to-bracket me-1"></i>
          Bejelentkezés
        </h4>
      </div>

      <!-- Email -->
      <div class="mb-4">

        <!-- Label -->
        <label class="form-label fw-bold" 
               for="email">
          <i class="fa-solid fa-star fa-2xs text-danger"></i>
          <i class="fa-solid fa-envelope me-1"></i>
          Email cím:
        </label>

        <!-- Input -->
        <div class="position-relative 
                    d-flex flex-col align-items-center">
          <input bind:this={emailEl}
                 id="email"
                 type="email"
                 class="form-control pe-5"
                 placeholder="email cím"
                 autocomplete="email"
                 spellcheck="false"
                 bind:value={email} />

          <!-- Clear icon -->
          <button type="button"
                  class="position-absolute border-0 
                         bg-transparent p-0 end-0 me-5"
                  class:invisible={!hasEmail}
                  aria-label="Clear icon"
                  on:click={clearEmail}>
            <i class="fa-solid fa-xmark text-primary fa-2xs"></i>
          </button>

          <!-- Check icon -->
          <i class="fa-solid fa-check ms-3 text-success fw-bold"
             class:invisible={!emailValid}></i>
        </div>
      </div>

      <!-- Password -->
      <div class="mb-1">

        <!-- Label -->
        <label class="form-label fw-bold" 
               for="password">
          <i class="fa-solid fa-star fa-2xs text-danger"></i>
          <i class="fa-solid fa-key me-1"></i>
          Jelszó:
        </label>

        <!-- Input -->
        <div class="position-relative 
                    d-flex flex-col align-items-center">
          <input bind:this={passwordEl}
                 id="password"
                 type={showPassword ? 'text' : 'password'}
                 class="form-control pe-5"
                 placeholder="jelszó"
                 autocomplete="current-password"
                 spellcheck="false"
                 bind:value={password}/>

          <!-- Clear icon -->
          <button type="button"
                  class="position-absolute border-0 
                         bg-transparent p-0 end-0 me-5"
                  class:invisible={!hasPass}
                  aria-label="Cleare icon"
                  on:click={clearPassword}>
            <i class="fa-solid fa-xmark text-primary fa-2xs"></i>
          </button>

          <!-- Check icon -->
          <i class="fa-solid fa-check ms-3 text-success fw-bold"
             class:invisible={!passValid}></i>
        </div>
      </div>

      <!-- Password rule -->
      <div class="mb-2 fs-xs ms-1 me-5 text-break">
        6-20 karakter (legalább egy nagybetűt, egy kisbetűt és egy számot tartalmaz)
      </div>

      <!-- Show/Hide password -->
      <div class="mb-5 d-flex align-items-center">

        <!-- Input -->
        <input id="showPassword"
               type="checkbox"
               class="form-check-input m-0"
               bind:checked={showPassword}/>

        <!-- Label -->
        <label class="form-check-label fs-sm" 
               for="showPassword">
          <i class="fa-solid fa-eye fa-sm ms-2"></i>
          jelszót megjelenít
        </label>
      </div>

      <!-- Buttons -->
      <div class="text-center">

        <!-- Login -->
        <button type="button"
                class="btn btn-primary btn-form mx-2 mb-3 
                       shadow-sm-bottom-end btn-click-effect"
                disabled={!canLogin}
                on:click={onLogin}>
          <i class="fa-solid fa-right-to-bracket me-1"></i>
          Bejelentkezés
        </button>

        <!-- Cancel -->
        <button type="button"
                class="btn btn-secondary btn-form mx-2 mb-3 
                  shadow-sm-bottom-end btn-click-effect"
                on:click={onCancel}>
          <i class="fa-solid fa-circle-xmark me-1"></i>
          Mégsem
        </button>
      </div>
    </form>
  </div>
</div>

<style scoped>
  button.btn-form {
    min-width: 150px;
  }
</style>