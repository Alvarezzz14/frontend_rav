<template>
	<div class="grid grid-rows-layout grid-cols-layout min-h-screen">
		<!-- Header -->
		<header
			class="row-span-1 col-span-full fixed top-0 w-full z-50 bg-blue-500 text-white">
			<Header />
		</header>

		<!-- Sidebar izquierda fija -->
		<aside
			class="row-start-2 col-start-1 bg-gray-800 text-white h-[calc(100vh-8rem)] p-4">
			<SidebarLeft />
		</aside>

		<!-- Contenido principal en el medio -->
		<main
			class="row-start-2 col-start-2 col-end-3 bg-gray-50 p-6 mt-[4rem] mb-[4rem] overflow-auto">
			<router-view />
		</main>

		<!-- Barra de notificaciones derecha fija -->
		<aside
			class="row-start-2 col-start-3 bg-gray-100 text-black h-[calc(100vh-8rem)] p-4">
			<Notifications />
		</aside>

		<!-- Footer -->
		<footer
			class="row-span-1 col-span-full fixed bottom-0 w-full h-16 z-50 bg-blue-500 text-white">
			<Footer />
		</footer>
	</div>
</template>

<script setup>
import Header from "../components/Header.vue";
import SidebarLeft from "../components/SideBars/SidebarLeft.vue";
import Notifications from "../components/SideBars/Notifications.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
/* Definición de las filas y columnas para la grid */
.grid-rows-layout {
	grid-template-rows: auto 1fr auto; /* Header, contenido y footer */
}

.grid-cols-layout {
	grid-template-columns: 250px 1fr 250px; /* Sidebar izquierda, contenido, barra de notificaciones */
}

/* Responsividad adicional */
@media (max-width: 768px) {
	.grid-cols-layout {
		grid-template-columns: 1fr; /* En pantallas pequeñas, solo muestra el contenido principal */
	}

	aside {
		display: none; /* Ocultar ambas barras laterales en pantallas pequeñas */
	}

	main {
		grid-column: 1 / -1; /* El contenido ocupa todo el ancho en pantallas pequeñas */
	}
}
</style>
