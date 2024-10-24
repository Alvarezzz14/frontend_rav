<template>
	<header
		class="bg-azulHeaderFooter w-full h-12 flex items-center justify-between px-4">
		<!-- Icono SVG institucional a la izquierda -->
		<div class="flex items-center">
			<IconoGov />
		</div>

		<!-- Otras opciones del header a la derecha, si es necesario -->
		<div>
			<!-- Aquí puedes poner elementos adicionales si es necesario -->
		</div>
	</header>
</template>

<script setup>
// Si tienes el SVG como un componente, lo importas aquí
import IconoGov from "../components/Icons/IconoGov.vue";
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
