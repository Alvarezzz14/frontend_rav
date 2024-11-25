<template>
	<div class="min-h-screen p-4 flex flex-col justify-center">
		<!-- Sección Superior (Título, Icono, Información del Ciudadano) -->	
		<div
			class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-1">
			<!-- Icono y Título -->
			<div class="flex items-center mb-4 md:mb-0">
				<div class="p-6 bg-customPurple rounded-full">
					<!-- Icono SVG -->
					<img
						:src="Reportes"
						alt=" Icono de Reportes"
						width="50"
						height="50" />
				</div>
				<div class="ml-4 text-center md:text-left">
					<p class="text-black mb-0 text-2xl md:text-3xl">Formato de</p>
					<h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">
						Reportes
					</h2>
				</div>
			</div>
		</div>

		<!-- Sección Central (Imagen y Formulario) -->
		<div
			class="flex flex-col xl:flex-row xl:items-start justify-center w-full max-w-7xl space-y-8 xl:space-y-0 xl:space-x-8">
			<!-- Imagen a la Izquierda -->
			<div class="flex-1 max-w-md lg:max-w-lg p-4">
				<img
					:src="PersonaReportes"
					alt="Persona sonriendo"
					class="rounded-lg object-cover w-full h-full max-h-96 xl:max-h-full" />
			</div>

			<!-- Formulario a la Derecha -->
			<div
				class="flex-1 max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-md w-full">
				<center><h3>GENERAR REPORTES</h3></center>
				<!-- Selección de Formato -->
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-semibold mb-2"
						>Seleccione el formato en el cual desea descargar el archivo.</label
					>

					<br>

					<div class="radio-button">
						<input type="radio" id="admin" name="role" value="Administrador" class="custom-radio" v-model="selectedRole" />
						<label for="admin">Historial de Usuarios</label>

						<input type="radio" id="funcionario" name="role" value="Funcionario" class="custom-radio" v-model="selectedRole" />
						<label for="funcionario">Estadísticas del Ciudadano</label>

						<input type="radio" id="operario" name="role" value="Operario" class="custom-radio" v-model="selectedRole" />
						<label for="operario">Listar Usuarios</label>
					</div>

					<br>

					<div class="space-y-2">
						<label
							class="block p-4 rounded-lg shadow-sm border cursor-pointer transition-all duration-300"
							:class="{
								'bg-customPurple text-white font-bold':
									selectedFormat === 'pdf',
								'bg-gray-100': selectedFormat !== 'pdf',
							}"
							@click="selectFormat('pdf')">
							PDF
						</label>
						<label
							class="block p-4 rounded-lg shadow-sm border cursor-pointer transition-all duration-300"
							:class="{
								'bg-customPurple text-white font-bold':
									selectedFormat === 'excel',
								'bg-gray-100': selectedFormat !== 'excel',
							}"
							@click="selectFormat('excel')">
							EXCEL
						</label>
					</div>
				</div>

				<!-- Selección de Departamento -->
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-semibold mb-2"
						>Seleccione Departamento</label
					>
					<div class="flex flex-wrap gap-4">
						<select
							v-model="selectedDepartamento"
							class="block p-4 rounded-lg focus:outline-none focus:ring-2 font-bold border cursor-pointer text-negro h-12 border-none"
							id="departamento">
							<option disabled value="">Seleccione Departamento</option>
							<option
								v-for="departamento in departamentos"
								:key="departamento.code"
								:value="departamento.code">
								{{ departamento.name }}
							</option>
						</select>
					</div>
				</div>

				<!-- Selección de Fechas -->
				<div class="mb-4">
					<label class="block text-negro text-sm font-semibold mb-2"
						>Seleccione el rango de fechas.</label
					>
					<div class="flex items-center space-x-4">
						<input
							type="date"
							class="w-1/2 p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple"
							placeholder="Desde" />
						<input
							type="date"
							class="w-1/2 p-2 border rounded text-negro bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple"
							placeholder="Hasta" />
					</div>
				</div>

				<!-- Botón de Búsqueda -->
				<button
					class="w-full bg-customPurple text-lg cursor-pointer border-none text-amarillo font-bold py-2 rounded-lg shadow-md mt-4"
					:disabled="loading"
					@click="handleDownloadExcel"
					>
					<span v-if="!loading">Generar Reporte</span>
					<span v-else>Generando...</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Reportes from "@/assets/images/Reportes.svg";
import PersonaReportes from "@/assets/images/PersonaReportes.svg";

const selectedFormat = ref("");
const selectedRole = ref("");
const selectedDepartamento = ref("");
const dateRange = ref({ from: "", to: "" });
const departamentos = ref([
	{ name: "Amazonas", code: "91" },
	{ name: "Antioquia", code: "05" },
]);
const loading = ref(false);

function selectFormat(format) {
  selectedFormat.value = format;
}

function validateInputs() {
  if (!selectedRole.value || !selectedFormat.value || !selectedDepartamento.value) {
    alert("Por favor, complete todos los campos.");
    return false;
  }
  if (!dateRange.value.from || !dateRange.value.to) {
    alert("Por favor, seleccione un rango de fechas.");
    return false;
  }
  return true;
}

function getEndpoint() {
  const endpoints = {
    Administrador: "/api/reports/user-history",
    Funcionario: "/api/reports/ticket-stats",
    Operario: "/api/reports/user-list",
  };
  return endpoints[selectedRole.value];
}

async function handleDownloadExcel() {
  if (!validateInputs()) return;

  loading.value = true;
  const endpoint = getEndpoint();
  const payload = {
    departamento: selectedDepartamento.value,
    dateRange: dateRange.value,
  };

  try {
    const response = await axios.post(endpoint, payload, {
      responseType: "blob",
    });

    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileExtension = selectedFormat.value === "pdf" ? "pdf" : "xlsx";
    const fileName = `${selectedRole.value.toLowerCase()}_${new Date().toISOString()}.${fileExtension}`;

    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.setAttribute("download", fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  } catch (error) {
    console.error("Error al generar el reporte:", error);
  } finally {
    loading.value = false;
  }
}
</script>


<style scoped>
/* Estilo para radio buttons personalizados */
.radio-button input[type="radio"].custom-radio {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #71277A; /* Color morado del borde */
  border-radius: 50%;
  margin-right: 0.5rem;
  outline: none;
  cursor: pointer;
}

.radio-button input[type="radio"].custom-radio:checked {
  background-color: #71277A; /* Fondo morado al seleccionar */
  border-color: #71277A; /* Asegura que el borde sea morado al seleccionarse */
}

.radio-button label {
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  color: #333; /* Color del texto */
}

.radio-button input[type="radio"].custom-radio:checked + label {
  color: #080808; /* Color del texto cuando se selecciona */
  font-weight: 00;
}
</style>

