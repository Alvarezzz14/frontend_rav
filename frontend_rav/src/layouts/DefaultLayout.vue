<template>
	<div class="flex flex-col h-screen">
		<!-- Header -->
		<header class="w-full">
			<Header />
		</header>
		<!-- Sección para pantallas pequeñas -->
		<div class="lg:hidden flex flex-col">
			<button @click="toggleSidebar" class="bg-yellow-500 text-white p-2">
				Menu Principal
			</button>
			<div v-if="isSidebarOpen">
				<SidebarLeft />
			</div>
			<button
				@click="MinitoggleNotifications"
				class="bg-purple-500 text-white p-2">
				Notificaciones
			</button>
			<div v-if="showNotifications">
				<Notifications />
			</div>
		</div>

		<!-- Contenedor principal con sidebar izquierdo, contenido y sidebar derecho -->
		<div class="flex flex-grow overflow-hidden">
			<!-- Sidebar izquierda -->
			<aside class="h-full bg-gray-100 hidden lg:flex">
				<SidebarLeft />
			</aside>

			<!-- Contenido principal -->
			<main class="flex-grow p-4 overflow-y-auto bg-gray-50">
				<router-view />
			</main>

			<!-- Sidebar derecha de notificaciones -->
			<aside
				class="h-full bg-gray-100 hidden lg:flex"
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
import Header from "../components/Header.vue";
import SidebarLeft from "../components/SideBars/SidebarLeft.vue";
import Notifications from "../components/SideBars/Notifications.vue";
import Footer from "../components/Footer.vue";

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
