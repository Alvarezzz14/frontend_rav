<template>
	<div>
		<!-- Sección superior: Icono y título -->
		<div class="flex flex-col sm:flex-row items-center sm:justify-between p-4">
			<div
				class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl">
				<!-- Icono y Título -->
				<div class="flex items-center -mb-8">
					<div class="p-5 bg-customPurple rounded-full mb-5">
						<img
							:src="Rol"
							alt="Icono de Roles y Permisos"
							width="50"
							height="50" />
					</div>
					<div class="ml-3 text-center md:text-left">
						<p class="text-black mb-0 text-6xl md:text-2xl">Roles y</p>
						<h2 class="text-customPurple text-5xl md:text-5xl mt-0 font-bold">
							Permisos
						</h2>
					</div>
				</div>
			</div>
		</div>

		<!-- Contenedores principales -->
		<div class="mt-4 bg-white rounded-lg md:w-auto sm:w-auto lg:w-auto xl:w-auto xxl:w-auto shadow p-4 space-y-6">
			<!-- Primer contenedor -->
			<div class="flex flex-wrap items-center gap-4">
				<!-- Icono y texto de Roles -->
				<div class="flex items-center gap-40">
					<!-- Icono y texto de Roles -->
					<div class="flex items-center gap-2">
						<div class="p-2 bg-customPurple rounded-full">
							<img
								src="@/assets/images/rol1.svg"
								alt="Roles Icon"
								class="w-8 h-8" />
						</div>
						<span class="font-bold text-black">ROLES</span>
					</div>

					<!-- Contenedor de los campos input y select -->
					<div class="flex flex-wrap gap-4 md:w-auto sm:w-auto lg:w-auto xl:w-auto xxl:w-auto text-right">
						<!-- Campo de input -->
						<input
							type="text"
							placeholder="Escribe un rol"
							class="border rounded-md p-2 md:w-auto sm:w-auto lg:w-auto xl:w-auto xxl:w-auto focus:outline-none focus:ring" />

						<!-- Campo de select -->
						<select
							v-model="selectedRole"
							class="border rounded-md p-2 md:w-auto sm:w-auto lg:w-auto xl:w-auto xxl:w-auto focus:outline-none focus:ring">
							<option value="" disabled>Seleccione el Rol</option>
							<option v-for="role in roles" :key="role.id" :value="role.id">
								{{ role.nombre }}
							</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Segundo contenedor -->
			<div class="flex flex-wrap items-center gap-4">
				<!-- Icono y texto de Módulos -->
				<div class="flex items-center gap-2">
					<div class="p-2 md:w-auto sm:w-auto lg:w-auto xl:w-auto xxl:w-auto bg-customPurple rounded-full">
						<img
							src="@/assets/images/rol.svg"
							alt="Modules Icon"
							class="w-8 h-8" />
					</div>
					<span class="font-bold text-black">MODULOS</span>
				</div>
				<!-- Icono y texto de Permisos -->
				<div class="flex items-center gap-2">
					<div class="p-2 bg-customPurple rounded-full">
						<img
							src="@/assets/images/rol1.svg"
							alt="Permissions Icon"
							class="w-8 h-8" />
					</div>
					<span class="font-bold text-black">PERMISOS</span>
				</div>
				<!-- Botones -->
				<div class="flex gap-4 ml-auto">
					<Button
						type="button"
						label="Cancelar"
						:loading="loading"
						class="mt-3 w-50 h-10 text-base !hover:bg-yellow-600 !border-none !bg-customPurple !text-amarillo"
						@click="cancelAction" />

					<Button
						type="button"
						label="Guardar"
						:loading="loading"
						class="mt-3 w-50 h-10 text-base !hover:bg-purple-600 !border-none !bg-customPurple !text-amarillo"
						@click="handleSubmit" />
				</div>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full border-collapse">
					<thead>
						<tr class="bg-customPurple text-white">
							<th class="border border-gray-300 p-2 text-left">
								<div class="flex items-center gap-2">
									<img
										src="@/assets/images/nombrerol.svg"
										alt="Module Icon"
										class="w-4 h-4" />
									NOMBRE DEL MODULO
								</div>
							</th>
							<th class="border border-gray-300 p-2">
								<div class="flex items-center gap-2">
									<img
										src="@/assets/images/verol.svg"
										alt="Module Icon"
										class="w-4 h-4" />
									VER
								</div>
							</th>
							<th class="border border-gray-300 p-2">
								<div class="flex items-center gap-2">
									<img
										src="@/assets/images/crearrol.svg"
										alt="Module Icon"
										class="w-4 h-4" />
									CREAR / EDITAR
								</div>
							</th>
							<th class="border border-gray-300 p-2">
								<div class="flex items-center gap-2">
									<img
										src="@/assets/images/exportarrol.svg"
										alt="Module Icon"
										class="w-4 h-4" />
									EXPORTAR
								</div>
							</th>
							<th class="border border-gray-300 p-2">
								<div class="flex items-center gap-2">
									<img
										src="@/assets/images/eliminarrol.svg"
										alt="Module Icon"
										class="w-4 h-4" />
									ELIMINAR
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(module, index) in modules" :key="index">
							<td class="border border-gray-300 p-2">
								<div class="flex items-center gap-2">
									<input
										type="checkbox"
										class="mr-2"
										v-model="module.selected" />
									<span>{{ module.nombre }}</span>
								</div>
							</td>
							<td
								v-for="(permiso, index) in module.permisos"
								class="border border-gray-300 text-center"
								:key="index">
								<input
									type="checkbox"
									@change="
										(event) =>
											selectCheckBoxAndModule(event, permiso.id, module.id)
									"
									checked />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Rol from "@/assets/images/rol.svg";
