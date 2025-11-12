<template>
  <div class="goal-card" :style="{ background: backgroundColor, color: textColor }">
    <div class="ring-wrap">
      <svg
        :width="size"
        :height="size"
        :viewBox="`0 0 ${size} ${size}`"
        role="img"
        :aria-label="`Progreso: ${percentLabel}`"
      >
        <defs>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
          </filter>
        </defs>

        <!-- Track (fondo) -->
        <g :transform="`rotate(-90 ${center} ${center})`" filter="url(#soft-shadow)">
          <circle
            :cx="center" :cy="center" :r="radius"
            :stroke="trackColor" :stroke-width="stroke" fill="none"
            stroke-linecap="round" :style="{ opacity: 0.9 }"
          />
          <!-- Progreso -->
          <circle
            :cx="center" :cy="center" :r="radius"
            :stroke="progressColor" :stroke-width="stroke" fill="none"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashoffset"
            class="progress-anim"
          />
          <!-- “botón” al final del trazo, similar al mock -->
          <circle
            :cx="endCap.x" :cy="endCap.y" :r="stroke/2"
            :fill="progressColor"
          />
        </g>
      </svg>

      <!-- % al centro -->
      <div class="percent">{{ percentLabel }}</div>
    </div>

    <div class="info">
      <div class="flex flex-col">
        <span class="label">{{ goalLabel }}</span>
        <span class="value">{{ dailyGoal }}</span>
      </div>
      <div class="flex flex-col">
        <span class="label">{{ currentLabel }}</span>
        <span class="value">{{ current }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  dailyGoal: number
  current: number
  size?: number       // tamaño del SVG (px)
  stroke?: number     // grosor del anillo
  trackColor?: string // color del track
  progressColor?: string // color del progreso
  backgroundColor?: string // color de fondo del card
  textColor?: string // color del texto
  goalLabel?: string // label para la meta
  currentLabel?: string // label para el estado actual
}

const props = withDefaults(defineProps<Props>(), {
  size: 112,
  stroke: 10,
  trackColor: '#FFFFFF',
  progressColor: '#FFC400', // amarillo
  backgroundColor: 'linear-gradient(135deg, #0a5cd4 0%, #013b8a 100%)',
  textColor: '#fff',
  goalLabel: 'Meta Anual',
  currentLabel: 'Estado Actual',
})

const center = computed(() => props.size / 2)
const radius = computed(() => props.size / 2 - props.stroke / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

// % de avance (0–100)
const percent = computed(() => {
  if (props.dailyGoal <= 0) return 0
  return Math.min(100, Math.max(0, (props.current / props.dailyGoal) * 100))
})
const percentLabel = computed(() => `${Math.round(percent.value)}%`)

// stroke-dashoffset para el anillo
const dashoffset = computed(() =>
  circumference.value * (1 - percent.value / 100)
)

// Coordenadas del “end cap” (circulito al final del trazo)
const endCap = computed(() => {
  // El círculo de progreso está rotado -90°, así que 0% inicia “arriba”
  const angle = (2 * Math.PI * percent.value) / 100 - Math.PI / 2
  return {
    x: center.value + radius.value * Math.cos(angle),
    y: center.value + radius.value * Math.sin(angle),
  }
})
</script>

<style scoped>
.goal-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
  border-radius: 16px;
  width: fit-content;
  min-width: 320px;
}

.ring-wrap {
  position: relative;
  display: grid;
  place-items: center;
}

.percent {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 18px;
}

.info {
  display: grid;
  row-gap: 14px;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 12px;
  align-items: baseline;
}

.label {
  font-size: 16px;
  opacity: 0.9;
}

.value {
  font-size: 20px;
  font-weight: 800;
}

/* animación suave del anillo */
.progress-anim {
  transition: stroke-dashoffset 500ms cubic-bezier(.4, 0, .2, 1);
}
</style>
