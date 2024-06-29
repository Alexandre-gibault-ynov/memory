import { defineStore } from 'pinia'
import type { MemoryStoreState } from '@/models/MemoryStoreState'
import type { Theme } from '@/models/Theme'
import type { Card } from '@/models/Card'
import type { Level } from '@/models/Level'

export const useMemoryStore = defineStore('memoryStore', {
  state: (): MemoryStoreState => ({
    themes: JSON.parse(localStorage.getItem('themes') || '[]') as Theme[],
    cardsToReview: [] as Card[],
    isReviewSessionActive: false,
  }),
  actions: {
    initializeReviewSession(theme: Theme) {
      const now = new Date();
      this.cardsToReview = theme.levels
        .flatMap(level => level.cards)
        .filter(card => card.nextReviewDate <= now);
      this.isReviewSessionActive = true;
    },
    markCardAsReviewed(cardId: number) {
      this.cardsToReview = this.cardsToReview.filter(c => c.id !== cardId);
      if (this.cardsToReview.length === 0) {
        this.isReviewSessionActive = false;
      }
    },
    addTheme(theme: Theme) {
      this.themes.push(theme);
      localStorage.setItem('themes', JSON.stringify(this.themes));
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
      const themeLevelsCount = theme.levels.length;
      const currentLevel = card.level;

      card.level++;
      if (card.level < themeLevelsCount) {
        this.setCardNextReviewDate(card, theme);
        //Update theme levels
        theme.levels[currentLevel].cards = theme.levels[currentLevel].cards.filter(c => c.id !== card.id);
        theme.levels[card.level].cards.push(card);
      } else {
        this.removeCard(card);
      }
      localStorage.setItem('themes', JSON.stringify(this.themes));
    },
    resetCardToFirstLevel(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) return;
      const currentLevel = card.level;

      card.level = 1;
      this.setCardNextReviewDate(card, theme);
      theme.levels[currentLevel].cards = theme.levels[currentLevel].cards.filter(c => c.id !== card.id);
      theme.levels[1].cards.push(card);
      
      localStorage.setItem('themes', JSON.stringify(this.themes));
    },
    initializeNewThemeLevels(theme: Theme, levelCount: number) {
      const today = new Date();
      for (let i = 0; i <= levelCount; i++) {
        const daysToAdd = i > 1 ? (24 * 60 * 60 * 1000) * Math.pow(2, i - 1) : 0;
        theme.levels[i] = {
          id: i,
          nextReviewDate: new Date(today.getTime() + daysToAdd),
          cards: [],
        }
      }
    },
    initializeNewThemeWithNewCards(theme: Theme, cards: { question: string, answer: string }[]){
      let cardId = 1;
      const initializedCards: Card[] = [];
      cards.forEach(card => {
        const cardLevel = initializedCards.length < theme.cardsToAdd ? 1 : 0
        const newCard = {
          id: cardId++,
          question: card.question,
          answer: card.answer,
          level: cardLevel,
          nextReviewDate: new Date(theme.levels[cardLevel].nextReviewDate.getTime()),
          themeId: theme.id,
        }
        initializedCards.push(newCard);
      });
      theme.levels[1].cards = initializedCards.splice(0, theme.cardsToAdd);
      theme.levels[0].cards = initializedCards;
    },
    setLevelNextReviewDate(level: Level) {
      const today = new Date();
      const daysToAdd = level.id > 1 ? (24 * 60 * 60 * 1000) * Math.pow(2, level.id - 1) : 0;
      level.nextReviewDate.setTime(today.getTime() + daysToAdd);
    },
    setCardNextReviewDate(card: Card, theme: Theme) {
      card.nextReviewDate.setTime(theme.levels[card.level].nextReviewDate.getTime());
    },
    removeCard(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) {
        return;
      }

      for (const level in theme.levels) {
        theme.levels[level].cards = theme.levels[level].cards.filter(c => c.id !== card.id);
      }
    },
  }
});