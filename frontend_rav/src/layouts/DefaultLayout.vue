<template>
	<div class="overflow-auto flex flex-col min-h-dvh">
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
					fill="#005DCA" />
			</svg>
		</div>

		<!-- Contenedor principal con sidebars integrados -->
		<main
			class="flex-1 min-w-0 overflow-auto bg-[#F5F5F5] relative bg-no-repeat bg-bottom bg-contain hide-scrollbar"
			style="background-image: url('src/assets/images/plantas.png')">
			
			<!-- Overlay (solo para main) -->
			<div
				v-show="isSidebarOpen && isSmallScreen"
				class="absolute inset-0 lg:hidden min-h-dvh bg-black bg-opacity-75 z-20"
				@click="closeSidebar"></div>

			<!-- Sidebar izquierdo desplegable en Menos de 1024px -->
			<transition name="slide">
				<aside
					v-show="isSidebarOpen && isSmallScreen"
					class="absolute left-0 top-0 shadow-md lg:hidden z-30 w-[280px] h-full">
					<SidebarLeft @item-click="closeSidebar" />
				</aside>
			</transition>

			<!-- Sidebar izquierdo (para pantallas grandes) - absolute -->
			<aside class="hidden lg:block absolute left-0 top-0 z-30 h-full p-4">
				<SidebarLeft />
			</aside>

			<!-- Contenido del dashboard -->
			<div class="w-full min-w-0 p-4 overflow-auto relative flex justify-center hide-scrollbar">
				<div class="w-full pl-4 lg:pl-[220px] lg:pr-[100px]">
					<FileNotification />
					<router-view />
				</div>
			</div>

			<!-- Sidebar derecho de actividad - absolute -->
			<aside class="hidden lg:block absolute right-0 top-0 z-30 h-full p-4">
				<Activity @toggle="toggleActivity" />
			</aside>
		</main>

		<!-- Footer -->
		<footer class="w-full h-12">
			<Footer />
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// Componentes
import SidebarLeft from "@/components/SideBars/SidebarLeft.vue";
import Activity from "@/components/SideBars/Activity.vue";
import Footer from "@/components/Footer.vue";
import RavLogo from "@/assets/images/ravLogo.png";
import FileNotification from "@/components/FileNotification.vue";

// Estados para controlar los menús y el overlay
const isSidebarOpen = ref(false);
const isActivityCollapsed = ref(false);
const isSmallScreen = ref(window.innerWidth < 1024); // Verificar si es pantalla pequeña

// Métodos
const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
	isSidebarOpen.value = false;
};

const toggleActivity = () => {
	isActivityCollapsed.value = !isActivityCollapsed.value;
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

/* Ocultar barras de scroll pero mantener funcionalidad */
.hide-scrollbar {
	scrollbar-width: none !important; /* Firefox */
	-ms-overflow-style: none !important; /* IE and Edge */
}

.hide-scrollbar::-webkit-scrollbar {
	display: none !important; /* Chrome, Safari y Opera */
	width: 0 !important;
	height: 0 !important;
}

.hide-scrollbar::-webkit-scrollbar-track {
	display: none !important;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
	display: none !important;
}
</style>
