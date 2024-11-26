<template>
	<div class="flex flex-col md:flex-row overflow-hidden">
		<!-- Columna de Titulo y BusquedaDepartamento -->
		<div class="flex-1 p-4">
			<div class="mb-4">
				<Titulo />
			</div>
			<div>
				<BusquedaDepartamento />
			</div>
		</div>
	</div>
</template>

<script setup>
import BusquedaDepartamento from "@/components/BusquedaDepartamento.vue";
import Titulo from "@/components/Titulo.vue";
</script>