import Rol1 from "@/assets/images/verol.svg";
import Rol2 from "@/assets/images/crearrol.svg";
import Rol3 from "@/assets/images/exportarrol.svg";
import Rol4 from "@/assets/images/eliminarrol.svg";
import FetchService from "../services/fetchService";
import { useAuthStore } from "../stores/auth";

const selectedRole = ref("");
const fetchService = new FetchService();
const modules = ref([]);
const roles = ref([]);
const authstore = useAuthStore();
let selectedPermissions = {};

const host = import.meta.env.VITE_HOST;

const selectCheckBoxAndModule = (event, permission_id, module_id) => {
	const checked = event.target.checked;
	console.log("LInea 222");

	if (checked) {
		if (!selectedPermissions[module_id]) {
			selectedPermissions[module_id] = new Set();
		}
		selectedPermissions[module_id].add(permission_id);
	} else {
		if (selectedPermissions[module_id]?.has(permission_id)) {
			selectedPermissions[module_id].delete(permission_id);

			// Verificar inmediatamente después de eliminar
			console.log("Size after delete:", selectedPermissions[module_id].size);

			if (selectedPermissions[module_id].size === 0) {
				console.log("Deleting module", module_id);
				delete selectedPermissions[module_id];
			}
		}
	}

	console.log("Current state:", selectedPermissions);
};

const selectedCheckBoxAndModule = (modules) => {
	for (let module of modules) {
		for (let permission of module["permisos"]) {
			selectCheckBoxAndModule(
				{
					target: {
						checked: true,
					},
				},
				permission.id,
				module.id
			);
		}
	}
};

const cancelAction = () => {
	alert("Acción cancelada");
};

const saveAction = () => {
	alert("Cambios guardados");
};

const handleSubmit = async () => {
	const body = {
		role_id: selectedRole.value, // ID del rol seleccionado
		modules_permissions: Object.keys(selectedPermissions).map((moduleId) => {
			return {
				modulo_id: parseInt(moduleId), // Convertir la llave a número
				permiso_tipo_id: Array.from(selectedPermissions[moduleId]), // Convertir Set a Array
			};
		}),
	};

	await fetchService.post(`${host}:8080/roles/assign-permission`, {
		fetchOptions: {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authstore.getAuthenticatedUser().token}`,
			},
			body: JSON.stringify(body),
		},
		success: (response) => console.log(response),
		error: (response) => console.log(response),
	});

	console.log(body);
};

const getData = async () => {
	await fetchService.get(`${host}:8080/modules`, {
		fetchOptions: {
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${authstore.getAuthenticatedUser().token}`,
			},
		},
		success: (response) => {
			modules.value = response;
			console.log(modules.value);
		},
		error: (response) => console.log(response),
	});

	await fetchService.get(`${host}:8080/roles`, {
		fetchOptions: {
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${authstore.getAuthenticatedUser().token}`,
			},
		},
		success: (response) => {
			roles.value = response;
			console.log(roles.value);
		},
		error: (response) => console.log(response),
	});
};

onMounted(async () => {
	console.log("ACA ESTA EL CONSOLE LOG");
	await getData();
	selectedCheckBoxAndModule(modules.value);
	console.log(selectedPermissions);
});
</script>

<style scoped>
/* Estilos adicionales */
.bg-customPurple {
	background-color: #71277a; /* Color púrpura personalizado */
}

.bg-customYellow {
	background-color: #fdc300; /* Color amarillo personalizado */
}
</style>
