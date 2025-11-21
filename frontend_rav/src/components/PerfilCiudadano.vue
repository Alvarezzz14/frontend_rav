<template>
	<div class="md:p-6 border-none rounded-lg h-auto">
		<!-- Sección superior: Título e Icono -->
		<div class="flex flex-col items-start justify-center mb-6">
			<div class="flex items-center">
				<div class="p-2 text-center bg-azul-gradian rounded-full w-8 h-8">
					<!-- Icono SVG -->
					<Person />
				</div>
				<div class="ml-3 text-center lg:text-left">
					<h2 class="text-azul2Ape text-xl md:text-3xl">{{  screenSize == "mobile"  ? "Ruta de atención al ciudadano" : "Perfil del ciudadano" }}</h2>
				</div>
			</div>
			<!-- Botones de Acción -->
			<div class="flex flex-wrap gap-4 mt-4 justify-center">

				<ButtonLink link="RutaAtencionPage" textContent="Ver Ruta de Atención" :icon="CarePathway" />
				<ButtonLink link="RegistroActividadPage" textContent="Registrar Actividad" :icon="TicketRounded" />

			</div>
		</div>

		<!-- Información personal del ciudadano -->
		<div class="flex flex-col lg:flex-row bg-white p-4 rounded-card shadow-lg xl:gap-8 mb-0">
			<!-- Primera columna -->
			<div class="flex-1 text-sm">
				<div class="flex items-center">
					<label class="text-black font-bold">TIPO DE DOCUMENTO:</label>
					<p class="text-black ml-2">
						{{ formatData(userInfo.tipo_documento) }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">NOMBRES:</label>
					<p class="text-black ml-2">
						{{ formatData(userInfo.nombre) }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">APELLIDOS:</label>
					<p class="text-black ml-2">
						{{ formatData(userInfo.apellido) }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">UBICACIÓN:</label>
					<p class="text-black ml-2">{{ formatData(userInfo.ciudad) }}</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">PROVIENE DE SOFIA:</label>
					<p class="text-black ml-2">{{ formatData(userInfo.provSofia) }}</p>
				</div>


			</div>

			<!-- Segunda columna -->
			<div class="flex-1 text-sm">
				<div class="flex items-center">
					<label class="text-black font-bold">NÚMERO DE DOCUMENTO:</label>
					<p class="text-black ml-2">
						{{ formatData(userInfo.documento) }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">PROCEDENCIA ÉTNICA:</label>
					<p class="text-black ml-2">
						{{ formatData(userInfo.pertenenciaetnica) }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">ID HOGAR:</label>
					<p class="text-black ml-2">
						{{ formatData(userInfo.id_hogar) }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">NÚMERO DE CONTACTO:</label>
					<p class="text-black ml-2">
						{{ formatData(userInfo.numtelefonocelular) }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-bold">PROVIENE DE RUV:</label>
					<p class="text-black ml-2">{{ formatData(userInfo.provRuv) }}</p>
				</div>
			</div>
		</div>

		<!-- Título del historial -->
		<div class="flex items-center gap-3 max-xl:my-4">
			<div class="w-8 h-8 text-center py-1 pr-0.5 rounded-full bg-azul-gradian">
				<History />
			</div>
			<h3 class="xl:text-3xl font-bold text-azul2Ape">Historial del ciudadano</h3>
		</div>

		<!-- Historial del Ciudadano -->
		<div class="text-white rounded-[20px] shadow-md xl:-mt-2">
			<!-- Contenedor de la tabla con scroll horizontal -->
			<div class="overflow-x-auto bg-white p-2 xl:p-5 rounded-[20px]">
				<table class="min-w-full text-gray-900">
					<thead>
						<tr
							class="bg-gray-200 [&_th]:bg-azul-gradian [&_th]:rounded-lg [&_th]:px-2 [&_th]:text-left [&_th]:md:py-2 [&_th]:border [&_th]:text-xs [&_th]:md:text-base [&_div]:flex [&_div]:items-center [&_div]:gap-2">
							<th>
								<div>
									<CalendarRounded/>
									Ficha
								</div>
							</th>
							<th>
								<div class="w-48 xl:w-full">
									<CoursesRounded />
									Curso / Certificado
								</div>
							</th>
							<th>
								<div>
									<StatusRounded />
									Estado
								</div>
							</th>
							<th>
								<div>
									<TypeRounded />
									Tipo
								</div>
							</th>
							<th>
								<div>
									<ModalityRounded />
									Modalidad
								</div>
							</th>
							<th>
								<div>
									<StartDateRounded />
									Fecha inicial
								</div>
							</th>
							<th>
								<div>
									<EndDateRounded />
									Fecha final
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(course, index) in fetchData" :key="index" class="[&_td]:rounded-lg">
							<td class="px-4 py-2 border">{{ course.FIC_ID }}</td>
							<td class="px-4 py-2 border">{{ course.PRF_DENOMINACION }}</td>
							<td class="px-4 py-2 border">{{ course.RGA_ESTADO }}</td>
							<td class="px-4 py-2 border">{{ course.PRF_TIPO_PROGRAMA }}</td>
							<td class="px-4 py-2 border">{{ course.modalidad || "null" }}</td>
							<td class="px-4 py-2 border">
								{{ course.FIC_FCH_INICIALIZACION }}
							</td>
							<td class="px-4 py-2 border">
								{{ course.FIC_FCH_FINALIZACION }}
							</td>
						</tr>
					</tbody>
				</table>

				<div class="hidden md:flex justify-between mt-4 mx-2 [&_span]:text-black">
					<div>
						<select
							class="py-2 px-1 rounded-lg border-azulApe cursor-pointer focus:outline-azulApe focus:outline-2">
							<option value="5" default>5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="25">25</option>
						</select>
						<span class="ml-2">Noticias por página</span>
					</div>

					<div class="flex items-center space-x-2">

						<Chevron class="mt-1" />
						<span class="pl-0.5 pr-8">Anterior</span>

						<div class="space-x-5">
							<span>1</span>
							<span>...</span>
							<span class="bg-azul-gradian rounded-2xl py-2 px-3 !text-white">02</span>
						</div>

						<span class="pl-8 pr-0.5">Siguiente</span>
						<Chevron class="rotate-90 mt-1" />

					</div>

					<div class="flex justify-evenly items-center">
						<span><strong>1-10</strong> de <strong>40</strong> Resultados</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Simulación de datos desde una API
import { ref, onMounted } from "vue";
import History from "./Icons/History.vue";
import Person from "./Icons/fill/Person.vue";
import CarePathway from "./Icons/fill/CarePathway.vue";
import TicketRounded from "./Icons/fill/TicketRounded.vue";
import CalendarRounded from './Icons/fill/CalendarRounded.vue';
import CoursesRounded from './Icons/fill/CoursesRounded.vue';
import StatusRounded from './Icons/fill/StatusRounded.vue';
import TypeRounded from './Icons/fill/TypeRounded.vue';
import ModalityRounded from './Icons/fill/ModalityRounded.vue';
import StartDateRounded from './Icons/fill/StartDateRounded.vue';
import EndDateRounded from './Icons/fill/EndDateRounded.vue';
import Chevron from "./Icons/Chevron.vue";
import ButtonLink from "./ButtonLink.vue";
import { useResponsive } from "../composables/useResponsive";
import { useEventStore } from "@/stores/storedataOff.js"; // Cambiar según tu estructura de store

const eventStore = useEventStore();
const fetchData = ref([]);
const { screenSize } = useResponsive()
const userInfo = ref({
	tipo_documento: "CC",
	nombre: "John",
	apellido: "Doe López",
	ciudad: "Medellín",
	provSofia: "Sí",

	documento: "1032456789",
	pertenenciaetnica: "Afrocolombiano",
	id_hogar: "HOG-45872",
	numtelefonocelular: "3124567890",
	provRuv: "No",
});
const host = import.meta.env.VITE_HOST;
const btnStylesPag = ref({
	clicked: false,
	styles: "py-2 px-3 !text-white"
})

const fetchOptions = {
	url: `${host}:8083/api/v1/programa`,
	options: {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	},
};

// const getFetchData = async (fetchOptions) => {
// 	const { url, options } = fetchOptions;
// 	let newUrl = url + `/${userInfo.value.documento}`;
// 	console.log(newUrl);

// 	try {
// 		const response = await fetch(newUrl, options);
// 		const json = await response.json();
// 		if (!response.ok)
// 			throw {
// 				error: true,
// 				errorStatus: response.status,
// 				errorMsg: response.statusText,
// 			};
// 		console.log(json);
// 		fetchData.value = json;
// 	} catch (error) {
// 		if (!error.error) error.error = true;
// 		console.log(error);
// 	} finally {
// 		newUrl = "";
// 	}
// };

// Función de utilidad
const formatData = (value) => {
	// Considera casos adicionales como "NULL", undefined, o valores vacíos
	if (
		value == null ||
		value === "" ||
		value === "NULL" ||
		value === "undefined"
	) {
		return "NO REGISTRA";
	}
	return value;
};

onMounted(() => {

	//userInfo.value = eventStore.getUserInfo();
	// getFetchData(fetchOptions);
	console.log(fetchData.value);
	fetchData.value.push(
		{
			FIC_ID: "3.000.000",
			PRF_DENOMINACION: "Nombre del curso",
			RGA_ESTADO: "Pendiente",
			PRF_TIPO_PROGRAMA: "Presencial",
			modalidad: "Tecnólogo",
			FIC_FCH_INICIALIZACION: "01/02/2021",
			FIC_FCH_FINALIZACION: "01/02/2021",
		},
		{
			FIC_ID: "3.000.000",
			PRF_DENOMINACION: "Nombre del curso",
			RGA_ESTADO: "Pendiente",
			PRF_TIPO_PROGRAMA: "Presencial",
			modalidad: "Tecnólogo",
			FIC_FCH_INICIALIZACION: "01/02/2021",
			FIC_FCH_FINALIZACION: "01/02/2021",
		},
		{
			FIC_ID: "3.000.000",
			PRF_DENOMINACION: "Nombre del curso",
			RGA_ESTADO: "Pendiente",
			PRF_TIPO_PROGRAMA: "Presencial",
			modalidad: "Tecnólogo",
			FIC_FCH_INICIALIZACION: "01/02/2021",
			FIC_FCH_FINALIZACION: "01/02/2021",
		},
		{
			FIC_ID: "3.000.000",
			PRF_DENOMINACION: "Nombre del curso",
			RGA_ESTADO: "Pendiente",
			PRF_TIPO_PROGRAMA: "Presencial",
			modalidad: "Tecnólogo",
			FIC_FCH_INICIALIZACION: "01/02/2021",
			FIC_FCH_FINALIZACION: "01/02/2021",
		},
	)
	console.log(fetchData.value);

});
</script>

<style scoped>
table {
	border-collapse: separate;
	border-spacing: 4px 4px;
	/* Espacio entre celdas */
	min-width: 100%;

}

th,
td {
	border: 1px solid #ecebeb;
	/* Borde individual para cada celda */
	background-color: #fff;
	/* Fondo blanco para celdas */
	text-align: left;
	/* Alinear texto a la izquierda */
}

thead th {
	color: #fff;
	font-weight: bold;
	overflow: hidden;
}

tbody tr:hover td {
	background-color: #f9f9f9;
	/* Fondo más claro al pasar el cursor */
}

tbody td {
	padding: 10px;
	/* Espaciado interno en las celdas */
}

.rotate-90 {
	transform: rotate(180deg);
	transform-origin: center;
	/* Importante para que gire bien */
	display: inline-block;
	/* Necesario en la mayoría de elementos inline */
}
</style>
