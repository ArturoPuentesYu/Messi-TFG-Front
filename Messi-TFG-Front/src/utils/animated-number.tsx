import React, { useEffect, useRef, useState } from 'react'
import { AnimatedNumberProps } from '../types/data.type'

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  finalNumber,
  duration
}) => {
  const [displayNumber, setDisplayNumber] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const target = ref.current

    const animateCounter = () => {
      const startTime = performance.now()

      const step = (timestamp: number) => {
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentNumber = Math.floor(progress * finalNumber)

        setDisplayNumber(currentNumber)

        if (currentNumber < finalNumber) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter()
            observer.current?.disconnect() // Stop observing after animation starts
          }
        })
      },
      {
        threshold: 0.5 // Trigger when 50% of the target is visible
      }
    )

    if (target) {
      observer.current.observe(target)
    }

    return () => {
      observer.current?.disconnect()
    }
  }, [finalNumber, duration])

  return (
    <div ref={ref} style={{ fontSize: '48px' }}>
      {displayNumber}
    </div>
  )
}

export default AnimatedNumber
