import { useMemo } from 'react'
export default function Petals({ burst = false }) {
  const petals = useMemo(() => Array.from({ length: burst ? 34 : 18 }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${(i % 9) * (burst ? 0.035 : 0.8)}s`,
    duration: `${burst ? 3 + (i % 5) * .35 : 12 + (i % 8) * 1.8}s`,
    size: `${7 + (i % 5) * 2}px`,
    drift: `${((i * 19) % 110) - 55}px`,
    rotate: `${(i * 47) % 240}deg`
  })), [burst])
  return <div className={`petal-field ${burst ? 'petal-burst' : ''}`} aria-hidden="true">
    {petals.map((p, i) => <i key={i} style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: `${Number.parseInt(p.size) * 1.55}px`, '--drift': p.drift, '--turn': p.rotate }} />)}
  </div>
}
