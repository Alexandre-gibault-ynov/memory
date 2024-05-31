import type {Card} from '@/models/Card'

export interface Theme {
  id: number;
  name: string;
  levels: { [key: number]: Card[] };
}