<template>
	<div class="overflow-auto flex flex-col min-h-dvh">
        <!-- Header mobile (solo mobile): contenedor 394x54 centrado -->
		<div class="lg:hidden flex justify-center w-full py-4">
			<div class="flex items-center justify-between w-full max-w-[394px] h-[54px]">
				<LogoRavMobile class="w-[128px] h-[54px]" />
				<div class="flex items-center gap-3">
					<!-- Botón actividad -->
					<button
						type="button"
						aria-label="Actividad"
						class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#005DCA] to-[#003B8A]"
						@click="toggleActivity"
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<circle cx="10" cy="10" r="10" fill="#FDC300" />
							<path d="M6 10.5L9 13.5L14 8.5" stroke="#005DCA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
					<!-- Botón menú -->
					<button
						type="button"
						aria-label="Menú"
						class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#005DCA] to-[#003B8A]"
						@click="toggleSidebar"
					>
						<svg width="18" height="14" viewBox="0 0 18 14" fill="none">
							<rect y="0" width="18" height="2" rx="1" fill="#F2F3F3" />
							<rect y="6" width="18" height="2" rx="1" fill="#F2F3F3" />
							<rect y="12" width="18" height="2" rx="1" fill="#F2F3F3" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Contenedor principal con sidebars integrados -->
		<main
			class="flex-1 min-w-0 overflow-auto bg-backgroundApp relative bg-no-repeat bg-bottom bg-contain hide-scrollbar"
			style="background-image: url('src/assets/images/plantas.svg')">
			
			<!-- Overlay deshabilitado porque el sidebar móvil cubre toda la pantalla -->
			<div v-show="false"></div>

			<!-- Sidebar izquierdo desplegable en Menos de 1024px -->
			<transition name="slide">
				<aside
					v-show="isSidebarOpen && isSmallScreen"
					class="fixed inset-0 lg:hidden z-30 w-screen h-screen p-0">
					<SidebarLeft @item-click="closeSidebar" @close="closeSidebar" />
				</aside>
			</transition>

			<!-- Sidebar izquierdo (para pantallas grandes) - absolute -->
			<aside class="hidden lg:block absolute left-0 top-0 z-30 h-full p-4">
				<SidebarLeft />
			</aside>

			<!-- Contenido del dashboard -->
			<div class="w-full min-w-0 p-4 overflow-auto relative flex justify-center hide-scrollbar">
				   <div class="w-full lg:pl-[220px] lg:pr-[100px]">
					   <router-view />
				   </div>
			</div>
			<!-- FileNotification flotante fuera del dashboard -->
			<div class="hidden lg:block fixed top-8 right-24 z-40 pointer-events-auto">
				<FileNotification />
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
import LogoRavMobile from "@/components/Icons/LogoRavMobile.vue";
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
