<template>
	<img :src="src" :alt="alt" class="w-12 h-12 rounded-full" />
</template>

<script setup>
const props = defineProps({
	src: {
		type: String,
		default: "https://primefaces.org/cdn/primevue/images/avatar/avatar.png",
	},
	alt: {
		type: String,
		default: "Avatar",
	},
});
</script>

<style scoped>
/* Estilos adicionales */
</style>
