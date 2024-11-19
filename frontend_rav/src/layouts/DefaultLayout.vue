<template>
	<div class="flex flex-col h-screen">
		<!-- Header -->
		<header class="w-full">
			<Header />
		</header>

		<!-- Logo para pantallas pequeñas -->
		<div class="lg:hidden flex justify-center py-4">
			<img :src="RavLogo" alt="Logo Rav" />
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

		<!-- Contenedor principal -->
		<div class="flex flex-grow relative">
			<!-- Overlay (solo para main) -->
			<div
				v-if="isSidebarOpen"
				class="absolute inset-0 lg:hidden h-full bg-black bg-opacity-75 z-20"
				:style="overlayStyle"
				@click="closeSidebar"></div>

			<!-- Sidebar izquierdo desplegable -->
			<aside
				v-if="isSidebarOpen"
				class="absolute left-0 shadow-md lg:hidden z-30 w-52"
				:style="sidebarStyle">
				<SidebarLeft />
			</aside>

			<!-- Sidebar izquierdo (para pantallas grandes) -->
			<aside v-if="!isSidebarOpen" class="hidden lg:flex h-full">
				<SidebarLeft />
			</aside>

			<!-- Contenido principal -->
			<main
				class="flex-grow p-4 overflow-y-auto bg-gray-50 relative bg-no-repeat bg-bottom bg-contain"
				style="background-image: url('src/assets/images/plantas.png')">
				<FileNotification />
				<router-view />
			</main>

			<!-- Sidebar derecho de notificaciones -->
			<aside
				class="hidden lg:flex h-full max-w-72"
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
import { ref, computed } from "vue";

// Componentes
import Header from "@/components/Header.vue";
import SidebarLeft from "@/components/SideBars/SidebarLeft.vue";
import Notifications from "@/components/SideBars/Notifications.vue";
import Footer from "@/components/Footer.vue";
import RavLogo from "@/assets/images/ravLogo.png";
import FileNotification from "@/components/FileNotification.vue";

// Estados para controlar los menús y el overlay
const isSidebarOpen = ref(false);
const isNotificationsCollapsed = ref(false);

// Métodos
const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
	isSidebarOpen.value = false;
};

const toggleNotifications = () => {
	isNotificationsCollapsed.value = !isNotificationsCollapsed.value;
};

// Estilos dinámicos para overlay y sidebar
const overlayStyle = computed(() => ({
	bottom: `64px`, // Ajusta para que termine antes del footer
}));
</script>

<style scoped>
/* Ajuste para evitar problemas de scroll con el overlay */
</style>
