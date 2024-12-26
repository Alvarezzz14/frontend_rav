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
			<div class="flex flex-wrap items-center gap-4 relative">
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
				
				<!-- Icono y texto de Permisos reposicionado -->
				<div class="flex items-center gap-2 absolute" style="left: 35%;">
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
						<tr v-for="module in modules" :key="module.id">
							<!-- Columna del nombre del módulo con checkbox -->
							<td class="border border-gray-300 p-2">
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      class="mr-2 w-4 h-4 rounded cursor-default"
      :class="{
        'bg-emerald-500 border-emerald-500': isModuleSelected(module.id),
        'bg-white border-gray-300': !isModuleSelected(module.id)
      }"
      :checked="isModuleSelected(module.id)"
      disabled
    />
    <span>{{ module.nombre }}</span>
  </div>
</td>
							<!-- Columnas de permisos -->
							<td v-for="permiso in permisosTipos" :key="permiso.id" class="border border-gray-300 text-center">
							<input
								v-if="moduleHasPermission(module, permiso.id)"
								type="checkbox"
								@change="(event) => selectCheckBoxAndModule(event, permiso.id, module.id)"
								class="w-4 h-4 rounded accent-customPurple cursor-pointer"
							/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useToast } from 'vue-toastification';
import Rol from '@/assets/images/rol.svg';
import Button from 'primevue/button';

const authStore = useAuthStore();
const toast = useToast();
const host = import.meta.env.VITE_HOST;
const loading = ref(false);
const selectedRole = ref('');
const roles = ref([]);
const modules = ref([]);
const selectedPermissions = ref({});

const fetchRoles = async () => {
  loading.value = true;
  try {
    // Obtener token
    const token = authStore.authenticatedUser.token;
    
    const response = await axios.get(`${host}:8080/roles`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    roles.value = response.data;
    console.log('Roles cargados:', roles.value);
  } catch (error) {
    console.error('Error al cargar roles:', error);
    toast.error('Error al cargar los roles');
  } finally {
    loading.value = false;
  }
};
const fetchModules = async () => {
  loading.value = true;
  try {
    const token = authStore.authenticatedUser.token;
    const response = await axios.get(`${host}:8080/modules`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    modules.value = response.data.map(module => ({
      ...module,
      permisos: module.permisos || []
    }));
    
    initializePermissions();
  } catch (error) {
    console.error('Error al cargar módulos:', error);
    toast.error('Error al cargar los módulos');
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchRoles();
  fetchModules().then(() => {
    initializePermissions();
  });
});

const handleRoleChange = (event) => {
  selectedRole.value = event.target.value;
  console.log('Rol seleccionado:', selectedRole.value);
};
const initializePermissions = () => {
  modules.value.forEach(module => {
    selectedPermissions.value[module.id] = [];
  });
};

// Definir los tipos de permisos disponibles
const permisosTipos = [
  { id: 1, tipo: 'ver' },
  { id: 2, tipo: 'crear/editar' },
  { id: 3, tipo: 'exportar' },
  { id: 4, tipo: 'eliminar' }
];

// Funciones helper
const moduleHasPermission = (module, permisoId) => {
  return module.permisos?.some(p => p.id === permisoId) || false;
};

const isModuleSelected = (moduleId) => {
  return selectedPermissions.value[moduleId]?.length > 0;
};

// Función de selección de permisos actualizada
const selectCheckBoxAndModule = (event, permisoId, moduleId) => {
  if (!selectedPermissions.value[moduleId]) {
    selectedPermissions.value[moduleId] = [];
  }

  if (event.target.checked) {
    selectedPermissions.value[moduleId].push(permisoId);
  } else {
    selectedPermissions.value[moduleId] = selectedPermissions.value[moduleId]
      .filter(id => id !== permisoId);
  }

  // Forzar actualización reactiva
  selectedPermissions.value = { ...selectedPermissions.value };
};

// Función para construir el payload
const buildPermissionsPayload = () => {
  const modules_permissions = [];

  for (const moduleId in selectedPermissions.value) {
    if (selectedPermissions.value[moduleId].length > 0) {
      modules_permissions.push({
        modulo_id: parseInt(moduleId),
        permiso_tipo_id: selectedPermissions.value[moduleId]
      });
    }
  }

  return {
    role_id: parseInt(selectedRole.value),
    modules_permissions
  };
};

// Función modificada handleSubmit
const handleSubmit = async () => {
  if (!selectedRole.value) {
    toast.error('Por favor seleccione un rol');
    return;
  }

  loading.value = true;
  try {
    const payload = buildPermissionsPayload();
    const token = authStore.authenticatedUser.token;
    
    const response = await axios.post(
      `${host}:8080/roles/assign-permission`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    toast.success('Permisos asignados exitosamente');
    console.log('Respuesta:', response.data);
  } catch (error) {
    console.error('Error:', error);
    toast.error(error.response?.data?.error || 'Error al asignar permisos');
  } finally {
    loading.value = false;
  }
};

// Función cancelAction actualizada
const cancelAction = () => {
  selectedRole.value = '';
  selectedPermissions.value = {};
  initializePermissions();
  // Desmarcar todos los checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = false);
};

// Helper para verificar si un módulo tiene un permiso específico
const hasPermission = (modulo, codigoPermiso) => {
  return modulo.permisos.some(permiso => permiso.codigo === codigoPermiso);
};
</script>

<style scoped>
.bg-customPurple {
  background-color: #71277a;
}

.accent-customPurple {
  accent-color: #71277a;
}

/* Estilos específicos para los checkboxes */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;
}

/* Estilo para los checkboxes de permisos cuando están marcados */
input[type="checkbox"]:not(:disabled):checked {
  background-color: #71277a;
  border-color: #71277a;
}

/* Estilo para el checkbox del módulo cuando está marcado y deshabilitado */
input[type="checkbox"]:disabled:checked {
  background-color: #10b981 !important; /* Verde esmeralda */
  border-color: #10b981 !important;
  opacity: 1 !important;
}

/* Agregar marca de verificación */
input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>