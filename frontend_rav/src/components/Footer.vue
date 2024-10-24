<template>
	<footer
		class="bg-azulHeaderFooter w-full h-16 items-center justify-between px-4">
		<!-- Ícono institucional a la izquierda -->
		<div class="flex items-center">
			<IconoGov />
		</div>

		<!-- Texto centrado -->
		<div
			class="absolute left-1/2 transform -translate-x-1/2 text-white text-center text-sm">
			&copy; 2024 Fábrica de Software SENA CDTI. Todos los derechos reservados.
		</div>
	</footer>
</template>

<script setup>
// Importamos el componente del ícono
import IconoGov from "../components/Icons/IconoGov.vue";
</script>
