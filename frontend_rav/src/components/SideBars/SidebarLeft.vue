<template>
	<div class="overflow-auto bg-white">
		<!-- Barra lateral izquierda -->
		<div>
			<!-- Ícono centrado -->
			<div class="py-8 hidden lg:flex items-center h-auto justify-center">
				<RavIcon class="" />
			</div>

			<!-- Menu de navegación -->
			<nav>
				<ul class="list-none flex flex-col px-0">
					<li
						v-for="item in menuItems"
						:key="item.title"
						class="py-2 md:py-5 relative w-full">
						<router-link
							v-if="item.to"
							:to="item.to"
							@click="setActive(item)"
							:class="[
								'flex flex-row h-16 items-center transform text-black transition-colors duration-200',
								isActive(item) ? 'bg-customPurple text-amarillo' : '',
							]">
							<span
								class="inline-flex items-center justify-center h-6 md:h-9 lg:h-12 w-6 md:w-9 lg:w-12 text-lg mr-2 transition-colors duration-200"
								:class="{
									'text-GrisIconosDash': !isActive(item),
									'text-amarillo': isActive(item),
								}">
								<img
									:src="item.icon"
									:alt="`Icono de ${item.title}`"
									:class="{
										'text-amarillo': isActive(item),
										'text-GrisIconosDash': !isActive(item),
									}" />
							</span>
							<span
								class="text-left sm:text-md md:text-base lg:text-lg font-sm transition-colors duration-200"
								:class="{ 'text-amarillo': isActive(item) }"
								>{{ item.title }}</span
							>
						</router-link>
					</li>
					<li class="block lg:hidden">
						<span
							class="inline-flex items-center justify-center h-6 md:h-9 lg:h-12 w-6 md:w-9 lg:w-12 text-lg text-GrisIconosDash mr-2">
							<i class="pi pi-sign-out"></i>
						</span>
						<span
							class="text-left text-black sm:text-md md:text-base lg:text-lg font-sm"
							>Cerrar Sesión</span
						>
					</li>
				</ul>
				<!-- Sección inferior con el avatar, nombre y email -->
				<div class="hidden lg:block p-4 border text:sm flex-shrink-0">
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
			</nav>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import RavIcon from "@/components/Icons/RavIcon.vue";
import Avatar from "@/components/Buttons/Avatar.vue";
import LogoutButton from "@/components/Buttons/LogoutButton.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const isSidebarOpen = ref(false);
const router = useRouter();
const toast = useToast();

const user = ref({
	name: "Amy Elsner",
	email: "amy.elsner@example.com",
	avatar: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
});

const menuItems = ref([
	{
		title: "Inicio",
		to: { name: "HomePage" },
		icon: new URL("@/assets/iconosDash/dash.svg", import.meta.url).href,
		submenuOpen: false,
		submenu: [],
	},
	{
		title: "Búsqueda del Ciudadano",
		to: { name: "RegistroActividadPage" },
		icon: new URL("@/assets/iconosDash/buscar.svg", import.meta.url).href,
		submenuOpen: true,
		submenu: [
			{
				title: "Registro de Actividad",
				to: { name: "RegistroActividadPage" },
				icon: new URL("@/assets/iconosDash/ticket.svg", import.meta.url).href,
				submenuOpen: false,
			},
			{
				title: "Perfil del Ciudadano",
				to: { name: "PerfilUsuarioPage" },
				icon: new URL("@/assets/iconosDash/perfil.svg", import.meta.url).href,
				submenuOpen: false,
			},
			{
				title: "Ruta de Atención",
				to: { name: "RutaacionPage" },
				icon: new URL("@/assets/iconosDash/rutaAt.svg", import.meta.url).href,
				submenuOpen: false,
			},
			{
				title: "Linea de Tiempo",
				to: { name: "LineaTiempoNuevaPage" },
				icon: new URL("@/assets/iconosDash/lineaT.svg", import.meta.url).href,
				submenuOpen: false,
			},
		],
	},

	{
		title: "Mapa",
		to: { name: "DepartamentosPage" },
		icon: new URL("@/assets/iconosDash/mapa.svg", import.meta.url).href,
		submenuOpen: false,
		submenu: [],
	},
	{
		title: "Cargar Archivo",
		to: { name: "SubirFicheroPage" },
		icon: new URL("@/assets/iconosDash/subir.svg", import.meta.url).href,
		submenuOpen: false,
		submenu: [],
	},
	{
		title: "Generar Reportes",
		to: { name: "FormatodeReportesPage" },
		icon: new URL("@/assets/iconosDash/reporte.svg", import.meta.url).href,
		submenuOpen: false,
		submenu: [],
	},
]);

const activeItem = ref(null);

//Metodos par estabelecer el elemento activo del Dashboard
const setActive = (item) => {
	activeItem.value = item.title;
};

//Computed para verificar si un elemento esta activo
const isActive = (item) => {
	return activeItem.value == item.title;
};

const hasShownNoSessionToast = ref(false);

const logout = async () => {
	// Verificar si hay un token en el localStorage
	const token = localStorage.getItem("token");

	if (!token) {
		// Si no hay token y el mensaje azul no se ha mostrado, mostrarlo una vez
		if (!hasShownNoSessionToast.value) {
			toast.info("No hay sesión activa.");
			hasShownNoSessionToast.value = true;
		}
		router.push({ name: "LoginPage" });
		return;
	}

	try {
		// Configurar la petición con el token
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		// Hacer la petición de logout
		await axios.post("http://localhost:8080/api/auth/logout", {}, config);

		// Limpiar el token
		localStorage.removeItem("token");
		hasShownNoSessionToast.value = false; // Resetear el flag después de cerrar sesión

		// Mostrar mensaje de éxito
		toast.success("Sesión cerrada con éxito.");

		// Redirigir al login
		router.push({ name: "LoginPage" });
	} catch (error) {
		console.error("Error al cerrar sesión:", error);
		// Si ocurre un error en el logout, solo limpiar el token y redirigir al login sin mostrar otro mensaje
		localStorage.removeItem("token");
		router.push({ name: "LoginPage" });
	}
};
</script>

<style scoped>
a {
	text-decoration: none; /* Elimina subrayado en enlaces */
}
</style>
