import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

interface FloatingActionButtonProps {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export function FloatingActionButton({
  onClick,
  children,
  className,
  size = 'md',
  position = 'bottom-right'
}: FloatingActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-14 w-14',
    lg: 'h-16 w-16'
  }

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }

  return (
    <motion.div
      className={cn(
        'fixed z-40',
        positionClasses[position]
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={cn(
          'relative rounded-full shadow-lg',
          sizeClasses[size]
        )}
        animate={{
          scale: isPressed ? 0.95 : 1,
          boxShadow: isPressed 
            ? '0 4px 8px rgba(0, 0, 0, 0.2)' 
            : '0 8px 16px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.1 }}
      >
        <Button
          className={cn(
            'h-full w-full rounded-full p-0 shadow-lg',
            'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70',
            className
          )}
          onClick={onClick}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
        >
          <motion.div
            className="flex items-center justify-center"
            animate={{ rotate: isPressed ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {children || <Plus className="h-6 w-6" />}
          </motion.div>
        </Button>
        
        {/* パルス効果 */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </motion.div>
  )
}


