import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    // Реактивное состояние темы
    const theme = ref(localStorage.getItem('theme') || 'light')

    // Вычисляемое свойство для проверки текущей темы
    const isDark = computed(() => theme.value === 'dark')
    const isLight = computed(() => theme.value === 'light')

    // Действия для изменения темы
    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    const setTheme = (newTheme) => {
        if (['light', 'dark'].includes(newTheme)) {
            theme.value = newTheme
        }
    }

    // Функция для обновления класса темы в документе
    const updateDocumentTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // Следим за изменением темы и сохраняем в localStorage
    watch(theme, (newTheme) => {
        localStorage.setItem('theme', newTheme)
        updateDocumentTheme(newTheme)
    }, { immediate: true })


    return {
        theme,
        isDark,
        isLight,
        toggleTheme,
        setTheme
    }
})