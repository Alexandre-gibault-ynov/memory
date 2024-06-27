import type {Card} from '@/models/Card'

export interface Theme {

  /**
   * The theme id
   */
  id: number;

  /**
   * The theme name
   */
  name: string;

  /**
   * The number of cards to add to the level one at the end of the revision session
   */
  cardsToAdd: number

  /**
   * Levels of the theme
   */
  levels: { [key: number]: Card[] };
}