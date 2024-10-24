<template>
	<button
		@click="$emit('click')"
		class="w-full py-3 cursor-pointer bg-customPurple text-white rounded-lg hover:bg-purple-700 transition-colors">
		Cerrar Sesión
	</button>
</template>

<script setup>
const props = defineProps(["click"]);
</script>
