import type { Level } from '@/models/Level'

export interface Theme {
  id: number,
  name: string,
  levels: Level[]
}