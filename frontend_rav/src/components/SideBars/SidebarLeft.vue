<template>
	<!-- Barra lateral izquierda -->
	<aside
		:class="[
			'bg-white text-gray-800 shadow-lg flex flex-col justify-between  top-[4rem] h-[calc(100vh-4rem)] z-40 transition-transform transform backdrop-blur-lg',
			isCollapsed ? 'w-16' : 'w-64',
			sidebarOpen ? 'translate-x-0' : '-translate-x-full',
			'md:translate-x-0',
		]"
		@click.self="toggleSidebar">
		<!-- Sección superior con el RavIcon y navegación -->
		<div class="flex flex-col">
			<!-- Ícono centrado -->
			<div class="py-6 flex justify-center">
				<RavIcon />
			</div>

			<!-- Opciones de navegación -->
			<nav class="px-6">
				<ul class="list-none space-y-4">
					<li v-for="item in menuItems" :key="item.title" class="relative">
						<div
							@click="toggleSubmenu(item)"
							class="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition-colors">
							<span class="flex items-center">
								<i :class="item.icon" class="mr-2"></i>
								<span v-if="!isCollapsed">{{ item.title }}</span>
							</span>
							<i
								v-if="!isCollapsed"
								:class="
									item.submenuOpen
										? 'pi pi-chevron-down'
										: 'pi pi-chevron-right'
								"></i>
						</div>

						<!-- Submenú desplegable -->
						<ul
							v-if="item.submenuOpen && !isCollapsed"
							class="pl-8 space-y-2 overflow-hidden transition-all duration-500 ease-in-out"
							:style="{
								height: item.submenuOpen
									? `${item.submenu.length * 2.5}rem`
									: '0px',
							}">
							<li
								v-for="subItem in item.submenu"
								:key="subItem"
								class="hover:bg-gray-100 p-2 rounded-lg transition-colors">
								{{ subItem }}
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Sección inferior con el avatar, nombre y email -->
		<div class="p-6 border-t border-gray-300">
			<div class="flex items-center">
				<Avatar
					:src="user.avatar"
					alt="User Avatar"
					class="w-12 h-12 rounded-full mr-4" />
				<div v-if="!isCollapsed">
					<p class="font-semibold">{{ user.name }}</p>
					<p class="text-xs text-gray-500">{{ user.email }}</p>
				</div>
			</div>

			<!-- Botón de Cerrar Sesión -->
			<div v-if="!isCollapsed" class="mt-6">
				<LogoutButton @click="logout" />
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

import Button from "primevue/button";
// Definir las props para aceptar el estado del sidebar
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
		icon: "pi pi-home",
		submenuOpen: false,
		submenu: ["Gráficos", "Reportes"],
	},
	{
		title: "Settings",
		icon: "pi pi-cog",
		submenuOpen: false,
		submenu: ["Perfil", "Preferencias"],
	},
	{
		title: "Messages",
		icon: "pi pi-comments",
		submenuOpen: false,
		submenu: ["Recibidos", "Enviados"],
	},
	{
		title: "Bookmarks",
		icon: "pi pi-bookmark",
		submenuOpen: false,
		submenu: [],
	},
	{
		title: "Calendar",
		icon: "pi pi-calendar",
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
/* Estilos adicionales para sombra */
.aside {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>
