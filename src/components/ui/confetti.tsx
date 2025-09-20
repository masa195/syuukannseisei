import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ConfettiProps {
  isActive: boolean
  onComplete?: () => void
}

export function Confetti({ isActive, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    size: number
    rotation: number
  }>>([])

  useEffect(() => {
    if (isActive) {
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360
      }))
      
      setParticles(newParticles)
      
      const timer = setTimeout(() => {
        setParticles([])
        onComplete?.()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          initial={{ 
            y: particle.y,
            x: particle.x,
            rotate: particle.rotation,
            scale: 0
          }}
          animate={{ 
            y: window.innerHeight + 100,
            x: particle.x + (Math.random() - 0.5) * 200,
            rotate: particle.rotation + 720,
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            ease: 'easeOut',
            times: [0, 0.1, 0.9, 1]
          }}
        />
      ))}
    </div>
  )
}











