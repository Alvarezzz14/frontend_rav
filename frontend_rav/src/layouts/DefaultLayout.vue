<template>
	<div class="flex flex-col min-h-screen">
		<!-- Header -->
		<Header />

		<div class="flex flex-1">
			<!-- Barra lateral izquierda -->
			<SideNavLeft />

			<!-- Contenido principal -->
			<main class="flex-1 p-6"></main>
		</div>

		<!-- Footer -->
		<Footer class="bg-gray-800 text-white py-4" />
	</div>
</template>

<script setup>
import Header from "../components/Header.vue";
import SideNavLeft from "../components/SideNavLeft.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
/* Puedes agregar estilos adicionales si es necesario */
</style>
