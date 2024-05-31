import { defineStore } from 'pinia'
import type { ThemeStoreState } from '@/models/ThemeStoreState'
import type { Theme } from '@/models/Theme'
import type { Card } from '@/models/Card'

export const useMemoryStore = defineStore('memoryStore', {
  state: (): ThemeStoreState => ({
    themes: [] as Theme[]
  }),
  actions: {
    addTheme(theme: Theme) {
      this.themes.push(theme);
    },
    addCard(themeId: number, card: Card) {
      const theme  = this.themes.find(theme => theme.id === themeId);

      if (theme) {
        if (!theme.levels[1]) {
          theme.levels[1] = [];
        }
        theme.levels[1].push(card);
      }
    },
    updateCard(themeId: number, updatedCard: Card) {
      const theme = this.themes.find(theme => theme.id === themeId);
      if (theme) {
        const currentLevel = theme.levels[updatedCard.level] || [];
        const cardIndex = currentLevel.findIndex(card => card.id === updatedCard.id);

        if (cardIndex !== -1) {
          currentLevel[cardIndex] = updatedCard;
        } else {
          currentLevel.push(updatedCard);
        }
        theme.levels[updatedCard.level] = currentLevel;
      }
    }
  }
});