<template>
	<div class="flex flex-col gap-5 p-4">
		<!-- Primera Sección: Contenedores con contenido e imagen -->
		<div class="flex gap-5 justify-between">
			<div
				v-for="(image, index) in imagePaths"
				:key="index"
				class="rounded-lg text-center shadow-lg w-full sm:w-1/4 md:w-1/5 my-card"
				:style="{
					backgroundImage:
						'url(' +
						image.path +
						'), linear-gradient(180deg, rgba(0, 0, 0, 0) 16%, #71277A 85.5%)',
					backgroundPosition: 'center',
					height: '287.6px',
					width: '287.6px',
					borderRadius: '10px',
					backgroundBlendMode: 'multiply',
					position: 'relative',
				}">
				<!-- Contenedor para el título y el número en la parte inferior -->
				<div
					class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
					<h4 class="font-bold text-white text-lg text-center">
						{{ image.title }}
					</h4>
					<div class="text-3xl font-semibold text-white text-center">
						<p>{{ image.count }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Segunda Sección: Gráficos -->
		<div class="grid gap-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
			<div
				class="p-4 border my-card bg-customPurple rounded-lg w-full max-w-full sm:max-w-full">
				<PieChart />
			</div>
			<div
				class="p-4 border my-card border-customPurple rounded-lg bg-white w-full !h-full max-w-full sm:max-w-full">
				<BarChart />
			</div>
		</div>

		<!-- Tercera Sección: Tabla de Datos -->
		<div
			class="p-4 border border-customPurple my-card rounded-lg bg-white overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							Departamento
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							Nombre Víctima
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							Fecha de Acercamiento
						</th>
					</tr>
				</thead>
				<tbody>
					<!-- Muestra un mensaje si no hay datos -->
					<tr v-if="!tableData && Object.keys(tableData).length === 0">
						<td colspan="3" class="p-3 text-center text-gray-500">
							No hay datos disponibles.
						</td>
					</tr>
					<!-- Rellena la tabla con los datos -->
					<tr v-for="(row, index) in tableData.data" :key="index">
						<td class="p-3 border-b">{{ row.nombre_departamento }}</td>
						<td class="p-3 border-b">{{ row.nombre_completo }}</td>
						<td class="p-3 border-b">{{ formatDate(row.fecha_hora) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
// Importar componentes
import { ref, onMounted } from "vue";
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import EnFormacion from "@/assets/images/EnFormacion.png";
import Certificados from "@/assets/images/Certificados.png";
import EnProceso from "@/assets/images/PorCertificar.png";
import Cancelados from "@/assets/images/Cancelados.svg";
import PieChart from "./PieChart.vue";
import axios from "axios";

// Datos de las imágenes estáticas y sus títulos
const imagePaths = ref([
	{
		title: "EN FORMACIÓN",
		count: "12883124",
		path: EnFormacion,
	},
	{
		title: "CERTIFICADOS",
		count: "9888112",
		path: Certificados,
	},
	{
		title: "POR CERTIFICAR",
		count: "85883161",
		path: EnProceso,
	},
	{
		title: "CANCELADOS",
		count: "99883151",
		path: Cancelados,
	},
]);

const tableData = ref([]); // Datos de la tabla inicializados vacíos
const loading = ref(false); // Indicador de carga para mostrar durante la consulta
const errorMessage = ref(null); // Almacena errores en caso de que falle la consulta
const host = import.meta.env.VITE_HOST;

const formatDate = (isoDate) => {
	const date = new Date(isoDate);
	return new Intl.DateTimeFormat("es-ES", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
};

// Hook para realizar la consulta al montar el componente
onMounted(async () => {
	tableData.value = await fetchTableData();
	console.log(Object.keys(tableData.value).length === 0);
});

// Función para obtener los datos de la API
const fetchTableData = async () => {
	loading.value = true;
	errorMessage.value = null;

	try {
		const response = await axios.get(
			`${host}:8082/api/v1/victimas/ticket/attended`
		);
		console.log(response.data);
		// Suponiendo que la respuesta contiene un array de datos

		return response.data;
	} catch (error) {
		errorMessage.value = "Error al obtener los datos. Intente nuevamente.";
		console.error("Error al obtener los datos de la API:", error);
	} finally {
		loading.value = false;
	}
};
</script>

<style scoped>
@import "@/styles/table-styles.css";

.my-card {
	transition: transform 0.3s ease-in-out;
	/* Transición de la propiedad transform con duración de 300ms */
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-card:hover {
	transform: scale(1.05);
}
</style>
