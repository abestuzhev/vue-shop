<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { theme, isDark, isLight } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<template>
  <div class="theme-toggle">
    <button
        @click="toggleTheme"
        class="theme-toggle__button"
        :class="{ 'theme-toggle__button--dark': isDark }"
        :aria-label="isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'"
    >
      <span class="theme-toggle__icon">
        <svg v-if="isLight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </span>
      <span class="theme-toggle__text">
        {{ isDark ? 'Светлая тема' : 'Темная тема' }}
      </span>
    </button>

<!--    <div class="theme-toggle__status">-->
<!--      Текущая тема: <strong>{{ theme }}</strong>-->
<!--    </div>-->
  </div>
</template>


<style scoped>
.theme-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.theme-toggle__button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 2px solid #e5e7eb;
  background-color: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle__button:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.theme-toggle__button--dark {
  background-color: #374151;
  color: white;
  border-color: #4b5563;
}

.theme-toggle__button--dark:hover {
  background-color: #4b5563;
  border-color: #6b7280;
}

.theme-toggle__icon {
  display: flex;
  align-items: center;
}

.theme-toggle__text {
  font-size: 0.875rem;
}

.theme-toggle__status {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Темная тема стили */
.dark .theme-toggle__button:not(.theme-toggle__button--dark) {
  background-color: #1f2937;
  color: #f3f4f6;
  border-color: #374151;
}

.dark .theme-toggle__button:not(.theme-toggle__button--dark):hover {
  background-color: #374151;
  border-color: #4b5563;
}

.dark .theme-toggle__status {
  color: #9ca3af;
}
</style>