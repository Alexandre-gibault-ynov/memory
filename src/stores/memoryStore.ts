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
    moveCardToNextLevel(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) return;
      const themeLevelsNumber = Object.keys(theme.levels).length
      const currentLevel = card.level;

      card.level++;
      if (card.level < themeLevelsNumber) {
        this.updateNextReviewDate(card);
        //Update theme levels
        theme.levels[currentLevel] = theme.levels[currentLevel].filter(c => c.id !== card.id);
        theme.levels[card.level].push(card);
      } else {
        this.removeCard(card);
      }
    },
    updateNextReviewDate(card: Card) {
      const today = new Date();
      const daysToAdd = Math.pow(2, card.level - 1);
      card.nextReviewDate.setDate(today.getDate() + daysToAdd);
    },
    updateThemeLevels(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) return;
      const previousLevel = card.level - 1;
      theme.levels[previousLevel] = theme.levels[previousLevel].filter(c => c.id !== card.id);
      theme.levels[card.level].push(card);
    },
    resetCardToFirstLevel(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) return;
      const currentLevel = card.level;

      card.level = 1;
      this.updateNextReviewDate(card);
      theme.levels[currentLevel] = theme.levels[currentLevel].filter(c => c.id !== card.id);
      theme.levels[1].push(card);
    },
    removeCard(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) {
        return;
      }

      for (const level in theme.levels) {
        theme.levels[level] = theme.levels[level].filter(c => c.id !== card.id);
      }
    }
  }
});