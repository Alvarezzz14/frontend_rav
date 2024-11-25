<template>
	<div class="flex flex-col gap-5 p-4 ">
		<!-- Primera Sección: Contenedores con contenido e imagen -->

		<div class="flex gap-5 justify-between">
			<div v-for="(image, index) in imagePaths" :key="index"

				class="p-4 border border-purple-800 rounded-lg text-center bg-white">


				<h4 class="font-bold text-lg">{{ image.title }}</h4>
				<div class="mt-3">
					<img :src="image.path" alt="Imagen estática" :class="[
						' rounded-lg border ',
						image.path === 'Certificaciones' ? 'w-60 h-9 top-56 max-w-full mx-auto ' : 'w-28 h-12 max-w-full mx-auto'
					]" />
				</div>

				<div class="mt-2 text-3xl font-semibold text-purple-700">
					<p>{{ image.count }}</p>
				</div>
			</div>
		</div>

		<!-- Segunda Sección: Gráficos -->
		<div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
			<div class="p-4 border border-azulBarraApe rounded-lg bg-white w-full max-w-full sm:max-w-full">
				<LineChart />
			</div>
			<div class="p-4 border border-azulBarraApe rounded-lg bg-white w-full max-w-full sm:max-w-full">
				<BarChart />
			</div>
		</div>

		<!-- Tercera Sección: Tabla de Datos -->
		<div class="p-4 border border-azulBarraApe rounded-lg bg-white">
			<h3 class="text-xl font-semibold text-azulBarraApe mb-4">Tabla de Datos</h3>

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
import LogoSenaverde from "@/assets/images/logosenaverde.svg";
import LogoApe from "@/assets/images/logoape.svg";
import FondoEmprender from "@/assets/images/fondoemprender.svg";
import Certificaciones from "@/assets/images/Certificaciones.svg";

// Datos de las imágenes estáticas y sus títulos
const imagePaths = ref([
	{
		title: "SENA",
		count: "12883124",
		path: LogoSenaverde,
	},
	{
		title: "APE",
		count: "9888112",
		path: LogoApe,
	},
	{
		title: "CERTIFICACIONES",
		count: "85883161",
		path: Certificaciones,
	},
	{
		title: "FONDO EMPRENDER",
		count: "99883151",
		path: FondoEmprender,
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
</style>
