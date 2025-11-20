<template>
  <svg
    :width="size"
    :height="height || (size * 10 / 13)"
    :viewBox="viewBox"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
    :class="iconClass"
  >
    <path
      d="M1 5.4198L3.42981 8L12 1"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
// Props del componente
const props = defineProps({
  // Tamaño del icono (ancho)
  size: {
    type: [String, Number],
    default: 13
  },
  // Alto específico (opcional, se calcula proporcionalmente si no se especifica)
  height: {
    type: [String, Number],
    default: null
  },
  // ViewBox personalizado
  viewBox: {
    type: String,
    default: '0 0 13 10'
  },
  // Color de relleno
  fill: {
    type: String,
    default: 'none'
  },
  // Color del trazo
  stroke: {
    type: String,
    default: 'white'
  },
  // Grosor del trazo
  strokeWidth: {
    type: [String, Number],
    default: 2
  },
  // Clases CSS adicionales
  iconClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* Estilos base del icono */
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>