<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 36 34" 
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
      d="M26.7985 15.1382L30.9386 13.1449C32.4915 12.8222 32.4844 14.5829 32.7069 15.6578C33.5638 19.8199 34.3213 24.0293 35.0457 28.208C35.0362 28.5948 34.7521 28.8273 34.4775 29.0527L24.0076 33.5256L23.2501 33.4805L11.3789 29.2924L1.41319 33.5161C0.677005 33.6561 0.194106 33.3761 0 32.6595C0.733816 27.8497 1.81324 23.0636 2.69382 18.268C2.79324 17.9809 3.02285 17.746 3.27377 17.5822L8.30396 15.1382C7.76425 14.0609 7.34527 12.8744 7.1985 11.6666C6.49073 5.83883 10.9717 0.40019 16.8115 0.0229018C24.8574 -0.496759 30.4794 7.92697 26.8032 15.1382H26.7985ZM17.4317 6.49138C13.1708 6.49138 13.4075 10.5253 14.5911 13.8473L17.6684 14.3219L20.2723 13.61C21.2191 11.2371 22.8974 6.49138 17.4317 6.49138ZM29.5042 16.9321L24.4716 18.7236L23.2501 20.3324L24.2964 29.9829L25.0066 29.7456L31.3979 27.1354L29.5042 16.9321ZM3.22879 30.4575L9.85681 27.3727L10.8037 18.8304L9.41652 17.0341L4.69879 19.3856L3.22879 30.4575ZM21.9695 22.1382L18.5158 26.7558C18.0803 27.368 17.3062 27.4771 16.7405 26.9693L13.1708 21.9127L12.9341 26.8958L22.8761 30.2178L21.9695 22.1358V22.1382Z" 
      :fill="useGradient ? `url(#${gradId})` : color"/>
  </svg>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
defineProps({
  size: { type: [String, Number], default: 36 },
  color: { type: String, default: 'currentColor' },
  className: { type: String, default: '' },
  useGradient: { type: Boolean, default: false },
  gradientFrom: { type: String, default: '#005DCA' },
  gradientTo: { type: String, default: '#003B8A' }
})

const uid = getCurrentInstance()?.uid ?? Math.floor(Math.random()*1e6)
const gradId = `gradAzul-${uid}`
</script>
