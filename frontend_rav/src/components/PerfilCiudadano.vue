<template>
	<div class="bg-white p-6 border-none rounded-lg h-auto">
		<!-- Sección superior: Título e Icono -->
		<div class="flex flex-col lg:flex-row items-center justify-between mb-6">
			<div class="flex items-center">
				<div class="p-4 bg-customPurple rounded-full">
					<!-- Icono SVG -->
					<img :src="Ciudadano" alt="Icono de Ciudadano" width="50" height="50" />
				</div>
				<div class="ml-4 text-center lg:text-left">
					<p class="text-black mb-0 text-2xl">Perfil del</p>
					<h2 class="text-customPurple text-5xl mt-0 font-bold">Ciudadano</h2>
				</div>
			</div>
			<!-- Botones de Acción -->
			<div class="flex flex-wrap gap-4 mt-4 justify-center">
				<router-link to="/rutadeaccion">
					<button
						class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
						<img :src="RutaAtencion" alt="Icono de Atención" class="w-10 h-10 mb-2" />
						<span class="text-sm">Ver Ruta de Atención</span>
					</button>
				</router-link>


				<router-link to="/LineaTiempoNueva">
					<button
						class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
						<img :src="VerLine" alt="Icono de Ver Línea" class="w-10 h-10 mb-2" />
						<span class="text-sm">Ver Línea de Tiempo</span>
					</button>
				</router-link>

				<router-link to="/registroactividad">
					<button
						class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
						<img :src="Actividad" alt="Icono registrar actividad" class="w-10 h-10 mb-2" />
						<span class="text-sm">Registrar de Actividad</span>
					</button>
				</router-link>
			</div>
		</div>

		<!-- Información personal del ciudadano -->
		<div class="flex flex-col lg:flex-row bg-white p-4 rounded-lg gap-8 mb-8">
			<!-- Primera columna -->
			<div class="flex-1">
				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">TIPO DE DOCUMENTO:</label>
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
					<label class="text-black font-semibold w-1/3">NÚMERO DE DOCUMENTO:</label>
					<p class="text-black w-2/3">
						{{ userInfo.documento || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">PROCEDENCIA ÉTNICA:</label>
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
					<label class="text-black font-semibold w-1/3">NÚMERO DE CONTACTO:</label>
					<p class="text-black w-2/3">
						{{ userInfo.numtelefonocelular || "NO REGISTRA" }}
					</p>
				</div>
			</div>
		</div>

		<div class="flex-1">
		  <label class="block text-customPurple mb-2">NÚMERO DE DOCUMENTO:</label>
		  <p class="text-black mb-4">{{ userInfo.documento || "NO REGISTRA" }}</p>
  
		  <label class="block text-customPurple mb-2">PROCEDENCIA ÉTNICA:</label>
		  <p class="text-black mb-4">{{ userInfo.pertenenciaetnica || "NO REGISTRA" }}</p>
  
		  <label class="block text-customPurple mb-2">ESTADO VICTIMA:</label>
		  <p class="text-black mb-4">{{ userInfo.estadovictima || "NO REGISTRA" }}</p>
  
		  <label class="block text-customPurple mb-2">HECHO:</label>
		  <p class="text-black mb-4">{{ userInfo.hecho || "NO REGISTRA" }}</p>
  
		  <label class="block text-customPurple mb-2">NÚMERO DE CONTACTO:</label>
		  <p class="text-black">{{ userInfo.numtelefonocelular || "NO REGISTRA" }}</p>
>>>>>>> origin/develop
		</div>
	  </div>
	
</template>

<script setup>
import { ref, onMounted } from "vue";
import RutaAtencion from "@/assets/images/ruta.svg";
import Ciudadano from "@/assets/images/Usuario.svg";
import VerLine from "@/assets/images/VerLine.svg";
import Actividad from "@/assets/images/Actividad.png";
import Historial from "@/assets/images/Historial.svg";
import { useEventStore } from "@/stores/storedataOff.js"; // Cambiar según tu estructura de store
import { useRoute } from "vue-router";

const route = useRoute();
const eventStore = useEventStore();
const userInfo = ref({});

onMounted(() => {
	const info = route.params.userInfo;
	//  const results = await eventStore.searchByCedula(cedula);

	userInfo.value = eventStore.userInfo;
	console.log(userInfo.value);
	console.log(userInfo.value.nombrecompleto);
	
});
</script>

<style scoped>
table {
	width: 100%;
	margin-top: 20px;
}

th,
td {
	padding: 10px;
	text-align: center;
}

th {
	font-weight: bold;
}
</style>
