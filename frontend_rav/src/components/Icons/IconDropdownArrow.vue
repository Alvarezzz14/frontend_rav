<template>
  <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 8.75L0 0.75H13L6.75 8.75Z" :fill="color" />
  </svg>
</template>

<script setup>
// Permite cambiar el color si se requiere
const props = defineProps({
  color: {
    type: String,
    default: '#71277A'
  }
});
</script>
