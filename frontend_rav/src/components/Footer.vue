<template>
	<footer class=" w-full h-16 items-center justify-between  relative">
		<!-- Ícono institucional a la izquierda con fondo azul -->
		<div class="flex items-center bg-azulHeaderFooter">
			<img :src="IconoGov" alt="" class="w-[140px] h-6 top-[1000px] ml-2 left-[20px] my-2">
		</div>

		<!-- Texto centrado con fondo negro -->
		<div class="w-full left-1/2 transform  text-white text-center h-6 text-sm bg-black p-1">
			&copy; 2024 Fábrica de Software SENA CDTI. Todos los derechos reservados.
		</div>
	</footer>
</template>


<script setup>
// Importamos el componente del ícono
import IconoGov from "@/assets/images/Gov.svg"
</script>
