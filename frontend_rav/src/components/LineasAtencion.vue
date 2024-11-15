<template>
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-1">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <!-- Icono SVG -->
          <img :src="lineaAten" alt=" Icono de Lineas de atencion" width="50" height="50" />
        </div>
        <div class="ml-4 text-center md:text-left">
          <p class="text-black mb-0 text-2xl md:text-3xl">lineas de </p>
          <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">Atencion</h2>
        </div>
      </div>
    </div>
	<div class="flex items-center space-x-2 flex-auto"> 
		<img :src="select1" alt="Icono de selección 1" width="25" height="25" />
		 <p class="font-sans">Seleccione la</p> 
		 <h3 class="font-sans">Entidad</h3> 
		</div>
		<!-- segunda Sección: Contenedores de imagen -->
		<div class="flex flex-col gap-3 p-7 ">  
			<div class="py-8 hidden lg:flex items-center space-x-40 flex-grow  h-40"> 
				<div class="flex flex-col items-center"> 
					<img :src="LogoSenaverde" alt="imagen logo verde sena" class="w-40 h-40 object-cover rounded-lg border border-white" /> 
					<input type="radio" id="senaverde" name="logo" value="senaverde" class="mt-2"> 
					<label for="senaverde" class="text-sm">Logo SENA Verde</label> 
				</div> 
					<div class="flex flex-col items-center"> 
						<img :src="LogoApe" alt="Imagen ape" class="w-40 h-40 object-cover rounded-lg border border-white" /> 
						<input type="radio" id="ape" name="logo" value="ape" class="mt-2"> <label for="ape" class="text-sm">Logo APE</label> 
					</div> 
						<div class="flex flex-col items-center"> 
							<img :src="LogCertLab" alt="Imagen certificados laborales" class="w-40 h-40 object-cover rounded-lg border border-white" /> 
							<input type="radio" id="certlab" name="logo" value="certlab" class="mt-2"> 
							<label for="certlab" class="text-sm">Certificados Laborales</label> 
						</div> 
						<div class="flex flex-col items-center"> 
								<img :src="FondoEmprender" alt="Imagen fondo emprender" class="w-40 h-40 object-cover rounded-lg border border-white" /> 
								<input type="radio" id="fondoemprender" name="logo" value="fondoemprender" class="mt-2"> 
								<label for="fondoemprender" class="text-sm">Fondo Emprender</label> 
						</div>
		</div> 
		<div class="flex gap-5  flex-auto ">
			<h2 class="font-bold mt-1 ml-40 text-center">SENA</h2>
			<h2 class="font-bold mt-1 ml-80 text-center">APE</h2>
			<h2 class="font-bold mt-1 ml-64 text-center">CERTIFICACIONES</h2>
			<h2 class="font-bold mt-1 ml-40 text-center ">FONDO EMPRENDER</h2>
		</div>
		<!-- Tercera Sección: Seleccion de Regional -->
	<div class="flex items-center space-x-2 flex-auto "> 
		<img :src="select2" alt="Icono de selección 2" width="25" height="25" />
		 	<p class="font-sans">Seleccione la</p> 
		 	<h3 class="font-sans">Regional</h3> 
	</div>
	<div class="flex items-center space-x-2 h-1  "> 
		<select id="regional" class="border border-gray-300 rounded p-2 w-full"> 
			<option value="">Seleccione la regional</option> 
			<option value="region1">Sena</option> 
			<option value="region2">Agencia Publica de Empleo</option> 
			<option value="region3">Certificacion Competencias Laborales</option> 
			<option value="region3">Fondo Emprender</option>
		</select> 
	</div> 
	<div class="flex items-center justify-center"> 
		<!-- Botón de Búsqueda -->
        <Button class="w-96 !bg-customPurple text-lg cursor-pointer border-none !text-amarillo font-bold py-2 rounded-lg shadow-md mt-4"
						type="button"
						label="Buscar"
						icon="pi pi-search"
						:loading="loading"
						@click="searchUser" />
	</div>
</div>
</template>
<script setup>
import { ref } from "vue";
import select1 from "@/assets/imgLineasAtencion/select1.svg";
import select2 from "@/assets/imgLineasAtencion/select2.svg";
import lineaAten from "@/assets/imgLineasAtencion/lineaAten.svg";
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import LogoSenaverde from "@/assets/images/logosenaverde.svg";
import LogCertLab from "@/assets/imgLineasAtencion/LogCertLab.svg";
import LogoApe from "@/assets/images/logoape.svg";
import FondoEmprender from "@/assets/images/fondoemprender.svg";

// Datos de las imágenes estáticas y sus títulos
const imagePaths = ref([
	{
		title: "",
		path: LogoSenaverde,

	},
	{
		title: "",
		path: LogoApe,
	},
	{
		title: "",
		path: LogCertLab,
	},
	{
		title: "",
		path: FondoEmprender,
	},
]);

</script>

<style scoped>
/* No additional CSS needed as everything is styled with Tailwind CSS */
</style>