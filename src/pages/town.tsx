import { useState } from 'react'
import { TownMap } from '@/components/town/town-map'
import { useTownStore } from '@/store/townStore'
import { useHabitStore } from '@/store/habitStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  MapPin, 
  Building, 
  Users, 
  Star, 
  Zap, 
  Trophy,
  Target,
  BarChart3
} from 'lucide-react'

export default function Town() {
  const { stats, buildings, residents, events, specialBuildings } = useTownStore()
  const { habits } = useHabitStore()
  const [selectedTab, setSelectedTab] = useState<'overview' | 'buildings' | 'residents' | 'events'>('overview')

  const totalHabits = habits.length
  const completedToday = habits.filter(habit => 
    habit.completions.some(completion => 
      new Date(completion).toDateString() === new Date().toDateString()
    )
  ).length

  const tabs = [
    { id: 'overview', name: '概要', icon: BarChart3 },
    { id: 'buildings', name: '建物', icon: Building },
    { id: 'residents', name: '住民', icon: Users },
    { id: 'events', name: 'イベント', icon: Star }
  ]

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MapPin className="h-8 w-8" />
              あなたの町
            </h1>
            <p className="text-green-100 mt-2">
              習慣を完了して町を発展させましょう！
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{stats.level}</div>
            <div className="text-sm text-green-100">レベル</div>
          </div>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総人口</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.population}</div>
            <p className="text-xs text-muted-foreground">
              +{residents.length} 住民
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">建物数</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buildings.length}</div>
            <p className="text-xs text-muted-foreground">
              {specialBuildings.length} 特別建物
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日の完了</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}/{totalHabits}</div>
            <p className="text-xs text-muted-foreground">
              習慣完了率
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">経験値</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.experience}</div>
            <p className="text-xs text-muted-foreground">
              次のレベルまで {100 - (stats.experience % 100)} XP
            </p>
          </CardContent>
        </Card>
      </div>

      {/* タブナビゲーション */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={selectedTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedTab(tab.id as any)}
            className="flex-1"
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.name}
          </Button>
        ))}
      </div>

      {/* タブコンテンツ */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                進捗状況
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>レベル進捗</span>
                  <span>{stats.experience % 100}/100</span>
                </div>
                <Progress value={(stats.experience % 100)} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>町の繁栄度</span>
                  <span>{Math.min(100, (stats.population + buildings.length * 10))}%</span>
                </div>
                <Progress value={Math.min(100, (stats.population + buildings.length * 10))} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                最近のイベント
              </CardTitle>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-2">
                  {events.slice(0, 3).map((event, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{event.description}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">まだイベントがありません</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'buildings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((building, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {building.name}
                </CardTitle>
                <CardDescription>{building.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">レベル {building.level}</Badge>
                  <Badge variant="outline">{building.type}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === 'residents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {residents.map((resident, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {resident.name}
                </CardTitle>
                <CardDescription>{resident.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">レベル {resident.level}</Badge>
                  <Badge variant="outline">{resident.specialty}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === 'events' && (
        <div className="space-y-4">
          {events.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  {event.title}
                </CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{event.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 町のマップ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            町のマップ
          </CardTitle>
          <CardDescription>
            あなたの町の現在の様子を見てみましょう
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TownMap />
        </CardContent>
      </Card>
    </div>
  )
}