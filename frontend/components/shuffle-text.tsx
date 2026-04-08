'use client'

import { useEffect, useRef, useState } from 'react'

interface ShuffleTextProps {
  text: string
  speed?: number
  style?: React.CSSProperties
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%@X?!'

export function ShuffleText({ text, speed = 40, style }: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isShuffling, setIsShuffling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const shuffle = async () => {
    if (isShuffling) return
    setIsShuffling(true)

    const originalText = text
    const length = originalText.length
    let iteration = 0

    const maxIterations = Math.ceil(length / 2)

    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        let shuffledText = ''

        for (let i = 0; i < length; i++) {
          if (i < iteration) {
            shuffledText += originalText[i]
          } else {
            shuffledText += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          }
        }

        return shuffledText
      })

      iteration++

      if (iteration > maxIterations) {
        clearInterval(interval)
        setDisplayText(originalText)
        setIsShuffling(false)
      }
    }, speed)
  }

  useEffect(() => {
    // Auto-trigger on mount
    const timer = setTimeout(() => {
      shuffle()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleHover = () => {
    shuffle()
  }

  return (
    <div
      ref={containerRef}
      style={style}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
    >
      {displayText}
    </div>
  )
}
