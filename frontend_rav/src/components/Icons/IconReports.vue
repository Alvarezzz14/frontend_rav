<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 34 30" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="className">
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" :stop-color="gradientFrom" />
        <stop offset="88.46%" :stop-color="gradientTo" />
        <stop offset="98.08%" :stop-color="gradientTo" />
      </linearGradient>
    </defs>
    <path 
      d="M2.125 0C0.935 0 0 0.935 0 2.125C0 3.315 0.935 4.25 2.125 4.25C3.315 4.25 4.25 3.315 4.25 2.125C4.25 0.935 3.315 0 2.125 0ZM8.5 0V4.25H34V0H8.5ZM2.125 8.5C0.935 8.5 0 9.435 0 10.625C0 11.815 0.935 12.75 2.125 12.75C3.315 12.75 4.25 11.815 4.25 10.625C4.25 9.435 3.315 8.5 2.125 8.5ZM8.5 8.5V12.75H34V8.5H8.5ZM2.125 17C0.935 17 0 17.935 0 19.125C0 20.315 0.935 21.25 2.125 21.25C3.315 21.25 4.25 20.315 4.25 19.125C4.25 17.935 3.315 17 2.125 17ZM8.5 17V21.25H34V17H8.5ZM2.125 25.5C0.935 25.5 0 26.435 0 27.625C0 28.815 0.935 29.75 2.125 29.75C3.315 29.75 4.25 28.815 4.25 27.625C4.25 26.435 3.315 25.5 2.125 25.5ZM8.5 25.5V29.75H34V25.5H8.5Z" 
      :fill="useGradient ? `url(#${gradId})` : color"/>
  </svg>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
defineProps({
  size: { type: [String, Number], default: 34 },
  color: { type: String, default: 'currentColor' },
  className: { type: String, default: '' },
  useGradient: { type: Boolean, default: false },
  gradientFrom: { type: String, default: '#005DCA' },
  gradientTo: { type: String, default: '#003B8A' }
})

const uid = getCurrentInstance()?.uid ?? Math.floor(Math.random()*1e6)
const gradId = `gradAzul-${uid}`
</script>
