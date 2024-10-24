<template>
	<div class="grid grid-rows-layout grid-cols-layout min-h-screen">
		<!-- Header -->
		<header
			class="row-span-1 col-span-full fixed top-0 w-full z-50 bg-blue-500 text-white">
			<Header />
		</header>

		<!-- Sidebar izquierda (con opción de colapsar) -->
		<aside
			class="row-start-2 col-start-1 fixed left-0 h-[calc(100vh-8rem)] z-40 transition-transform transform"
			:class="{
				'w-64': !isSidebarCollapsed,
				'w-16': isSidebarCollapsed,
			}">
			<SidebarLeft :isCollapsed="isSidebarCollapsed" />
		</aside>

		<!-- Barra de notificaciones derecha (con opción de colapsar) -->
		<aside
			class="row-start-2 col-end-4 bg-gray-100 shadow-lg fixed top-[4rem] right-0 h-[calc(100vh-8rem)] z-40 transition-all"
			:class="{
				'w-72': !isNotificationsCollapsed,
				'w-16': isNotificationsCollapsed,
			}">
			<Notifications
				:isCollapsed="isNotificationsCollapsed"
				@toggle="toggleNotifications" />
		</aside>

		<!-- Contenido principal -->
		<main
			class="row-start-2 bg-gray-50 col-start-2 col-end-3 p-6 mt-[4rem] mb-[4rem]">
			<router-view />
		</main>

		<!-- Footer -->
		<footer class="row-span-1 col-span-full fixed bottom-0 w-full h-16 z-50">
			<Footer />
		</footer>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Header from "../components/Header.vue";
import SidebarLeft from "../components/SideBars/SidebarLeft.vue";
import Notifications from "../components/Notifications.vue";
import Footer from "../components/Footer.vue";

// Controla si la barra lateral izquierda y la barra de notificaciones están colapsadas
const isSidebarCollapsed = ref(false);
const isNotificationsCollapsed = ref(false);

const toggleSidebar = () => {
	isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleNotifications = () => {
	isNotificationsCollapsed.value = !isNotificationsCollapsed.value;
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

.bg-white {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsividad adicional si la necesitas */
@media (max-width: 768px) {
	.grid-cols-layout {
		grid-template-columns: 1fr; /* En pantallas pequeñas, elimina las barras laterales */
	}

	aside {
		display: none; /* Ocultar las barras laterales en pantallas pequeñas */
	}

	main {
		grid-column: 1 / -1; /* El contenido ocupa todo el ancho */
	}
}
</style>
