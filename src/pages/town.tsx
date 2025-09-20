import { TownMap } from '@/components/town/town-map'

export default function Town() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">町育成</h1>
        <p className="text-muted-foreground">
          習慣を完了して町を発展させましょう！
        </p>
      </div>
      
      <TownMap />
    </div>
  )
}
