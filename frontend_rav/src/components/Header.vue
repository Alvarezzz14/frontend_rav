<template>
	<header class="w-full h-12 bg-azulHeaderFooter flex items-center justify-between px-4">
	  <!-- Icono SVG institucional -->
	  <div class="flex items-center justify-center w-full sm:w-auto sm:justify-start bg-azulHeaderFooter">
		<img :src="IconoGov" alt="Icono Institucional" class="w-[140px] h-6 ml-2 sm:ml-0 my-2">
	  </div>
  
	  <!-- Otras opciones del header a la derecha, si es necesario -->
	  <div class="hidden sm:block">
		<!-- Aquí puedes poner elementos adicionales si es necesario -->
	  </div>
	</header>
  </template>
  
<script setup>
// Si tienes el SVG como un componente, lo importas aquí
import IconoGov from "@/assets/images/Gov.svg"
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
