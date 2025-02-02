<template>
	<div class="overflow-auto flex flex-col min-h-dvh">
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
		<div class="flex flex-grow overflow-y-visible relative">
			<!-- Overlay (solo para main) -->
			<div
				v-show="isSidebarOpen && isSmallScreen"
				class="absolute inset-0 lg:hidden min-h-dvh bg-black bg-opacity-75 z-20"
				@click="closeSidebar"></div>

			<!-- Sidebar izquierdo desplegable en Menos de 1024px -->
			<transition name="slide">
				<aside
					v-show="isSidebarOpen && isSmallScreen"
					class="absolute left-0 shadow-md lg:hidden z-30 w-52">
					<SidebarLeft @item-click="closeSidebar" />
				</aside>
			</transition>

			<!-- Sidebar izquierdo (para pantallas grandes) -->
			<aside v-show="!isSmallScreen" class="hidden lg:flex h-full">
				<h1>Hola</h1>
				<SidebarLeft />
			</aside>

			<!-- Contenido principal -->
			<main
				class="flex-grow p-4 overflow-auto bg-gray-50 relative bg-no-repeat bg-bottom bg-contain"
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

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
const isSmallScreen = ref(window.innerWidth < 1024); // Verificar si es pantalla pequeña

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

// Listener para detectar cambios en el tamaño de la pantalla
const handleResize = () => {
	isSmallScreen.value = window.innerWidth < 1024;

	// Si se pasa a pantalla grande, asegúrate de cerrar el sidebar responsive
	if (!isSmallScreen.value) {
		isSidebarOpen.value = false;
	}
};

// Eventos para montar y desmontar el listener
onMounted(() => {
	window.addEventListener("resize", handleResize);
	handleResize(); // Ejecutar al montar por si cambia el tamaño rápidamente
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
});

// Cerrar barra lateral al seleccionar un ítem
const handleItemClick = (item) => {
	toggleSidebar();
	router.push(item.to);
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.3s ease;
}
.slide-enter-from {
	transform: translateX(-100%);
}
.slide-leave-to {
	transform: translateX(-100%);
}
</style>
