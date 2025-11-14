<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <path
      d="M13.45 1.78C13.41 2.03 13.39 2.28 13.39 2.53C13.39 4.78 15.21 6.5991 17.45 6.5991C17.7 6.5991 17.94 6.5701 18.19 6.5301V14.5991C18.19 17.9901 16.19 20.0001 12.79 20.0001H5.401C2 20.0001 0 17.9901 0 14.5991V7.2001C0 3.8001 2 1.78 5.401 1.78H13.45ZM13.651 7.86C13.38 7.83 13.111 7.95 12.95 8.17L10.531 11.3L7.76 9.12C7.59 8.99 7.39 8.9391 7.19 8.9601C6.991 8.9901 6.811 9.0991 6.69 9.2591L3.731 13.1101L3.67 13.2001C3.5 13.5191 3.58 13.9291 3.88 14.1501C4.02 14.2401 4.17 14.3001 4.34 14.3001C4.571 14.3101 4.79 14.1891 4.93 14.0001L7.44 10.7691L10.29 12.9101L10.38 12.9691C10.7 13.1391 11.1 13.0601 11.33 12.7591L14.22 9.0301L14.18 9.0501C14.34 8.8301 14.37 8.5501 14.26 8.3001C14.151 8.0501 13.91 7.8801 13.651 7.86ZM17.5901 0C18.9201 0 20.0001 1.0798 20.0001 2.4098C20.0001 3.7398 18.9201 4.8198 17.5901 4.8198C16.2601 4.8198 15.1801 3.7398 15.1801 2.4098C15.1801 1.0798 16.2601 0 17.5901 0Z"
      :fill="fillColor"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: [Number, String], default: 25 },
  active: { type: Boolean, default: false },
  colorActive: { type: String, default: '#002C4D' },
  colorInactive: { type: String, default: '#FDC300' },
})

const fillColor = computed(() => (props.active ? props.colorActive : props.colorInactive))
</script>

<style scoped>
</style>
