<template>
  <svg :width="width" :height="height" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.19888 0L3.91636 3.504L4.39777 3.488L7 8H4.93123L3.1487 4.416L2.62825 4.352L0.1171 0H2.19888ZM6.96097 0L4.44981 4.304L3.91636 4.256L2.01673 8H0L2.69331 3.456L3.20074 3.536L4.94424 0H6.96097Z" :fill="color"/>
  </svg>
  
</template>

<script setup>
const props = defineProps({
  width: { type: [Number, String], default: 7 },
  height: { type: [Number, String], default: 8 },
  color: { type: String, default: 'white' }
})
</script>

<style scoped>
</style>
