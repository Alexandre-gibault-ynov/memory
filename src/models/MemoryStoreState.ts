import type { Theme } from "./Theme";
import type { Card } from '@/models/Card'

export interface MemoryStoreState {
  themes: Theme[];
  cardsToReview: Card[];
  isReviewSessionActive: boolean;
}