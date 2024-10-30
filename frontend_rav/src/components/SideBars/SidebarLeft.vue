<template>
	<!-- Barra lateral izquierda -->
	<aside
		:class="[
			'bg-white text-gray-800 shadow-lg flex flex-col justify-between top-[4rem] h-[calc(100vh-4rem)] z-40 transition-transform transform backdrop-blur-lg',
			isCollapsed ? 'w-16' : 'w-64',
			sidebarOpen ? 'translate-x-0' : '-translate-x-full',
			'md:translate-x-0',
		]"
		@click.self="toggleSidebar">
		<!-- Sección superior con el RavIcon y navegación -->
		<div class="flex flex-col items-center">
			<!-- Ícono centrado -->
			<div class="py-4 flex justify-center">
				<RavIcon :class="[isCollapsed ? 'w-8 h-8' : 'w-12 h-12']" />
			</div>

			<!-- Opciones de navegación -->
			<nav class="px-2 w-full">
				<ul class="list-none space-y-2 w-full">
					<li v-for="item in menuItems" :key="item.title" class="relative">
						<router-link
							:to="item.to"
							class="flex items-center justify-center cursor-pointer p-2 rounded-lg text-customPurple hover:bg-gray-100 transition-colors no-underline"
							@click.native.prevent="toggleSubmenu(item)">
							<span class="flex items-center space-x-2">
								<i :class="[item.icon, 'text-xl']"></i>
								<span v-if="!isCollapsed" class="text-center">{{ item.title }}</span>
							</span>
						</router-link>

						<!-- Submenú desplegable -->
						<ul
							v-if="item.submenuOpen && !isCollapsed"
							class="pl-6 space-y-1 transition-all duration-300 ease-in-out w-full">
							<li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
								<router-link
									:to="subItem.to"
									class="block text-center text-sm text-customPurple hover:bg-gray-100 p-1 rounded-lg no-underline">
									{{ subItem.title }}
								</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Sección inferior con el avatar, nombre y email -->
		<div class="p-4 border-t border-gray-300 flex-shrink-0 w-full">
			<div class="flex items-center justify-center">
				<Avatar
					:src="user.avatar"
					alt="User Avatar"
					class="w-8 h-8 rounded-full" />
				<div v-if="!isCollapsed" class="text-xs text-center ml-2">
					<p class="font-semibold">{{ user.name }}</p>
					<p class="text-gray-500">{{ user.email }}</p>
				</div>
			</div>

			<!-- Botón de Cerrar Sesión -->
			<div v-if="!isCollapsed" class="mt-4 text-center">
				<LogoutButton @click="logout" class="text-xs py-1 px-2" />
			</div>
		</div>
	</aside>

	<!-- Botón hamburguesa en modo responsive -->
	<div class="absolute top-4 left-4 md:hidden z-50">
		<button @click="toggleSidebar" class="text-black focus:outline-none">
			<i class="pi pi-bars text-3xl"></i>
		</button>
	</div>
</template>

<script setup>
import { ref } from "vue";
import RavIcon from "../Icons/RavIcon.vue";
import Avatar from "../Buttons/Avatar.vue";
import LogoutButton from "../Buttons/LogoutButton.vue";

const props = defineProps({
	isCollapsed: Boolean, // Prop para manejar el colapso del sidebar
});

const sidebarOpen = ref(false);
const user = ref({
	name: "Amy Elsner",
	email: "amy.elsner@example.com",
	avatar: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
});

const menuItems = ref([
	{
		title: "Dashboard",
		to: "/dashboard",
		icon: "pi pi-home",
		submenuOpen: false,
		submenu: [
			{ title: "Gráficos", to: "/dashboard/graficos" },
			{ title: "Reportes", to: "/dashboard/reportes" },
		],
	},
	{
		title: "Registro de Actividad",
		to: "/registroactividad",
		icon: "pi pi-tag",
		submenuOpen: false,
		submenu: [
			
		],
	},
	{
		title: "Ruta de Atención",
		to: "/busquedaciudadano",
		icon: "pi pi-sitemap",
		submenuOpen: false,
		
	},
	{
		title: "Mapa",
		to: "/departamentos",
		icon: "pi pi-map",
		submenuOpen: false,
		submenu: [],
	},
	{
		title: "Cargar Archivo",
		to: "/archivo",
		icon: "pi pi-file-arrow-up",
		submenuOpen: false,
		submenu: [],
	},
]);

const toggleSidebar = () => {
	sidebarOpen.value = !sidebarOpen.value;
};

const toggleSubmenu = (item) => {
	item.submenuOpen = !item.submenuOpen;
};

const logout = () => {
	alert("Sesión cerrada");
};
</script>

<style scoped>
/* Eliminar desplazamiento y ajustes de ancho completo */
.aside {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	overflow: hidden; /* Elimina el scroll */
}
a {
	text-decoration: none; /* Elimina subrayado en enlaces */
}
</style>
