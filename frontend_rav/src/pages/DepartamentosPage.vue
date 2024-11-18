<template>
	<div class="flex flex-col md:flex-row overflow-hidden w-full">
		<!-- Columna de Titulo y SearchApartament -->
		<div class="flex-1 p-4">
			<div class="mb-4">
				<Titulo />
			</div>
			<div>
				<SearchApartament />
			</div>
		</div>
	</div>
</template>

<script setup>
import SearchApartament from "@/components/SearchApartament.vue";
import Titulo from "@/components/Titulo.vue";
</script>
