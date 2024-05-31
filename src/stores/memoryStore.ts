import { defineStore } from 'pinia'
import type { ThemeStoreState } from '@/models/ThemeStoreState'

export const useMemoryStore = defineStore('memoryStore', {
  state: (): ThemeStoreState => ({
    themes: []
  }),
  actions: {

  }
});