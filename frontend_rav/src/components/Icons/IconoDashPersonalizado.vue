<!-- components/IconoPersonalizado.vue -->
<template>
	<img
		v-if="iconPath"
		:src="iconPath"
		:alt="`Icono de ${name}`"
		class="w-6 h-6" />
	<p v-else>No se encontró el icono</p>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
});

// Carga todos los iconos de la carpeta usando import.meta.glob
const icons = import.meta.glob("../../assets/iconosDash/*.svg");

// Computed para encontrar la ruta correcta del icono basado en `name`
const iconPath = computed(() => {
	const iconName = `../../assets/iconosDash/${props.name}.svg`;
	return icons[iconName] ? icons[iconName]() : null;
});
</script>
