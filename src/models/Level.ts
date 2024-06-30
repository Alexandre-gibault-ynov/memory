import type { Card } from '@/models/Card'

/**
 * Interface that represent a level for the spaced repetition memory
 */
export interface Level {
  /**
   * The index of the level contained in the theme
   */
  id: number;

  /**
   * The cards contained by the level
   */
  cards: Card[];

  /**
   * The next revision date
   */
  nextReviewDate: Date;
}