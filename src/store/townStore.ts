import { create } from 'zustand'
import { TownStats, Building, Area, Resident, TownEvent, SpecialBuilding } from '@/types/town'

interface TownState {
  stats: TownStats
  buildings: Building[]
  areas: Area[]
  residents: Resident[]
  events: TownEvent[]
  specialBuildings: SpecialBuilding[]
  
  // Actions
  completeHabit: (habitId: string, streak: number) => void
  unlockBuilding: (buildingId: string) => void
  upgradeBuilding: (buildingId: string) => void
  unlockArea: (areaId: string) => void
  addResident: (residentId: string) => void
  triggerEvent: (eventId: string) => void
  getUnlockedAreas: () => Area[]
  getSpecialBuildings: () => SpecialBuilding[]
  checkBuildingUnlocks: () => void
  checkAreaUnlocks: () => void
  checkSpecialBuildingUnlocks: () => void
}

const initialBuildings: Building[] = [
  {
    id: 'house',
    name: '家',
    description: '基本的な住居',
    cost: 100,
    unlocked: true,
    level: 1,
    maxLevel: 5,
    experienceReward: 10,
    happinessBonus: 5,
    populationBonus: 2,
    icon: '🏠',
    type: '住宅'
  },
  {
    id: 'shop',
    name: '商店',
    description: '商品を売買する店',
    cost: 200,
    unlocked: false,
    level: 1,
    maxLevel: 3,
    experienceReward: 15,
    happinessBonus: 10,
    populationBonus: 1,
    icon: '🏪',
    type: '商業'
  },
  {
    id: 'park',
    name: '公園',
    description: '住民の憩いの場',
    cost: 300,
    unlocked: false,
    level: 1,
    maxLevel: 3,
    experienceReward: 20,
    happinessBonus: 15,
    populationBonus: 0,
    icon: '🌳',
    type: '公共'
  }
]

const initialAreas: Area[] = [
  {
    id: 'residential',
    name: '住宅街',
    description: '住民が住むエリア',
    unlocked: true,
    requiredLevel: 1,
    buildings: ['house'],
    icon: '🏘️'
  },
  {
    id: 'commercial',
    name: '商業地区',
    description: 'お店やビジネスが集まるエリア',
    unlocked: false,
    requiredLevel: 3,
    buildings: ['shop'],
    icon: '🏢'
  },
  {
    id: 'recreation',
    name: 'レクリエーション地区',
    description: '公園や娯楽施設があるエリア',
    unlocked: false,
    requiredLevel: 5,
    buildings: ['park'],
    icon: '🎡'
  }
]

const initialResidents: Resident[] = [
  {
    id: 'citizen1',
    name: '田中さん',
    type: 'citizen',
    happiness: 80,
    contribution: 10,
    unlocked: true,
    icon: '👤',
    role: '住民',
    level: 1,
    specialty: '農業'
  },
  {
    id: 'merchant1',
    name: '商店主',
    type: 'merchant',
    happiness: 70,
    contribution: 15,
    unlocked: false,
    icon: '👨‍💼',
    role: '商人',
    level: 2,
    specialty: '貿易'
  }
]

const initialEvents: TownEvent[] = [
  {
    id: 'festival',
    title: 'お祭り',
    description: '町でお祭りが開催されました！',
    type: 'positive',
    effects: { happiness: 20, experience: 50 },
    duration: 3,
    active: false,
    icon: '🎉',
    date: new Date().toISOString()
  }
]

const initialSpecialBuildings: SpecialBuilding[] = [
  {
    id: 'golden_statue',
    name: '黄金の像',
    description: '連続達成の証',
    requiredStreak: 30,
    unlocked: false,
    level: 1,
    experienceReward: 100,
    happinessBonus: 50,
    populationBonus: 10,
    icon: '🏆'
  }
]

export const useTownStore = create<TownState>((set, get) => ({
  stats: {
    level: 1,
    experience: 0,
    population: 10,
    happiness: 50,
    coins: 100
  },
  buildings: initialBuildings,
  areas: initialAreas,
  residents: initialResidents,
  events: initialEvents,
  specialBuildings: initialSpecialBuildings,

  completeHabit: (_habitId: string, streak: number) => {
    set((state) => {
      const experienceGain = 10 + (streak * 2)
      const newExperience = state.stats.experience + experienceGain
      const newLevel = Math.floor(newExperience / 100) + 1
      const levelUp = newLevel > state.stats.level
      
      // レベルアップ時のボーナス
      const coinsGain = levelUp ? 50 : 10
      const happinessGain = levelUp ? 20 : 5
      
      return {
        stats: {
          ...state.stats,
          experience: newExperience,
          level: newLevel,
          coins: state.stats.coins + coinsGain,
          happiness: Math.min(100, state.stats.happiness + happinessGain)
        }
      }
    })
    
    // 建物のアンロック条件をチェック
    get().checkBuildingUnlocks()
    // エリアのアンロック条件をチェック
    get().checkAreaUnlocks()
    // 特別建物のアンロック条件をチェック
    get().checkSpecialBuildingUnlocks()
  },

  unlockBuilding: (buildingId: string) => {
    set((state) => ({
      buildings: state.buildings.map(building =>
        building.id === buildingId
          ? { ...building, unlocked: true }
          : building
      )
    }))
  },

  upgradeBuilding: (buildingId: string) => {
    set((state) => ({
      buildings: state.buildings.map(building =>
        building.id === buildingId && building.level < building.maxLevel
          ? { ...building, level: building.level + 1 }
          : building
      )
    }))
  },

  unlockArea: (areaId: string) => {
    set((state) => ({
      areas: state.areas.map(area =>
        area.id === areaId
          ? { ...area, unlocked: true }
          : area
      )
    }))
  },

  addResident: (residentId: string) => {
    set((state) => ({
      residents: state.residents.map(resident =>
        resident.id === residentId
          ? { ...resident, unlocked: true }
          : resident
      )
    }))
  },

  triggerEvent: (eventId: string) => {
    set((state) => ({
      events: state.events.map(event =>
        event.id === eventId
          ? { ...event, active: true }
          : event
      )
    }))
  },

  getUnlockedAreas: () => {
    return get().areas.filter(area => area.unlocked)
  },

  getSpecialBuildings: () => {
    return get().specialBuildings.filter(building => building.unlocked)
  },

  checkBuildingUnlocks: () => {
    const { stats, buildings } = get()
    buildings.forEach(building => {
      if (!building.unlocked && stats.level >= building.cost / 100) {
        get().unlockBuilding(building.id)
      }
    })
  },

  checkAreaUnlocks: () => {
    const { stats, areas } = get()
    areas.forEach(area => {
      if (!area.unlocked && stats.level >= area.requiredLevel) {
        get().unlockArea(area.id)
      }
    })
  },

  checkSpecialBuildingUnlocks: () => {
    const { specialBuildings } = get()
    // ストリーク数に基づいて特別建物をアンロック
    // 実際の実装では、習慣のストリーク情報を取得する必要があります
    specialBuildings.forEach(building => {
      if (!building.unlocked) {
        // ストリーク条件を満たしているかチェック
        // ここでは仮の実装
        get().unlockBuilding(building.id)
      }
    })
  }
}))
