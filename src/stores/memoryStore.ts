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
    initializeNewTheme(formValues: { themeName: string, levelCount: number, cardsToAdd: number, cards: { question: string, answer: string }[] }) {
      // New theme Initialization
      const themeId = this.themes.length + 1;
      const newTheme: Theme = {
        id: themeId,
        name: formValues.themeName,
        cardsToAdd: formValues.cardsToAdd,
        levels: [],
      }
      this.initializeNewThemeLevels(newTheme, formValues.levelCount);
      this.initializeNewThemeWithNewCards(newTheme, formValues.cards);
      this.addTheme(newTheme);
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
    resetCardToFirstLevel(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) return;
      const currentLevel = card.level;

      card.level = 1;
      this.updateNextReviewDate(card);
      theme.levels[currentLevel] = theme.levels[currentLevel].filter(c => c.id !== card.id);
      theme.levels[1].push(card);
    },
    initializeNewThemeLevels(theme: Theme, levelCount: number) {
      for (let i = 0; i <= levelCount; i++) {
        theme.levels[i] = [];
      }
    },
    initializeNewThemeWithNewCards(theme: Theme, cards: { question: string, answer: string }[]){
      let cardId = 1;
      const initializedCards: Card[] = [];
      cards.forEach(card => {
        const newCard = {
          id: cardId++,
          question: card.question,
          answer: card.answer,
          level: initializedCards.length < theme.cardsToAdd ? 1 : 0,
          nextReviewDate: new Date(),
          themeId: theme.id,
        }
        initializedCards.push(newCard);
      });
      theme.levels[1] = initializedCards.splice(0, theme.cardsToAdd);
      theme.levels[0] = initializedCards;
    },
    updateNextReviewDate(card: Card) {
      const today = new Date();
      const daysToAdd = Math.pow(2, card.level - 1);
      card.nextReviewDate.setDate(today.getDate() + daysToAdd);
    },
    removeCard(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) {
        return;
      }

      for (const level in theme.levels) {
        theme.levels[level] = theme.levels[level].filter(c => c.id !== card.id);
      }
    },
  }
});