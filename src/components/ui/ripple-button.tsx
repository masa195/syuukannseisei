import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RippleButtonProps extends ButtonProps {
  rippleColor?: string
}

export function RippleButton({ 
  children, 
  className, 
  rippleColor = 'rgba(255, 255, 255, 0.3)',
  onClick,
  ...props 
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
  }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    }

    setRipples(prev => [...prev, newRipple])

    // アニメーション完了後にリップルを削除
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    onClick?.(e)
  }

  return (
    <Button
      ref={buttonRef}
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </Button>
  )
}











