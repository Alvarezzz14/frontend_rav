<template>
	<footer class="w-full h-12 items-center justify-between relative">
		<!-- Ícono institucional a la izquierda con fondo azul -->

		<div
			class="flex items-center h-12 justify-center w-full sm:w-auto sm:justify-start bg-azulHeaderFooter">
			<IconoGov
				class="w-[140px] h-6 pl-6 sm:ml-0 my-2"
			/>
		</div>

		<!-- Texto centrado con fondo negro -->
		<!-- <div
			class="w-full left-1/2 transform text-white text-center h-6 text-sm bg-black p-1">
			&copy; 2024 Fábrica de Software SENA CDTI. Todos los derechos reservados.
		</div> -->
	</footer>
</template>

<script setup>
// Importamos el componente del ícono
 import IconoGov from "@/components/Icons/IconoGov.vue";
</script>
