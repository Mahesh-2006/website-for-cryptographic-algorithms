import { type ReactNode, type CSSProperties } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  hover?: boolean
}

export function GlassPanel({ children, className = '', style, onClick, hover = false }: GlassPanelProps) {
  return (
    <div
      className={`glass-panel ${hover ? 'glass-panel--hover' : ''} ${className}`}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: `blur(var(--glass-blur))`,
        WebkitBackdropFilter: `blur(var(--glass-blur))`,
        boxShadow: 'var(--glass-shadow), var(--glass-inset)',
        borderRadius: 'var(--radius-lg)',
        border: 'none',
        cursor: onClick ? 'pointer' : undefined,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
