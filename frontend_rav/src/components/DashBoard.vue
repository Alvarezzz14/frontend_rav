<template>
	<div class="flex flex-col gap-5 p-4">
		<!-- Primera Sección: Contenedores con contenido e imagen -->
		<div class="flex gap-5 justify-between">
			<div
				v-for="(image, index) in imagePaths"
				:key="index"
				class="flex-1 p-4 border border-azulBarraApe-800 rounded-lg text-center bg-gray-100">
				<h4 class="font-bold text-lg">{{ image.title }}</h4>
				<div class="mt-2 text-3xl font-semibold text-azulBarraApe-700">
					<p>{{ image.count }}</p>
				</div>
				<div class="mt-3">
					<img
						:src="image.path"
						alt="Imagen estática"
						class="w-24 h-auto max-w-full rounded-lg border border-gray-300 mx-auto" />
				</div>
			</div>
		</div>

		<!-- Segunda Sección: Gráficos -->
		<div class="flex gap-5">
			<div class="flex-1 p-4 border border-azulBarraApe-800 rounded-lg bg-gray-100">
				<LineChart />
			</div>
			<div class="flex-1 p-4 border border-azulBarraApe-800 rounded-lg bg-gray-100">
				<BarChart />
			</div>
		</div>

		<!-- Tercera Sección: Tabla de Datos -->
		<div class="p-4 border border-azulBarraApe-800 rounded-lg bg-gray-100">
			<h3 class="text-xl font-semibold text-azulBarraApe-700 mb-4">Tabla de Datos</h3>
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

// Datos de las imágenes estáticas y sus títulos
const imagePaths = ref([
	{
		title: "SENA",
		count: "12883124",
		path: LogoSenaverde,
	},
	{
		title: "Ape",
		count: "97883112",
		path: LogoApe,
	},
	{
		title: "SENA Certificados",
		count: "85883161",
		path: LogoSenaverde,
	},
	{
		title: "Fondo Emprender",
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
