<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrame: number
let particles: Particle[] = []
const particleCount = 60
const connectionDistance = 150
const mouse = { x: 0, y: 0, active: false }

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number

  constructor(w: number, h: number) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.size = Math.random() * 2 + 1
  }

  update(w: number, h: number) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > w) this.vx *= -1
    if (this.y < 0 || this.y > h) this.vy *= -1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(59, 130, 246, 0.5)' // blue-500
    ctx.fill()
  }
}

const init = () => {
  if (!canvasRef.value) return
  const w = canvasRef.value.width = window.innerWidth
  const h = canvasRef.value.height = window.innerHeight
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(w, h))
  }
}

const animate = () => {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height
  ctx.clearRect(0, 0, w, h)

  particles.forEach(p => {
    p.update(w, h)
    p.draw(ctx!)

    // Draw lines between particles
    particles.forEach(p2 => {
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < connectionDistance) {
        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - dist / connectionDistance)})`
        ctx!.lineWidth = 1
        ctx!.moveTo(p.x, p.y)
        ctx!.lineTo(p2.x, p2.y)
        ctx!.stroke()
      }
    })

    // Draw lines to mouse
    if (mouse.active) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < connectionDistance * 1.5) {
        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(59, 130, 246, ${0.4 * (1 - dist / (connectionDistance * 1.5))})`
        ctx!.lineWidth = 1
        ctx!.moveTo(p.x, p.y)
        ctx!.lineTo(mouse.x, mouse.y)
        ctx!.stroke()
      }
    }
  })

  animationFrame = requestAnimationFrame(animate)
}

const handleResize = () => {
  init()
}

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  mouse.active = true
}

const handleMouseLeave = () => {
  mouse.active = false
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    init()
    animate()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-0"
  />
</template>
