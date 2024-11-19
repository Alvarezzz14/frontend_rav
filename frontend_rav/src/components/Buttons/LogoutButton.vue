<template>
	<button
		@click="$emit('click')"
		class="w-full py-3 cursor-pointer border-moradoSecundario border-2 bg-azulBarraApe text-white rounded-lg hover:bg-moradoSecundario transition-colors">
		Cerrar Sesión
	</button>
</template>

<script setup>
const props = defineProps(["click"]);
</script>
