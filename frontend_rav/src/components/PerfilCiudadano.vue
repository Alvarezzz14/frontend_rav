<template>
	<div class="bg-white p-6 border-none rounded-lg h-auto">
		<!-- Sección superior: Título e Icono -->
		<div class="flex flex-col lg:flex-row items-center justify-between mb-6">
			<div class="flex items-center">
				<div class="p-4 bg-customPurple rounded-full">
					<!-- Icono SVG -->
					<img
						:src="Ciudadano"
						alt="Icono de Ciudadano"
						width="50"
						height="50" />
				</div>
				<div class="ml-4 text-center lg:text-left">
					<p class="text-black mb-0 text-2xl">Perfil del</p>
					<h2 class="text-customPurple text-5xl mt-0 font-bold">Ciudadano</h2>
				</div>
			</div>
			<!-- Botones de Acción -->
			<div class="flex flex-wrap gap-4 mt-4 justify-center">
				<router-link
					:to="{ name: 'RutaAtencionPage' }"
					class="cursor-pointer bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
					<img
						:src="RutaAtencion"
						alt="Icono de Atención"
						class="w-10 h-10 mb-2" />
					<span class="text-sm">Ver Ruta de Atención</span>
				</router-link>

				<router-link
					:to="{ name: 'LineaTiempoNuevaPage' }"
					class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
					<img :src="VerLine" alt="Icono de Ver Línea" class="w-10 h-10 mb-2" />
					<span class="text-sm">Ver Línea de Tiempo</span>
				</router-link>

				<router-link
					:to="{ name: 'RegistroActividadPage' }"
					class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
					<img
						:src="Actividad"
						alt="Icono registrar actividad"
						class="w-10 h-10 mb-2" />
					<span class="text-sm">Registrar de Actividad</span>
				</router-link>
			</div>
		</div>

		<!-- Información personal del ciudadano -->
		<div class="flex flex-col lg:flex-row bg-white p-4 rounded-lg gap-8 mb-8">
			<!-- Primera columna -->
			<div class="flex-1">
				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>TIPO DE DOCUMENTO:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.tipo_documento || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">NOMBRE COMPLETO:</label>
					<p class="text-black w-2/3">
						{{ userInfo.nombrecompleto || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">CIUDAD:</label>
					<p class="text-black w-2/3">{{ userInfo.ciudad || "NO REGISTRA" }}</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">GENERO:</label>
					<p class="text-black w-2/3">{{ userInfo.genero || "NO REGISTRA" }}</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">ID HOGAR:</label>
					<p class="text-black w-2/3">
						{{ userInfo.id_hogar || "NO REGISTRA" }}
					</p>
				</div>
			</div>

			<!-- Segunda columna -->
			<div class="flex-1">
				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>NÚMERO DE DOCUMENTO:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.documento || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>PROCEDENCIA ÉTNICA:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.pertenenciaetnica || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">ESTADO VICTIMA:</label>
					<p class="text-black w-2/3">
						{{ userInfo.estadovictima || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">HECHO:</label>
					<p class="text-black w-2/3">{{ userInfo.hecho || "NO REGISTRA" }}</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>NÚMERO DE CONTACTO:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.numtelefonocelular || "NO REGISTRA" }}
					</p>
				</div>
			</div>
		</div>
		<!-- Historial del Ciudadano -->
		<div class="text-white rounded-lg shadow-md">
			<!-- Título del historial -->
			<div class="flex items-center bg-customPurple p-px">
				<img :src="Historial" alt="Icono de Historial" class="w-8 h-8 mr-2" />
				<h3 class="text-xl font-bold">HISTORIAL DEL CIUDADANO</h3>
			</div>
			<!-- Contenedor de la tabla con scroll horizontal -->
			<div class="overflow-x-auto">
				<table class="min-w-full bg-white text-gray-900">
					<thead>
						<tr class="bg-gray-200">
							<th class="px-4 py-2 border">FICHA</th>
							<th class="px-4 py-2 border">CURSO</th>
							<th class="px-4 py-2 border">ESTADO</th>
							<th class="px-4 py-2 border">TIPO</th>
							<th class="px-4 py-2 border">MODALIDAD</th>
							<th class="px-4 py-2 border">FECHA INICIO</th>
							<th class="px-4 py-2 border">FECHA FIN</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(course, index) in fetchData" :key="index">
							<td class="px-4 py-2 border">{{ course.FIC_ID }}</td>
							<td class="px-4 py-2 border">{{ course.PRF_DENOMINACION }}</td>
							<td class="px-4 py-2 border">{{ course.RGA_ESTADO }}</td>
							<td class="px-4 py-2 border">{{ course.PRF_TIPO_PROGRAMA }}</td>
							<td class="px-4 py-2 border">{{ course.modalidad || "null" }}</td>
							<td class="px-4 py-2 border">{{ course.FIC_FCH_INICIALIZACION }}</td>
							<td class="px-4 py-2 border">{{ course.FIC_FCH_FINALIZACION }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
// Simulación de datos desde una API
import { ref, onMounted } from "vue";
import RutaAtencion from "@/assets/images/ruta.svg";
import Ciudadano from "@/assets/images/Usuario.svg";
import VerLine from "@/assets/images/VerLine.svg";
import Actividad from "@/assets/images/Actividad.png";
import Historial from "@/assets/images/Historial.svg";
import { useEventStore } from "@/stores/storedataOff.js"; // Cambiar según tu estructura de store



const eventStore = useEventStore();
const userInfo = ref({})
const fetchData = ref([])

const fetchOptions = {
    url: "http://localhost:8083/api/v1/programa",
    options: {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    }
}

const getFetchData = async(fetchOptions)=>{
	const{url,options} = fetchOptions
	let newUrl = url+`/${userInfo.value.documento}`
	console.log(newUrl);
	
	try{
        const response = await fetch(newUrl,options);
        const json = await response.json();
        if (!response.ok) throw{error:true,errorStatus:response.status,errorMsg:response.statusText}
        console.log(json)
        fetchData.value = json;
        
    }catch(error){
        if (!error.error) error.error = true
        console.log(error)
    }finally{
      newUrl = ''
    }
}

onMounted( () => {  
  userInfo.value = eventStore.getUserInfo()
  getFetchData(fetchOptions)
  console.log(fetchData.value);
  
});


</script>

<style scoped>
table {
	border-collapse: separate;
	border-spacing: 1px 1px; /* Espacio entre celdas */
	min-width: 100%;
	margin-top: 1rem;
}

th,
td {
	border: 1px solid #ccc; /* Borde individual para cada celda */
	background-color: #fff; /* Fondo blanco para celdas */
	text-align: left; /* Alinear texto a la izquierda */
}

thead th {
	background-color: #71277a;
	color: #fff;
	font-weight: bold;
	border-radius: 0.5rem 0.5rem 0rem 0rem;
	overflow: hidden;
	padding: 12px;
}

tbody tr:hover td {
	background-color: #f9f9f9; /* Fondo más claro al pasar el cursor */
}

tbody td {
	padding: 10px; /* Espaciado interno en las celdas */
}
</style>
