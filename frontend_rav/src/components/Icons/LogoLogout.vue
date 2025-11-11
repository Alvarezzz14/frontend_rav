<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <circle cx="7" cy="7" r="7" :fill="color"/>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: '14'
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  className: {
    type: String,
    default: ''
  }
})
</script>
