<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 34 32" 
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
      d="M31.5812 11.9827C31.6204 12.0333 32.4149 12.4531 32.6439 12.6582C34.4686 14.2913 34.4502 17.3829 32.5989 18.9845C32.3682 19.1844 31.7011 19.5327 31.6062 19.6898C31.373 20.0721 31.0441 21.5655 30.7992 22.1608C29.0711 26.3661 25.4126 29.7745 21.2144 31.0558C20.1476 31.3813 19.1657 31.4258 18.1322 31.6659C17.3777 31.8413 17.2786 32.1983 16.3225 31.8588C14.4529 31.1945 15.4131 28.8824 17.4243 29.2202C17.8016 29.2839 18.1156 29.6043 18.442 29.6383C20.5149 29.8591 24.3841 27.5557 25.8981 26.1016C36.862 15.5674 25.2427 -3.31018 11.409 3.14789C5.33783 5.98197 2.2731 13.2884 4.16024 19.9464C0.591663 20.1672 -1.37459 15.591 1.11716 12.8738C1.35368 12.6155 2.04324 12.2463 2.16483 12.0516C2.34888 11.7584 2.52461 10.7572 2.68201 10.3243C7.52311 -3.03437 25.4043 -3.5668 30.7992 9.52915C30.9674 9.93851 31.5046 11.8814 31.5812 11.9827Z" 
      :fill="useGradient ? `url(#${gradId})` : color"/>
    <path 
      fill-rule="evenodd" 
      clip-rule="evenodd" 
      d="M23.9116 20.2701C27.1636 13.9883 22.3947 6.55345 15.6746 7.15084C9.89716 7.66454 6.2817 14.3856 8.9079 19.9724C11.9202 26.3809 20.6574 26.5563 23.9116 20.2701ZM25.7072 21.2721C29.7251 13.5108 23.8361 4.30101 15.5007 5.04199C8.23304 5.6882 3.84993 14.0381 7.07592 20.9008C10.8181 28.8621 21.6679 29.0749 25.7072 21.2721Z" 
      :fill="useGradient ? `url(#${gradId})` : color"/>
    <path 
      d="M21 19.0709C20.1662 23.0052 12.773 22.9708 12 19C14.9 20.0052 18.0874 20.069 21 19.0709Z" 
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
