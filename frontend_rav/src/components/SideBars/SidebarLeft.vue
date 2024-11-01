<template>
	<div class="relative flex flex-col h-[calc(100vh-8rem)] overflow-y-auto">
		<!-- Logo en el área principal con una línea morada -->

		<!-- Botón hamburguesa en modo responsive -->
		<div class="">
			<button
				@click="isSidebarOpen = !isSidebarOpen"
				class="cursor-pointer focus:outline-none h-1 bg-amarillo relative top-0 left-0 z-50 p-4 md:hidden rounded-full"
				aria-label="Toggle sidebar">
				<i class="pi pi-bars"></i>
			</button>
		</div>

		<!-- Barra lateral izquierda -->
		<div
			:class="{
				'translate-x-0': isSidebarOpen,
				'-translate-x-full': !isSidebarOpen,
			}"
			class="fixed md:relative flex-grow w-56 bg-white rounded-r-3xl overflow-hidden transform transition-transform duration-200 z-40 md:translate-x-0">
			<!-- Sección superior con el RavIcon y navegación -->
			<!-- Ícono centrado -->
			<div class="py-8 flex items-center h-auto justify-center shadow-md">
				<RavIcon />
			</div>

			<!-- Menu de navegación -->
			<nav>
				<ul class="list-none flex flex-col py-4">
					<li
						v-for="item in menuItems"
						:key="item.title"
						class="pt-1 py-8 relative w-full">
						<router-link
							v-if="item.to"
							:to="item.to"
							class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
							<!-- Contenedor redondo para el icono -->
							<span
								class="inline-flex items-center justify-center h-12 rounded-full w-12 text-lg bg-customPurple text-white mr-2">
								<i :class="[item.icon, 'text-xl ']"></i>
							</span>
							<span class="text-left">{{ item.title }}</span>
						</router-link>

						<!-- Submenú desplegable -->
						<ul
							v-if="item.submenuOpen"
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

			<!-- Sección inferior con el avatar, nombre y email -->
			<div class="p-4 border text:sm flex-shrink-0 shadow-top">
				<div class="flex items-center justify-center">
					<Avatar
						:src="user.avatar"
						alt="User Avatar"
						class="w-12 h-12 rounded-full" />
					<div class="text-xs text-center ml-3">
						<p class="font-bold text-lg">{{ user.name }}</p>
					</div>
				</div>
				<p class="text-gray-700 text-sm">{{ user.email }}</p>

				<!-- Botón de Cerrar Sesión -->
				<div class="mt-4 text-center">
					<LogoutButton
						@click="logout"
						class="text-base !text-amarillo !font-bold py-1 px-2" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import RavIcon from "@/components/Icons/RavIcon.vue";
import Avatar from "@/components/Buttons/Avatar.vue";
import LogoutButton from "@/components/Buttons/LogoutButton.vue";
import { useRouter } from "vue-router";

const isSidebarOpen = ref(false);
const router = useRouter();

const user = ref({
	name: "Amy Elsner",
	email: "amy.elsner@example.com",
	avatar: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
});

const menuItems = ref([
	{
		title: "Dashboard",
		to: { name: "HomePage" },
		icon: "pi pi-home",
		submenuOpen: false,
		submenu: [
			{ title: "Gráficos", to: { name: "Graficos" } },
			{ title: "Reportes", to: { name: "Reportes" } },
		],
	},
	{
		title: "Registro de Actividad",
		to: { name: "RegistroActividadPage" },
		icon: "pi pi-tag",
		submenuOpen: false,
		submenu: [],
	},
	{
		title: "Ruta de Atención",
		to: { name: "BusquedaCiudadanoPage" },
		icon: "pi pi-sitemap",
		submenuOpen: false,
	},
	{
		title: "Mapa",
		to: { name: "DepartamentosPage" },
		icon: "pi pi-map",
		submenuOpen: false,
		submenu: [],
	},
	{
		title: "Cargar Archivo",

		icon: "pi pi-file-arrow-up",
		submenuOpen: false,
		submenu: [],
	},
]);

/* const toggleSidebar = () => {
	sidebarOpen.value = !sidebarOpen.value;
};*/

const toggleSubmenu = (item) => {
	item.submenuOpen = !item.submenuOpen;
};

const logout = () => {
	alert("Sesión cerrada");
};
</script>

<style scoped>
.shadow-top {
	box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1),
		0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}
@media (max-width: 768px) {
	/* Ocultar sidebar en pantallas pequeñas */
	.-translate-x-full {
		transform: translateX(-100%);
	}
	/* Mostrar sidebar en pantallas pequeñas cuando está abierto */
	.translate-x-0 {
		transform: translateX(0);
	}
}

a {
	text-decoration: none; /* Elimina subrayado en enlaces */
}
</style>
