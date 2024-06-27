import type { Card } from '@/models/Card'

/**
 * Interface that represent a level for the spaced repetition memory
 */
export interface Level {
  /**
   * The cards contained by the level
   */
  cards: Card[];

  /**
   * The next revision date
   */
  nextReviewDate: Date;
}