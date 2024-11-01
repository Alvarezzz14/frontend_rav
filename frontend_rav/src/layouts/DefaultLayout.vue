<template>
	<div
		class="grid grid-rows-layout grid-cols-layout bg-gray-50 overflow-hiden min-h-screen">
		<!-- Header -->
		<header class="row-span-1 col-span-full top-0 w-full z-50 text-white">
			<Header />
		</header>

		<!-- Sidebar izquierda -->
		<SidebarLeft class="row-start-2 bg-gray-50 col-start-1">
			<router-view></router-view>
		</SidebarLeft>

		<!-- Barra de notificaciones derecha -->

		<Notifications
			class="col-start-3 row-start-2 bg-gray-50"
			:isCollapsed="isNotificationsCollapsed"
			@toggle="toggleNotifications" />

		<!-- Contenido principal -->
		<main
			class="row-start-2 bg-gray-50 col-start-2 col-end-3 p-6 overflow-y-clip mt-[4rem] mb-[4rem]">
			<router-view />
		</main>

		<!-- Footer -->
		<footer class="row-span-1 fixed bottom-0 col-span-full w-full h-16 z-50">
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

const toggleNotifications = () => {
	isNotificationsOpen.value = !isNotificationsOpen.value;
};
</script>

<style scoped>
/* Configuración de las filas y columnas para CSS Grid */
.grid-rows-layout {
	grid-template-rows: auto 1fr auto; /* Header, contenido y footer */
}

.grid-cols-layout {
	grid-template-columns: auto 1fr auto; /* Barra lateral izquierda, contenido, barra de notificaciones */
}

/* Sombra adicional para darle un efecto visual más elegante */
.bg-gray-100 {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
