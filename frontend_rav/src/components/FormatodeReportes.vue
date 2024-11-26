<template>
	<div class="min-h-screen p-4 flex flex-col items-center justify-center">
		<!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
		<div
			class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-10 -mt-16 ">
			<!-- Icono y Título -->
			<div class="flex items-center mb-4 md:mb-0">
				<div class="p-6 bg-azulBarraApe rounded-full">
					<!-- Icono SVG -->
					<img
						:src="Reportes"
						alt=" Icono de Reportes"
						width="50"
						height="50" />
				</div>
				<div class="ml-4 text-center md:text-left">
					<p class="text-black mb-0 text-2xl md:text-3xl">Formato de</p>
					<h2 class="text-azulBarraApe text-5xl md:text-6xl mt-0 font-bold">
						Reportes
					</h2>
				</div>
			</div>
		</div>

		<!-- Sección Central (Imagen y Formulario) -->
		<div
			class="flex flex-col xl:flex-row items-center xl:items-start justify-center w-full max-w-7xl space-y-8 xl:space-y-0 xl:space-x-8">
			
			

			<!-- Formulario Izquierdo -->
			<div
				class="flex-1 max-w-md lg:max-w-lg p-3 bg-white rounded-lg shadow-md w-full">
				<label class="block text-black text-sm font-bold mb-2"
						>Seleccione El Tipo De Reporte.</label
				   		Opciones de rol -->
				   <div class="inline-block space-x-4">
            <div class="radio-button">
              <input type="radio" id="admin" name="role" value="Administrador" class="custom-radio" v-model="selectedRole" />
              <label for="admin">Orientados</label>

              <input type="radio" id="funcionario" name="role" value="Funcionario" class="custom-radio" v-model="selectedRole" />
              <label for="funcionario">Colocados</label>

              <input type="radio" id="operario" name="role" value="Operario" class="custom-radio" v-model="selectedRole" />
              <label for="operario">Incritos</label>
            </div>
          </div>''
				<!-- Selección de Formato -->
				<div class="mb-4">
					<!--<label class="block text-gray-700 text-sm font-semibold mb-2"
						>Seleccione el formato en el cual desea descargar el archivo.</label
					>
					<div class="space-y-2">
						<label
							class="block p-4 rounded-lg shadow-sm border cursor-pointer transition-all duration-300"
							:class="{
								'bg-azulBarraApe text-white font-bold':
									selectedFormat === 'pdf',
								'bg-gray-100': selectedFormat !== 'pdf',
							}"
							@click="selectFormat('pdf')">
							PDF
						</label>
						<label
							class="block p-4 rounded-lg shadow-sm border cursor-pointer transition-all duration-300"
							:class="{
								'bg-azulBarraApe text-white font-bold':
									selectedFormat === 'excel',
								'bg-gray-100': selectedFormat !== 'excel',
							}"
							@click="selectFormat('excel')">
							EXCEL
						</label>
					</div>-->
				</div>

				<!-- Selección de Departamento -->
<div class="mb-4">
  <div class="grid grid-wrap gap-4 p-2">
    <!-- Select -->
    <select v-model="selectedDepartamento"  placeholder="Seleccione departamento"
      class="block p-4 rounded-lg focus:outline-none focus:ring-2 font-bold border cursor-pointer text-negro h-12"
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
							class="w-1/2 p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-azulBarraApe"
							placeholder="Desde" />
						<input
							type="date"
							class="w-1/2 p-2 border rounded text-negro bg-gray-50 focus:outline-none focus:ring-2 focus:ring-azulBarraApe"
							placeholder="Hasta" />
					</div>
				</div>

				<!-- Botón de Búsqueda -->

				<button
					class="w-full bg-azulBarraApe text-lg cursor-pointer border-none text-amarillo font-bold py-2 rounded-lg shadow-md mt-4"
					@click="handleDownloadExcel">
					Generar Reporte
				</button>
			</div>
			<!-- Imagen a la Izquierda -->
			<div class="">
				<img
					:src="PersonaReportes"
					alt="Persona sonriendo"
					class=" h-fit w-min -mt-40 " />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Reportes from "@/assets/images/Reportes.svg";
import VerLine from "@/assets/images/VerLine.svg";
import PersonaReportes from "@/assets/images/PersonaReportes.svg";

const selectedFormat = ref("");
const selectedFilter = ref("");

function selectFormat(format) {
	selectedFormat.value = format;
}

function handleDownloadExcel() {
	const link = document.createElement("a");
	link.href = "/files/reporte.xlsx";
	link.download = "reporte.xlsx";
	link.click();
}

const departamentos = ref([
	{ name: "Amazonas", code: "91" },
	{ name: "Antioquia", code: "05" },
	{ name: "Arauca", code: "81" },
	{ name: "Atlantico", code: "08" },
	{ name: "Bolivar", code: "13" },
	{ name: "Boyacá", code: "15" },
	{ name: "Caldas", code: "17" },
	{ name: "Caquetá", code: "18" },
	{ name: "Casanare", code: "85" },
	{ name: "Cauca", code: "19" },
	{ name: "Cesar", code: "20" },
	{ name: "Chocó", code: "27" },
	{ name: "Cundinamarca", code: "25" },
	{ name: "Cordoba", code: "23" },
	{ name: "Guainia", code: "94" },
	{ name: "Guaviare", code: "95" },
	{ name: "Huila", code: "41" },
	{ name: "La Guajira", code: "44" },
	{ name: "Magdalena", code: "47" },
	{ name: "Meta", code: "50" },
	{ name: "Nariño", code: "52" },
	{ name: "Norte de Santander", code: "54" },
	{ name: "Putumayo", code: "86" },
	{ name: "Quindio", code: "63" },
	{ name: "Risaralda", code: "66" },
	{ name: "San Andres, Providencia y Santa Catalina", code: "88" },
	{ name: "Santander", code: "68" },
	{ name: "Sucre", code: "70" },
	{ name: "Tolima", code: "73" },
	{ name: "Valle del Cauca", code: "76" },
	{ name: "Vaupés", code: "97" },
	{ name: "Vichada", code: "99" },
]);
</script>

<style scoped>
/* Estilo para radio buttons personalizados */
.radio-button input[type="radio"].custom-radio {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #315CA0; /* Color morado del borde */
  border-radius: 50%;
  margin-right: 0.5rem;
  outline: none;
  cursor: pointer;
}

.radio-button input[type="radio"].custom-radio:checked {
  background-color: #315CA0; /* Fondo morado al seleccionar */
  border-color: #315CA0; /* Asegura que el borde sea morado al seleccionarse */
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

