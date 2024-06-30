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
    /**
     * Converts the nextReviewDate strings returned by the localStorage into dates object
     *
     * @param theme the theme to initialize
     */
    initializeThemeFromStorage(theme: Theme){
        theme.levels.forEach(level => {
          level.nextReviewDate = new Date(level.nextReviewDate);
          level.cards.forEach(card => {
            card.nextReviewDate = new Date(card.nextReviewDate);
          });
        });
    },

    /**
     * Initialize the review session for a theme
     *
     * @param theme The theme to initialize the review session
     */
    initializeReviewSession(theme: Theme) {
      const now = new Date();
      this.cardsToReview = theme.levels
        .flatMap(level => level.cards)
        .filter(card => card.nextReviewDate <= now);
      this.isReviewSessionActive = true;
    },

    /**
     * Mark a card as reviewed by deleting it from the session.
     * Update the next review date for the current level of the theme if the session is over.
     * A review session is over when all the cards of the session were reviewed.
     *
     * @param card The card to delete from the session
     * @param theme Theme containing the card and the current level
     * @param currentLevelId the id of the current level to update the next review date
     */
    markCardAsReviewed(card: Card, theme: Theme, currentLevelId: number) {
      this.cardsToReview = this.cardsToReview.filter(c => c.id !== card.id);
      this.updateLevelNextReviewDate(theme, currentLevelId)
      if (this.cardsToReview.length === 0) {
        this.isReviewSessionActive = false;
      }
    },

    /**
     * Update the next review date of a reviewed level.
     * A level is considered as reviewed when it is empty.
     *
     * @param theme The theme Containing the level
     * @param levelId The id of the level to update
     */
    updateLevelNextReviewDate(theme: Theme, levelId: number) {
      const level = theme.levels[levelId];
      if (this.isLevelCardsEmpty(level)) {
        this.setLevelNextReviewDate(level);
      }
    },

    /**
     * Return true if the level is empty, else false
     *
     * @param level The level to check
     */
    isLevelCardsEmpty(level: Level) {
      return level.cards.length === 0;
    },

    /**
     * Add a theme to store and stores it to the local storage
     *
     * @param theme the theme to add
     */
    addTheme(theme: Theme) {
      this.themes.push(theme);
      localStorage.setItem('themes', JSON.stringify(this.themes));
    },

    /**
     * Initialize a new theme with the values of the add theme form and
     * add it to the list of themes of the store
     *
     * @param formValues The values of the add theme form
     */
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

    /**
     * Move a card to next level of its theme
     *
     * @param card the card to move to the next theme
     */
    moveCardToNextLevel(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) {
        return;
      }
      const themeLevelsCount = theme.levels.length;
      const currentLevelIndex = card.level;

      card.level++;
      if (card.level < themeLevelsCount) {
        this.setCardNextReviewDate(card, theme);
        //Update theme levels
        theme.levels[currentLevelIndex].cards = theme.levels[currentLevelIndex].cards.filter(c => c.id !== card.id);
        theme.levels[card.level].cards.push(card);
      } else {
        this.removeCardFromSystem(card);
      }
      this.markCardAsReviewed(card, theme, currentLevelIndex);
      localStorage.setItem('themes', JSON.stringify(this.themes));
    },

    /**
     * Reset the card to the first level of its theme.
     *
     * @param card The card to reset
     */
    resetCardToFirstLevel(card: Card) {
      const theme = this.themes.find(t => t.id === card.themeId);
      if (!theme) return;
      const currentLevelIndex = card.level;

      card.level = 1;
      this.setCardNextReviewDate(card, theme);
      theme.levels[currentLevelIndex].cards = theme.levels[currentLevelIndex].cards.filter(c => c.id !== card.id);
      theme.levels[1].cards.push(card);

      this.markCardAsReviewed(card, theme, currentLevelIndex);
      localStorage.setItem('themes', JSON.stringify(this.themes));
    },

    /**
     * Initialize the levels of a new theme
     *
     * @param theme The theme containing the levels to initialize
     * @param levelCount The number of levels to initialize
     */
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

    /**
     * Initialize cards for a new theme
     *
     * @param theme The theme to initialize
     * @param cards the new cards to add to the theme
     */
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

    /**
     * Set the next review date of a level
     *
     * @param level The level to set the new date
     */
    setLevelNextReviewDate(level: Level) {
      const today = new Date();
      const daysToAdd = level.id > 1 ? (24 * 60 * 60 * 1000) * Math.pow(2, level.id - 1) : 0;
      level.nextReviewDate.setTime(today.getTime() + daysToAdd);
    },

    /**
     * Set the next review date of a card with the level next review date
     *
     * @param card The card to set the new review date
     * @param theme The theme containing the card
     */
    setCardNextReviewDate(card: Card, theme: Theme) {
      card.nextReviewDate.setTime(theme.levels[card.level].nextReviewDate.getTime());
    },

    /**
     * Remove a card from the system
     *
     * @param card the card to remove
     */
    removeCardFromSystem(card: Card) {
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