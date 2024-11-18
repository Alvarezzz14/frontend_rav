<template>
	<div class="flex flex-col h-screen">
		<!-- Header -->
		<header class="w-full">
			<Header />
		</header>

		<!-- Sección para pantallas pequeñas -->
		<div class="lg:hidden flex justify-center py-4">
			<img src="@/assets/images/ravLogo.png" alt="Logo Rav" />
		</div>

		<!-- Barra horizontal (botón para abrir el sidebar) -->
		<div
			@click="toggleSidebar"
			class="lg:hidden flex h-12 cursor-pointer items-center font-bold bg-customPurple text-amarillo text-lg shadow-md p-4 w-full">
			<svg
				width="27"
				height="27"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="12.5" cy="12.5" r="12.5" fill="#FDC300" />
				<path
					d="M8 8V9.12646H17.0117V8H8ZM8 11.3456V12.4721H17.0117V11.3456H8ZM8 14.725V15.8515H17.0117V14.725H8Z"
					fill="#7A1F7E" />
			</svg>
		</div>

		<div
			class="lg:hidden fixed inset-0 bg-black bg-opacity-50 top-[calc(52px+125px)] overflow-auto"
			v-if="isSidebarOpen"
			@click="toggleSidebar">
			<div class="flex flex-col">
				<div v-if="isSidebarOpen">
					<SidebarLeft />
				</div>
			</div>
		</div>

		<!-- Contenedor principal con sidebar izquierdo, contenido y sidebar derecho -->
		<div class="flex">
			<!-- Sidebar izquierda -->
			<aside class="h-full bg-gray-100 hidden lg:flex">
				<SidebarLeft />
			</aside>

			<!-- Contenido principal -->
			<main class="overflow-auto flex flex-grow p-4 bg-gray-50">
				<router-view />
			</main>

			<!-- Sidebar derecha de notificaciones -->
			<aside
				class="h-full bg-gray-100 hidden lg:flex max-w-72"
				:class="{ 'translate-x-full': isNotificationsCollapsed }">
				<Notifications @toggle="toggleNotifications" />
			</aside>
		</div>

		<!-- Footer -->
		<footer class="w-full h-16">
			<Footer />
		</footer>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import SidebarLeft from "@/components/SideBars/SidebarLeft.vue";
import Notifications from "@/components/SideBars/Notifications.vue";
import Footer from "@/components/Footer.vue";

// Controla el colapso del sidebar y de la barra de notificaciones

const isNotificationsCollapsed = ref(false);
const isNotificationsOpen = ref(false); // Controla si la barra de notificaciones está abierta
const isSidebarOpen = ref(false);
const showNotifications = ref(false);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const MinitoggleNotifications = () => {
	showNotifications.value = !showNotifications.value;
};
const toggleNotifications = () => {
	isNotificationsOpen.value = !isNotificationsOpen.value;
};

// Computar si es móvil
</script>

<style scoped>
/* Sombra adicional para darle un efecto visual más elegante */
.bg-gray-100 {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
