<template>
	<div class="flex flex-col gap-5 p-4 w-full max-w-full overflow-hidden">
		<!-- Primera Sección: Contenedores con contenido e imagen -->
		<div class="flex gap-5 justify-between flex-wrap">
			<div
				v-for="(image, index) in imagePaths"
				:key="index"
				class="rounded-lg text-center shadow-lg my-card flex-shrink-0"
				:style="{
					backgroundImage:
						'url(' +
						image.path +
						'), linear-gradient(180deg, rgba(0, 0, 0, 0) 16%, #71277A 85.5%)',
					backgroundPosition: 'center',
					height: '287.6px',
					width: '287.6px',
					maxWidth: 'calc(25% - 15px)',
					minWidth: '200px',
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
			class="border my-card rounded-lg w-full max-w-full sm:max-w-full"
			style="background: linear-gradient(180deg, #d160de 0%, #71277a 100%); height: 349px;">
			<PieChart />
		</div>
		<div
			class="border my-card rounded-lg w-full max-w-full sm:max-w-full"
			style="background: linear-gradient(180deg, #71277a 0%, #3d1640 100%); height: 349px;">
			<BarChart />
		</div>
	</div>		<!-- Tercera Sección: Tabla de Datos -->
		<div class="border-0 table-card rounded-lg overflow-hidden p-2.5" style="background: rgba(0, 0, 0, 0.2);">
			<div class="overflow-x-auto">
				<table class="w-full" style="border-collapse: separate; border-spacing: 8px;">
					<thead>
						<tr style="background: #71277A;">
							<th class="p-4 text-left text-white font-['Work_Sans'] font-bold text-[16px] uppercase">
								<div class="flex items-center gap-2">
									<LocationIcon :size="20" :height="15" class-name="text-white" />
									Departamento
								</div>
							</th>
							<th class="p-4 text-left text-white font-['Work_Sans'] font-bold text-[16px] uppercase">
								<div class="flex items-center gap-2">
									<UserIcon :size="12" :height="16" class-name="text-white" />
									Nombre
								</div>
							</th>
							<th class="p-4 text-left text-white font-['Work_Sans'] font-bold text-[16px] uppercase">
								Estado Actual
							</th>
						</tr>
					</thead>
					<tbody>
						<!-- Muestra un mensaje si no hay datos -->
						<tr v-if="displayTableData.length === 0">
							<td colspan="3" class="p-6 text-center text-white font-['Work_Sans']">
								No hay datos disponibles.
							</td>
						</tr>
						<!-- Rellena la tabla con los datos -->
						<tr 
							v-for="(row, index) in displayTableData" 
							:key="index"
							style="background: rgba(142, 80, 150, 0.4);">
							<td class="p-4 font-['Work_Sans'] text-[14px] text-white">
								{{ row.departamento }}
							</td>
							<td class="p-4 font-['Work_Sans'] text-[14px] text-white">
								{{ row.nombre }}
							</td>
							<td class="p-4">
								<div class="flex items-center gap-2">
									
									<span class="font-['Work_Sans'] text-[14px] text-white">
										{{ row.estado }}
									</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
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
import LocationIcon from "@/components/Icons/LocationIcon.vue";
import UserIcon from "@/components/Icons/UserIcon.vue";
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

// Data dummy para desarrollo de la tabla (comentar cuando se integre con backend)
const dummyTableData = [
	{ departamento: "Norte de Santander", nombre: "Descripción del evento: citación a audiencia para Robert Johnson.", estado: "Lorem Ipsum" },
	{ departamento: "Norte de Santander", nombre: "Descripción del evento: citación a audiencia para Robert Johnson.", estado: "Lorem Ipsum" },
];

const tableData = ref([]); // Datos de la tabla inicializados vacíos
const loading = ref(false); // Indicador de carga para mostrar durante la consulta
const errorMessage = ref(null); // Almacena errores en caso de que falle la consulta
const host = import.meta.env.VITE_HOST;

// Computed para mostrar datos (dummy o reales)
const displayTableData = ref(dummyTableData); // Usar dummy data por defecto

const formatDate = (isoDate) => {
	const date = new Date(isoDate);
	return new Intl.DateTimeFormat("es-ES", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
};

// Función para obtener el icono según el estado
const getEstadoIcon = (estado) => {
	// Por ahora retorna un ícono genérico, puedes personalizarlo según el estado
	// Puedes importar diferentes íconos según el estado
	return Cancelados; // Placeholder, ajustar según necesidad
};

// Hook para realizar la consulta al montar el componente
onMounted(async () => {
	// Descomentar cuando se integre con backend
	// tableData.value = await fetchTableData();
	// if (tableData.value && tableData.value.data) {
	//   displayTableData.value = tableData.value.data.map(row => ({
	//     departamento: row.nombre_departamento,
	//     nombre: row.nombre_completo,
	//     estado: row.estado || "Lorem Ipsum"
	//   }));
	// }
	console.log("Usando datos dummy para la tabla");
});

// Función para obtener los datos de la API
const fetchTableData = async () => {
	loading.value = true;
	errorMessage.value = null;

	try {
		/* DESCOMENTAR CUANDO SE INTEGRE CON EL BACKEND:
		const response = await axios.get(
			`${host}:8082/api/v1/victimas/ticket/attended`
		);
		console.log(response.data);
		return response.data;
		*/
		
		// Por ahora retorna datos dummy
		return { data: dummyTableData };
	} catch (error) {
		errorMessage.value = "Error al obtener los datos. Intente nuevamente.";
		console.error("Error al obtener los datos de la API:", error);
		return { data: [] };
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

.table-card {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
