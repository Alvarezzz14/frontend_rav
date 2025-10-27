<template>
  <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.25 0.506836L13 8.50684H0L6.25 0.506836Z" :fill="color" />
  </svg>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#71277A'
  }
});
</script>
