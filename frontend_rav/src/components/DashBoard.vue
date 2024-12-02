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
				class="p-4 border my-card rounded-lg bg-custom-gradient bg-opacity-20 w-full max-w-full sm:max-w-full">
				<LineChart />
			</div>
			<div
				class="p-4 border my-card border-customPurple rounded-lg bg-white w-full max-w-full sm:max-w-full">
				<BarChart />
			</div>
		</div>

		<!-- Tercera Sección: Tabla de Datos -->
		<div class="p-4 border border-customPurple my-card rounded-lg bg-white">
			<table class="w-full border-collapse">
				<thead>
					<tr>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<svg
								width="20"
								height="15"
								viewBox="0 0 20 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7.47073 4.55718L9.81261 1.13626H13.0552C13.3554 0.896192 14.6765 0.344043 17.5588 0.0559654C21.1617 -0.304132 18.4595 1.13626 18.4595 2.57665C18.4595 4.01703 18.6397 4.55718 18.4595 4.55718C18.2794 4.55718 17.5588 6.17762 16.1177 7.43796C15.3971 7.79806 15.0368 7.43796 13.9559 8.15815C12.8751 8.87835 12.3346 8.15815 11.614 8.15815C10.8935 8.15815 12.3346 9.95864 12.3346 11.399C12.3346 12.8394 12.8751 12.2993 12.3346 13.0195C11.7942 13.7397 7.47073 13.0195 6.75014 13.7397C6.17367 14.3158 5.18888 14.82 4.76855 15C3.74774 14.94 1.56199 14.6039 0.985518 13.7397C0.264929 12.6594 1.88625 12.8394 1.70611 11.399C1.56199 10.2467 2.48673 9.95864 2.96712 9.95864L5.84943 8.15815L4.5884 5.09727L7.47073 4.55718Z"
									fill="white" />
							</svg>

							Departamento
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<div class="flex items-center">
								<svg
									width="21"
									height="20"
									viewBox="0 0 21 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M0.829102 12.4569V12.3198C0.832856 12.3135 0.839739 12.3078 0.839739 12.3014C0.871188 11.9982 1.00699 11.7158 1.2233 11.5039C1.8073 10.8936 2.39234 10.2854 2.97843 9.67924L4.36376 8.24347L6.67265 5.85094C7.30378 5.19619 7.93492 4.54164 8.56606 3.8873C9.24516 3.18348 9.92427 2.48051 10.6034 1.77838C10.9275 1.44275 11.2472 1.10395 11.5739 0.772131C11.7616 0.581795 11.9581 0.391459 12.1595 0.216983C12.2947 0.0977059 12.468 0.0475841 12.6388 0H12.9091C12.9123 0.00380673 12.9148 0.00951657 12.9185 0.010151C13.2089 0.0634452 13.4385 0.225865 13.6418 0.430794C13.8191 0.609711 13.9939 0.790953 14.1662 0.974522C14.5379 1.36915 14.9064 1.76569 15.2775 2.15968C15.292 2.17245 15.3017 2.19004 15.3046 2.20932C15.3076 2.22861 15.3038 2.24834 15.2937 2.265C15.1899 2.51879 15.0791 2.77257 14.9915 3.03333C14.8772 3.35472 14.8447 3.70016 14.897 4.03767C14.9759 4.50273 15.2393 4.85168 15.5853 5.1467C15.9117 5.44282 16.3398 5.59708 16.7773 5.57622C17.0923 5.55717 17.4008 5.47682 17.6858 5.33957C17.8879 5.24758 18.0825 5.13972 18.284 5.03694C18.2924 5.04314 18.3003 5.04992 18.3078 5.05724C18.6125 5.35734 18.921 5.65426 19.2213 5.95943C19.5574 6.30014 19.8909 6.64338 20.2156 6.99486C20.3025 7.09061 20.3671 7.20489 20.4046 7.32929C20.4422 7.45369 20.4518 7.58505 20.4327 7.7137C20.3977 8.00814 20.2654 8.28188 20.0573 8.49028C19.807 8.75865 19.5492 9.02195 19.2939 9.28652C18.7975 9.80042 18.3015 10.3133 17.806 10.8251C16.8311 11.836 15.8558 12.8452 14.8801 13.8527C14.4505 14.2989 14.0206 14.7452 13.5905 15.1914C12.7475 16.0648 11.9042 16.9383 11.0608 17.8117C10.6707 18.2156 10.2809 18.62 9.89132 19.0248C9.6792 19.2436 9.47334 19.4689 9.24808 19.6738C8.77442 20.1027 8.24694 20.1071 7.75826 19.696C7.62373 19.5831 7.50109 19.4556 7.37532 19.3318C6.97361 18.9366 6.57503 18.5375 6.17207 18.1429C5.91428 17.8891 5.89363 17.7863 6.03754 17.4532C6.29847 16.8499 6.31286 16.242 6.0025 15.6571C5.64022 14.9731 5.06393 14.6178 4.2918 14.6419C4.04152 14.6496 3.79499 14.7251 3.54595 14.7631C3.40044 14.79 3.26211 14.8475 3.13986 14.9319C3.07104 14.9763 3.00158 15.0194 2.93463 15.062C2.92835 15.0583 2.92229 15.0543 2.91648 15.0499C2.3158 14.4015 1.71261 13.755 1.1163 13.1021C1.03055 13.0001 0.960314 12.8857 0.907942 12.7627C0.872511 12.6634 0.846121 12.561 0.829102 12.4569ZM9.32943 13.7512C9.3507 13.7239 9.36634 13.7049 9.38011 13.6846C9.68608 13.2404 9.99331 12.7963 10.2968 12.349C10.3119 12.3225 10.3342 12.3009 10.361 12.2868C10.3879 12.2728 10.4181 12.2668 10.4482 12.2697C10.9657 12.2761 11.4831 12.2786 12.0006 12.2818H12.137C12.1088 12.2424 12.0926 12.2183 12.0744 12.1942C11.7522 11.7609 11.4306 11.3276 11.1058 10.8961C11.0899 10.8778 11.0795 10.8551 11.0759 10.8309C11.0724 10.8067 11.0758 10.782 11.0858 10.7597C11.2585 10.239 11.4297 9.71773 11.5995 9.19579C11.607 9.17358 11.612 9.15011 11.6195 9.11965L11.5814 9.13107C11.0574 9.31422 10.5341 9.49821 10.0115 9.68305C9.98926 9.69358 9.9645 9.69727 9.94025 9.69366C9.916 9.69005 9.89333 9.6793 9.87505 9.66275C9.44205 9.33621 9.00781 9.01095 8.57231 8.68695C8.55166 8.67173 8.52976 8.65777 8.50974 8.64381C8.50974 8.78403 8.50974 8.91536 8.50974 9.04733C8.516 9.48573 8.521 9.92414 8.53227 10.3632C8.53476 10.3882 8.5302 10.4134 8.51912 10.4358C8.50805 10.4583 8.49091 10.4771 8.4697 10.4901C8.03003 10.8077 7.59203 11.1264 7.1557 11.4462C7.1363 11.4602 7.11878 11.476 7.09312 11.4982L7.18072 11.5268C7.69882 11.6873 8.21691 11.844 8.73437 12.009C8.75177 12.0155 8.76768 12.0256 8.78112 12.0386C8.79457 12.0515 8.80527 12.0672 8.81259 12.0845C8.90206 12.3579 8.98654 12.6339 9.07226 12.9093C9.15798 13.1846 9.23995 13.465 9.32943 13.7512ZM15.4789 8.73517L14.755 9.44894L16.3574 11.1867L17.0852 10.4888C16.5458 9.90321 16.0146 9.32204 15.4789 8.73517ZM12.1896 6.97456L13.7926 8.71233L14.5197 8.01443L12.9154 6.2608L12.1896 6.97456ZM9.62414 4.52113L11.2084 6.26207L11.9706 5.59653L10.3631 3.86383L9.62414 4.52113Z"
										fill="white" />
								</svg>
								<span class="ml-2">Estado Actual</span>
							</div>
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<div class="flex items-center">
								<svg
									width="29"
									height="18"
									viewBox="0 0 29 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M3.49974 10.9416C3.32617 10.7223 2.15927 9.17913 2.17883 9.03194C3.52093 6.89725 5.21913 4.97726 7.1463 3.54288C12.2295 -0.238994 17.8888 -0.191182 22.932 3.65444C24.7965 5.07569 26.4425 6.94882 27.752 9.03101C26.6927 10.7794 25.3571 12.3638 23.8838 13.6585C17.0258 19.6857 9.11748 18.0338 3.49893 10.9407L3.49974 10.9416ZM11.2174 14.626C10.6666 14.1957 10.1801 13.5741 9.81502 12.9338C8.28142 10.2404 8.53078 6.67226 10.4009 4.28819C10.6071 4.02476 10.9118 3.78382 11.0952 3.54007C11.1351 3.48757 11.193 3.46319 11.1759 3.37601C8.41425 4.43069 5.95903 6.44351 4.13208 9.03101C4.11497 9.14163 5.15557 10.3998 5.30876 10.5713C6.95236 12.4154 8.94881 13.8629 11.1327 14.701L11.2174 14.626ZM18.7143 14.626L18.799 14.701C21.5435 13.6435 23.9849 11.6382 25.8004 9.06382C24.0044 6.44913 21.5239 4.45319 18.7746 3.37976L18.7143 3.46882C18.8349 3.52976 18.9848 3.67132 19.0818 3.77351C21.7847 6.61694 21.7961 11.4038 19.1225 14.2744C19.0149 14.3907 18.8471 14.551 18.7143 14.626ZM14.754 3.67038C10.9648 3.90101 8.9431 8.89882 11.2818 12.3713C13.4771 15.631 18.0241 14.8669 19.3148 11.0279C20.4956 7.51507 18.337 3.82413 15.1076 3.65726L14.7532 3.67038H14.754Z"
										fill="white" />
									<path
										d="M12.5628 8.01577C12.7486 8.09358 12.888 8.25577 13.0811 8.33358C14.0149 8.71046 14.8942 7.90139 14.8029 6.77358C14.7834 6.53264 14.6644 6.35358 14.6587 6.13796C15.6952 5.92889 16.8344 6.68171 17.2769 7.77108C17.9011 9.30671 17.2956 11.1386 15.9315 11.7733C13.8609 12.737 11.8034 10.4073 12.5636 8.01483L12.5628 8.01577Z"
										fill="white" />
								</svg>

								<span class="ml-2">Fecha de Acercamiento</span>
							</div>
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
import EnFormacion from "@/assets/images/EnFormacion.png";
import Certificados from "@/assets/images/Certificados.png";
import EnProceso from "@/assets/images/PorCertificar.png";
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
@import "@/styles/table-styles.css";

.my-card {
	transition: transform 0.3s ease-in-out; /* Transición de la propiedad transform con duración de 300ms */
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-card:hover {
	transform: scale(1.05);
}
</style>
