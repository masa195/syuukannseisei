export interface TownStats {
  level: number
  experience: number
  population: number
  happiness: number
  coins: number
}

export interface Building {
  id: string
  name: string
  description: string
  cost: number
  unlocked: boolean
  level: number
  maxLevel: number
  experienceReward: number
  happinessBonus: number
  populationBonus: number
  icon: string
}

export interface Area {
  id: string
  name: string
  description: string
  unlocked: boolean
  requiredLevel: number
  buildings: string[]
  icon: string
}

export interface Resident {
  id: string
  name: string
  type: 'citizen' | 'merchant' | 'artist' | 'scientist'
  happiness: number
  contribution: number
  unlocked: boolean
  icon: string
}

export interface TownEvent {
  id: string
  title: string
  description: string
  type: 'positive' | 'negative' | 'neutral'
  effects: {
    experience?: number
    happiness?: number
    coins?: number
    population?: number
  }
  duration: number
  active: boolean
  icon: string
}

export interface SpecialBuilding {
  id: string
  name: string
  description: string
  requiredStreak: number
  unlocked: boolean
  level: number
  experienceReward: number
  happinessBonus: number
  populationBonus: number
  icon: string
}
