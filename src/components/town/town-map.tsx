import { useTownStore } from '@/store/townStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export function TownMap() {
  const { 
    stats, 
    buildings, 
    completeHabit, 
    getUnlockedAreas, 
    getSpecialBuildings 
  } = useTownStore()

  const unlockedAreas = getUnlockedAreas()
  const specialBuildings = getSpecialBuildings()

  const experienceToNextLevel = 100 - (stats.experience % 100)

  return (
    <div className="space-y-6">
      {/* 町の統計 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">レベル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.level}</div>
            <Progress value={(stats.experience % 100)} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              次のレベルまで {experienceToNextLevel} XP
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">人口</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.population}</div>
            <p className="text-xs text-muted-foreground">住民</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">幸福度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.happiness}%</div>
            <Progress value={stats.happiness} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">コイン</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coins}</div>
            <p className="text-xs text-muted-foreground">所持金</p>
          </CardContent>
        </Card>
      </div>

      {/* 建物一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>建物</CardTitle>
          <CardDescription>習慣を完了して建物をアンロックしましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildings.map((building) => (
              <Card key={building.id} className={building.unlocked ? 'ring-2 ring-green-500' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{building.icon} {building.name}</CardTitle>
                    {building.unlocked && <Badge variant="secondary">アンロック済み</Badge>}
                  </div>
                  <CardDescription>{building.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>レベル:</span>
                      <span>{building.level}/{building.maxLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>コスト:</span>
                      <span>{building.cost} コイン</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>幸福度ボーナス:</span>
                      <span>+{building.happinessBonus}</span>
                    </div>
                    {building.unlocked && (
                      <Button 
                        className="w-full" 
                        onClick={() => completeHabit('test', 1)}
                      >
                        習慣を完了して経験値を獲得
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* エリア一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>エリア</CardTitle>
          <CardDescription>レベルアップして新しいエリアを解放しましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAreas.map((area) => (
              <Card key={area.id} className="ring-2 ring-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{area.icon} {area.name}</CardTitle>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>必要レベル:</span>
                      <span>{area.requiredLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>建物数:</span>
                      <span>{area.buildings.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 特別建物 */}
      {specialBuildings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>特別建物</CardTitle>
            <CardDescription>連続達成で解放される特別な建物</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialBuildings.map((building) => (
                <Card key={building.id} className="ring-2 ring-yellow-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{building.icon} {building.name}</CardTitle>
                    <CardDescription>{building.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>必要ストリーク:</span>
                        <span>{building.requiredStreak}日</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>幸福度ボーナス:</span>
                        <span>+{building.happinessBonus}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
