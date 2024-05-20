import type { Card } from '@/models/Card'

export interface Level {
  id: number,
  cards: Card[],
  nextReviewDate: Date
}