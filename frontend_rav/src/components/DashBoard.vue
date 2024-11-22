<template>

	<div class="flex flex-col gap-5 p-4">
	  <!-- Primera Sección: Contenedores con contenido e imagen -->
	  <div class="flex gap-5 justify-between ">
		<div 
      v-for="(image, index) in imagePaths" 
      :key="index"
      class="rounded-lg text-center shadow-lg w-full sm:w-1/4 md:w-1/5 my-card "
      :style="{
        backgroundImage: 'url(' + image.path + '), linear-gradient(180deg, rgba(0, 0, 0, 0) 16%, #71277A 85.5%)',
        backgroundPosition: 'center',
        height: '287.6px',
        width: '287.6px',
        borderRadius: '10px',
        backgroundBlendMode: 'multiply',
        position: 'relative'
      }">
  
		  <!-- Contenedor para el título y el número en la parte inferior -->
		  <div class="absolute bottom-0 left-0 w-full   bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
			<h4 class="font-bold text-white text-lg  text-center">{{ image.title }}</h4>
			<div class="text-3xl font-semibold text-white text-center">
			  <p>{{ image.count }}</p>
			</div>
		  </div>
		</div>
	  </div>
  
	  <!-- Segunda Sección: Gráficos -->
	  <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-2">
		<div class="p-4 border my-card  rounded-lg bg-custom-gradient bg-opacity-20 w-full max-w-full sm:max-w-full">
		  <LineChart />
		</div>
		<div class="p-4 border my-card border-customPurple rounded-lg bg-white w-full max-w-full sm:max-w-full">
		  <BarChart />
		</div>
	  </div>
  
	  <!-- Tercera Sección: Tabla de Datos -->
	  <div class="p-4 border border-customPurple my-card rounded-lg bg-white">
		<h3 class="text-xl font-semibold text-customPurple mb-4">Tabla de Datos</h3>
		<table class="w-full border-collapse">
		  <thead>
			<tr>
			  <th class="p-3 text-left border-b bg-gray-200 font-bold">
				Departamento
			  </th>
			  <th class="p-3 text-left border-b bg-gray-200 font-bold">
				Estado Actual
			  </th>
			  <th class="p-3 text-left border-b bg-gray-200 font-bold">
				Fecha de Acercamiento
			  </th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="(row, index) in tableData" :key="index">
			  <td class="p-3 border-b">{{ row.Departamento }}</td>
			  <td class="p-3 border-b">{{ row.Estado }}</td>
			  <td class="p-3 border-b">{{ row.Fecha }}</td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import LineChart from "@/components/LineChart.vue";
  import BarChart from "@/components/BarChart.vue";
  import EnFormacion from "@/assets/images/EnFormacion.svg";
  import Certificados from "@/assets/images/Certificados.svg";
  import EnProceso from "@/assets/images/EnProceso.svg";
  import Cancelados from "@/assets/images/Cancelados.svg";
  
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
	  title: "EN PROCESO",
	  count: "85883161",
	  path: EnProceso,
	},
	{
	  title: "CANCELADOS",
	  count: "99883151",
	  path: Cancelados,
	},
  ]);
  
  // Datos de ejemplo para la tabla
  const tableData = ref([
	{ Departamento: 1, Estado: "Jorge Raul", Fecha: 2004 },
	{ Departamento: 2, Estado: "Pedronel Santa", Fecha: 2001 },
	{ Departamento: 3, Estado: "Alfredo Quinquilla", Fecha: 1967 },
	{ Departamento: 4, Estado: "Jorge Raul", Fecha: 2004 },
	{ Departamento: 5, Estado: "Pedronel Santa", Fecha: 2001 },
	{ Departamento: 6, Estado: "Alfredo Quinquilla", Fecha: 1967 },
	{ Departamento: 7, Estado: "Jorge Raul", Fecha: 2004 },
	{ Departamento: 8, Estado: "Pedronel Santa", Fecha: 2001 },
	{ Departamento: 9, Estado: "Alfredo Quinquilla", Fecha: 1967 },
	{ Departamento: 10, Estado: "Jorge Raul", Fecha: 2004 },
  ]);
  </script>
  
  <style scoped>
  /* No additional CSS needed as everything is styled with Tailwind CSS */
  .my-card {
  transition: transform 0.3s ease-in-out; /* Transición de la propiedad transform con duración de 300ms */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-card:hover {
  transform: scale(1.05); 
}
  </style>

