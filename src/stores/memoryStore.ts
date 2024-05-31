import { defineStore } from 'pinia'
import type { ThemeStoreState } from '@/models/ThemeStoreState'
import type { Theme } from '@/models/Theme'

export const useMemoryStore = defineStore('memoryStore', {
  state: (): ThemeStoreState => ({
    themes: []
  }),
  actions: {
    addTheme(theme: Theme) {
      this.themes.push(theme);
    }
  }
});