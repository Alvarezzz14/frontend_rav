<!-- src/components/Overlay.vue -->
<template>
	<div
		v-if="isVisible"
		:class="['overlay', { 'overlay-sidebar-open': isSidebarOpen }]"
		@click="closeOverlay"></div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

// Define las propiedades
const props = defineProps({
	isVisible: {
		type: Boolean,
		required: true,
	},
	isSidebarOpen: {
		type: Boolean,
		default: false,
	},
});

// Define los eventos
const emit = defineEmits(["close"]);

// Función para cerrar el overlay
function closeOverlay() {
	emit("close");
}
</script>

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 60;
	transition: width 0.3s ease;
}

/* Ajusta el ancho del overlay para cubrir solo la zona del main cuando el sidebar está abierto */
.overlay-sidebar-open {
	left: 13rem; /* 52 de ancho en Tailwind (w-52) */
}
</style>
