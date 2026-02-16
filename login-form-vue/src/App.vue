<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { validate } from './validators';

const email = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);

const isDark = ref<boolean>(true);

const emailEl = ref<HTMLInputElement | null>(null);
const passwordEl = ref<HTMLInputElement | null>(null);

// Watch dark mode changes and set data attribute on body for Bootstrap theming
watch(isDark, (v) => {
  document.body.setAttribute('data-bs-theme', v ? 'dark' : 'light');
}, { immediate: true });

// On startap, focus the email input
onMounted(() => {
  emailEl.value?.focus();
});

const hasEmail = computed(() => email.value.trim().length > 0);
const hasPass  = computed(() => password.value.trim().length > 0);

const emailValid = computed(() => validate('email', email.value));
const passValid  = computed(() => validate('password', password.value));

const canLogin = computed(() => emailValid.value && passValid.value);

function clearEmail(): void {
  email.value = '';
  queueMicrotask(() => emailEl.value?.focus());
}

function clearPassword(): void {
  password.value = '';
  queueMicrotask(() => passwordEl.value?.focus());
}

function resetAll(): void {
  email.value = '';
  password.value = '';
  showPassword.value = false;
  queueMicrotask(() => emailEl.value?.focus());
}

function onLogin(): void {
  alert(`Email cím: ${email.value.trim()}\n
         Jelszó: ${password.value.trim()}`);
  resetAll();
}

function onCancel(): void {
  const hasAny = hasEmail.value || hasPass.value;

  if (hasAny && !confirm('Az adatok elvesznek, biztos megszakítja?')) {
    queueMicrotask(() => emailEl.value?.focus());
    return;
  }

  alert('Megszakítva!');
  resetAll();
}
</script>

<template>
  <div class="container-fluid">
    <div class="row vh-100 px-2 position-relative 
                justify-content-center align-items-center">

      <!-- Toggle theme -->
      <div class="position-fixed top-0 end-0 
                  w-auto p-3 z-3 cursor-pointer"
          @click="isDark = !isDark">
        <i class="fa-solid fa-moon fa-lg" :class="{ 'd-none': isDark }"></i>
        <i class="fa-solid fa-sun  fa-lg" :class="{ 'd-none': !isDark }"></i>
      </div>

      <!-- Form -->
      <form class="w-auto p-3 border rounded 
                   shadow-sm-bottom-end scale-in" 
            @submit.prevent="onLogin">

        <!-- Title -->
        <div class="row my-4 justify-content-center">
          <img src="/vue.svg" 
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
            <input ref="emailEl"
                   id="email"
                   type="email"
                   class="form-control pe-5"
                   placeholder="email cím"
                   autocomplete="email"
                   spellcheck="false"
                   required
                   maxlength="253"
                   v-model="email"/>

            <!-- Clear icon -->
            <i class="fa-solid fa-xmark text-primary fa-2xs 
                      end-0 me-5 position-absolute cursor-pointer"
               :class="{ invisible: !hasEmail }"
               @click="clearEmail"></i>

            <!-- Check icon -->
            <i class="fa-solid fa-check ms-3 text-success fw-bold"
               :class="{ invisible: !emailValid }"></i>
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
            <input ref="passwordEl"
                   id="password"
                   :type="showPassword ? 'text' : 'password'"
                   class="form-control pe-5"
                   placeholder="jelszó"
                   autocomplete="current-password"
                   spellcheck="false"
                   minlength="6"
                   maxlength="20"
                   required
                   v-model="password" />

            <!-- Clear icon -->
            <i class="fa-solid fa-xmark text-primary fa-2xs 
                      end-0 me-5 position-absolute cursor-pointer"
               :class="{ invisible: !hasPass }"
               @click="clearPassword"></i>

            <!-- Check icon -->
            <i class="fa-solid fa-check ms-3 text-success fw-bold"
               :class="{ invisible: !passValid }"></i>
          </div>
        </div>

        <div class="mb-2 fs-xs ms-1 me-5 text-break">
          6-20 karakter (legalább egy nagybetűt, egy kisbetűt és egy számot tartalmaz)
        </div>

        <!-- Show/Hide password -->
        <div class="mb-5 d-flex align-items-center">

          <!-- Input -->
          <input id="showPassword"
                 type="checkbox"
                 class="form-check-input m-0"
                 v-model="showPassword"/>

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
                  :disabled="!canLogin"
                  @click="onLogin">
            <i class="fa-solid fa-right-to-bracket me-1"></i>
            Bejelentkezés
          </button>

          <!-- Cancel -->
          <button type="button"
                  class="btn btn-secondary btn-form mx-2 mb-3 
                  shadow-sm-bottom-end btn-click-effect"
                  @click="onCancel">
            <i class="fa-solid fa-circle-xmark me-1"></i>
            Mégsem
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  button.btn-form {
    min-width: 150px;
  }
</style>
