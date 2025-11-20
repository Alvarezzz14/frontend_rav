<template>
    <div class="overflow-auto flex flex-col min-h-dvh relative">
        <!-- Header mobile absoluto según Figma: centrado, 394x54, top:56px -->
		<div class="lg:hidden">
			<div class="absolute top-8 left-0 w-full h-[54px] z-10 pl-4 pr-5">
				<div class="w-full max-w-[394px] mx-auto h-full flex items-center justify-between">
					<!-- Logo a la izquierda -->
					<LogoRavMobile class="w-[128px] h-[54px]" />
					<!-- Botones a la derecha -->
					<div class="flex items-center gap-2">
						<!-- Botón actividad -->
						<button
							type="button"
							aria-label="Actividad"
							class="flex items-center justify-center w-10 h-10 border-none rounded-full bg-azul-gradian active:brightness-95"
							@click="toggleActivity"
						>
							<IconActividad :size="20" :active="isActivityExpanded" class="flex-shrink-0" />
						</button>
						<!-- Botón menú -->
						<button
							type="button"
							aria-label="Menú"
							class="flex items-center justify-center w-10 h-10 border-none rounded-full bg-azul-gradian hover:brightness-110 active:brightness-95"
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
		</div>

		<!-- Contenedor principal con sidebars integrados -->
		<main
			class="flex-1 min-w-0 overflow-auto plantas-bg bg-backgroundApp relative bg-no-repeat bg-bottom bg-contain hide-scrollbar pt-[120px] lg:pt-0">
			
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
				   <div class="w-full lg:pl-[200px] lg:pr-[100px]">
					   <router-view />
				   </div>
			</div>
			<!-- FileNotification flotante fuera del dashboard -->
			<div class="hidden lg:block fixed top-8 right-24 z-40 pointer-events-auto">
				<FileNotification />
			</div>

			<!-- Sidebar derecho de actividad - desktop -->
			<aside class="hidden lg:block absolute right-0 top-0 z-30 h-full p-4">
				<Activity @toggle="toggleActivity" />
			</aside>

			<!-- Panel actividad móvil (overlay) -->
			<transition name="slide">
				<aside
					v-show="isActivityExpanded && isSmallScreen"
					class="fixed inset-0 w-screen h-screen z-40 overflow-y-auto lg:hidden"
				>
					<button
						class="absolute top-8 left-7 w-10 h-10 flex border-none bg-transparent z-50"
						@click="toggleActivity"
						aria-label="Cerrar actividad"
					>
						<IconCloseMenu class="w-[30px] h-[30px]" />
					</button>
					<Activity />
				</aside>
			</transition>
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
import IconActividad from "@/components/Icons/IconActividad.vue";
import IconCloseMenu from "@/components/Icons/IconCloseMenu.vue";
import { useUiStore } from '@/stores/ui';

// Store UI para controlar expansión del panel de actividad
const uiStore = useUiStore();
const isActivityExpanded = computed(() => uiStore.isActivityExpanded);

// Estados para controlar los menús y el overlay
const isSidebarOpen = ref(false);
// Eliminamos estado local duplicado de actividad: usamos store
const isSmallScreen = ref(window.innerWidth < 1024); // Verificar si es pantalla pequeña

// Métodos
const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
	isSidebarOpen.value = false;
};

const toggleActivity = () => {
  uiStore.setActivityExpanded(!uiStore.isActivityExpanded);
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

.plantas-bg {
  background-image: url("@/assets/images/plantasMobile.svg");
}
@media (min-width: 640px) {
  .plantas-bg {
    background-image: url("@/assets/images/plantas.svg");
  }
}

</style>
