<template>
	<header
		class="w-full h-12 bg-azulHeaderFooter flex items-center justify-between px-4">
		<!-- Icono SVG institucional a la izquierda -->
		<div class="flex items-center bg-azulHeaderFooter">
			<img :src="IconoGov" alt="" class="w-[140px] h-6 top-[1000px] ml-2 left-[20px] my-2">
		</div>

		<!-- Otras opciones del header a la derecha, si es necesario -->
		<div>
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
