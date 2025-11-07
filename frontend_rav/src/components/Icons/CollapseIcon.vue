<template>
  <svg :width="width" :height="height" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!--
      Si rotated = true (menú expandido): triángulos "de frente" (como estaba)
      Si rotated = false (menú contraído): triángulos "de espalda" (ángulos invertidos)
    -->
    <g :transform="`rotate(${upperRotation} 14 14)`">
      <polygon points="14,14 19,22 9,22" fill="#005DCA" />
    </g>
    <g :transform="`rotate(${lowerRotation} 14 14)`">
      <polygon points="14,14 19,22 9,22" fill="#005DCA" />
    </g>
  </svg>
  </template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: {
    type: [String, Number],
    default: 64,
  },
  height: {
    type: [String, Number],
    default: 64,
  },
  rotated: {
    type: Boolean,
    default: false,
  }
});

// expanded (rotated=true):   -140 y 40  -> "de frente"
// collapsed (rotated=false): -40  y 140 -> "de espalda"
const upperRotation = computed(() => (props.rotated ? -140 : -40));
const lowerRotation = computed(() => (props.rotated ? 40 : 140));
</script>
