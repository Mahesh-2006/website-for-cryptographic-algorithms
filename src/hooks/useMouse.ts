import { useState, useEffect, useCallback } from 'react'

export function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  return mouse
}
