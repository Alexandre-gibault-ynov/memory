export interface Card {
  id: number;
  question: string;
  answer: string;
  level: number;
  nextReviewDate: Date;
  themeId: number;
}