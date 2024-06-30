import { faker } from '@faker-js/faker';
import type { Theme } from '@/models/Theme'
import type { Card } from '@/models/Card'
import type { Level } from '@/models/Level'

const generateTestCard = (id: number, themeId: number, level: number): Card => {
  const now = new Date();
  const daysToAdd = level > 1 ? (24 * 60 * 60 * 1000) * Math.pow(2, level - 1) : 0;
  return {
    id,
    question: faker.lorem.sentence(),
    answer: faker.lorem.paragraph(),
    level,
    nextReviewDate: new Date(now.getTime() + daysToAdd),
    themeId,
  };
};

const generateTestLevel = (levelNumber: number, cardCount: number, themeId: number): Level => {
  const cards = [];
  const now = new Date();
  const daysToAdd = levelNumber > 1 ? (24 * 60 * 60 * 1000) * Math.pow(2, levelNumber - 1) : 0;
  for (let i = 0; i < cardCount; i++) {
    cards.push(generateTestCard(i + 1, themeId, levelNumber));
  }
  return {
    id: levelNumber,
    nextReviewDate: new Date(now.getTime() + daysToAdd),
    cards,
  };
};

const generateTestTheme = (id: number): Theme => {
  const levelCount = faker.number.int({ min: 1, max: 5 });
  const cardsToAdd = faker.number.int({ min: 1, max: 5 });
  const levels = [];
  for (let i = 0; i <= levelCount; i++) {
    const cardCount = faker.number.int({ min: 5, max: 20 });
    levels.push(generateTestLevel(i, cardCount, id));
  }
  return {
    id,
    name: faker.commerce.productName(),
    cardsToAdd,
    levels,
  };
};

const generateTestData = (themeCount: number): Theme[] => {
  const themes = [];
  for (let i = 0; i < themeCount; i++) {
    themes.push(generateTestTheme(i + 1));
  }
  return themes;
};

// Generate 10 themes as test data
export const testData = generateTestData(10);
// localStorage.setItem(testData, JSON.stringify(testData, null, 2));