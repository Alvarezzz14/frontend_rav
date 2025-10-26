<template>
	<div class="lineas-atencion-container">
		<!-- Sección Superior: Título e Icono -->
		<div class="flex items-center gap-3 px-6 pt-8 pb-4">
			<div class="flex items-center justify-center w-[30px] h-[30px] bg-customPurple rounded-full">
				<img
					:src="lineaAten"
					alt="Icono de Líneas de Atención"
					class="w-4 h-4" />
			</div>
			<h1 class="text-customPurple text-[30px] font-bold leading-[35px] font-work-sans">
				Líneas de atención
			</h1>
		</div>

		<!-- Sección de Selección de Entidades -->
		<div class="flex flex-col gap-6 px-6 py-4">
			<!-- Subtítulo de Selección con Número -->
			<div class="flex items-center gap-3">
				<div class="flex items-center justify-center w-[35px] h-[35px] bg-customPurple rounded-full">
					<span class="text-white font-bold text-[24px] font-work-sans">1</span>
				</div>
				<p class="font-work-sans text-[24px] leading-[28px] text-black">
					Seleccione la <span class="font-bold">Entidad</span>
				</p>
			</div>

			<!-- Contenedor de Cards de Entidades -->
			<div class="flex gap-5 flex-wrap">
				<!-- SENA Card -->
				<div
					class="entity-card"
					:class="{ 'entity-card-selected': selectedEntity === 'sena' }"
					@click="
						() =>
							handleEntityClick({
								image: LogoSenaverde,
								sede: sedes[0],
								newEntity: 'sena',
							})
					">
					<div class="entity-card-overlay"></div>
					<SenaLaIcon class="entity-card-logo" />
				</div>

				<!-- APE Card -->
				<div
					class="entity-card entity-card-ape"
					:class="{ 'entity-card-selected': selectedEntity === 'ape' }"
					@click="
						() =>
							handleEntityClick({
								image: LogoApe,
								sede: sedes[1],
								newEntity: 'ape',
							})
					">
					<div class="entity-card-overlay"></div>
					<ApeLaIcon class="entity-card-logo-ape" />
				</div>

				<!-- Certificaciones Card -->
				<div
					class="entity-card entity-card-cert"
					:class="{
						'entity-card-selected': selectedEntity === 'certificaciones',
					}"
					@click="
						() =>
							handleEntityClick({
								image: LogCertLab,
								sede: sedes[2],
								newEntity: 'certificaciones',
							})
					">
					<div class="entity-card-overlay"></div>
					<CompetenciasLaboralLaIcon class="entity-card-logo-cert" />
				</div>

				<!-- Fondo Emprender Card -->
				<div
					class="entity-card entity-card-fondo"
					:class="{
						'entity-card-selected': selectedEntity === 'fondoEmprender',
					}"
					@click="
						() =>
							handleEntityClick({
								image: FondoEmprender,
								sede: sedes[3],
								newEntity: 'fondoEmprender',
							})
					">
					<div class="entity-card-overlay"></div>
					<FondoEmprenderIcon class="entity-card-logo-fondo" />
				</div>
			</div>

			

			<!-- Sección de Selección de Regional con Número -->
			<div class="flex items-center gap-3">
				<div class="flex items-center justify-center w-[35px] h-[35px] bg-customPurple rounded-full">
					<span class="text-white font-bold text-[24px] font-work-sans">2</span>
				</div>
				<p class="font-work-sans text-[24px] leading-[28px] text-black">
					Seleccione la <span class="font-bold">Regional</span>
				</p>
			</div>

			<!-- Contenedor del Select y Botón -->
			<div class="search-row">
				<!-- Dropdown de Departamentos -->
				<div class="select-container">
					<select
						v-model="selectedCountry"
						class="custom-select">
						<option value="" disabled selected>Seleccione Regional</option>
						<option 
							v-for="depto in departamentos" 
							:key="depto.code" 
							:value="depto">
							{{ depto.name }}
						</option>
					</select>
					<!-- Flecha del selector -->
					<svg class="select-arrow" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L6.5 7L12 1" stroke="#71277A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>

				<!-- Botón de Búsqueda -->
				<Button
					class="search-button"
					type="button"
					label="Buscar"
					icon="pi pi-search"
					:loading="loading"
					@click="validateAndSearch" />
			</div>

			<!-- Componente de PopUp -->
			<PopUp
				:data="fetchData"
				:isOpen="isModalOpen"
				:image="selectedImage"
				:sede="selectedSede"
				:departamento="selectedCountry?.name"
				@close="isModalOpen = false" />
		</div>

		<Dialog
			v-model:visible="noResultsModal"
			modal
			header="Búsqueda Fallida"
			:style="{ width: '30rem' }"
			:closable="true"
			:draggable="true">
			<p class="m-0 text-customPurple">
				Por favor seleccione una entidad y un departamento para continuar con la
				búsqueda.
			</p>
			<template #footer>
				<Button
					label="Entendido"
					@click="noResultsModal = false"
					class="p-button-text" />
			</template>
		</Dialog>
	</div>
</template>

<script setup>
import { ref } from "vue";
import lineaAten from "@/assets/imgLineasAtencion/lineaAten.svg";
import LogoSenaverde from "@/assets/images/logosenaverde.svg";
import LogCertLab from "@/assets/imgLineasAtencion/LogCertLab.svg";
import LogoApe from "@/assets/images/LogoApe.png";
import FondoEmprender from "@/assets/images/FondoEmprender.png";
// Componentes de íconos
import SenaLaIcon from "@/components/Icons/SenaLaIcon.vue";
import ApeLaIcon from "@/components/Icons/ApeLaIcon.vue";
import FondoEmprenderIcon from "@/components/Icons/FondoEmprenderIcon.vue";
import CompetenciasLaboralLaIcon from "@/components/Icons/CompetenciasLaboralLaIcon.vue.vue";
// Imágenes de fondo para las cards
import BgSena from "@/assets/images/LaSena.svg";
import BgApe from "@/assets/images/LaApe.svg";
import BgCompetencias from "@/assets/images/Lacompetencias.svg";
import BgFondoEmprender from "@/assets/images/LaFondoEmprender.svg";
import PopUp from "./PopUpLineasAtencion.vue";
import Button from "primevue/button";

const selectedCountry = ref("");
const selectedInfo = ref(null);
const selectedImage = ref(null);
const selectedSede = ref("");
const isModalOpen = ref(false);
const fetchData = ref([]);
const loading = ref(false);
const selectedEntity = ref(null);
const noResultsModal = ref(false);
const host = import.meta.env.VITE_HOST;

// const selectedDepart = ref (null);
let entity;

const sedes = [
	"SERVICIO NACIONAL DE APRENDIZAJE SENA",
	"AGENCIA PUBLICA DE EMPLEO",
	"CERTIFICACION COMPETENCIAS LABORALES",
	"FONDO EMPRENDER",
];

const departamentos = ref([
	{ name: "Amazonas", code: "91" },
	{ name: "Antioquia", code: "05" },
	{ name: "Arauca", code: "81" },
	{ name: "Atlantico", code: "08" },
	{ name: "Bolivar", code: "13" },
	{ name: "Boyacá", code: "15" },
	{ name: "Caldas", code: "17" },
	{ name: "Caquetá", code: "18" },
	{ name: "Casanare", code: "85" },
	{ name: "Cauca", code: "19" },
	{ name: "Cesar", code: "20" },
	{ name: "Chocó", code: "27" },
	{ name: "Cundinamarca", code: "25" },
	{ name: "Cordoba", code: "23" },
	{ name: "Guainia", code: "94" },
	{ name: "Guaviare", code: "95" },
	{ name: "Huila", code: "41" },
	{ name: "La Guajira", code: "44" },
	{ name: "Magdalena", code: "47" },
	{ name: "Meta", code: "50" },
	{ name: "Nariño", code: "52" },
	{ name: "Norte de Santander", code: "54" },
	{ name: "Putumayo", code: "86" },
	{ name: "Quindio", code: "63" },
	{ name: "Risaralda", code: "66" },
	{ name: "San Andres, Providencia y Santa Catalina", code: "88" },
	{ name: "Santander", code: "68" },
	{ name: "Sucre", code: "70" },
	{ name: "Tolima", code: "73" },
	{ name: "Valle del Cauca", code: "76" },
	{ name: "Vaupés", code: "97" },
	{ name: "Vichada", code: "99" },
]);

const validateAndSearch = async () => {
	if (!selectedEntity.value || !selectedCountry.value) {
		noResultsModal.value = true; // Mostrar modal si faltan datos
		return;
	}

	// Construir la URL dinámica
	const fetchOptions = {
		url: `${host}:8082/api/v1/victimas/lines/${selectedEntity.value}/${selectedCountry.value.name}`,
		options: {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		},
	};

	console.log("Realizando búsqueda...");

	loading.value = true; // Mostrar indicador de carga
	try {
		const response = await fetch(fetchOptions.url, fetchOptions.options);
		if (!response.ok) throw new Error("Error en la solicitud");

		const data = await response.json();
		console.log("Datos obtenidos:", data);

		// Aquí puedes actualizar el estado con los datos recibidos
		fetchData.value = data;
		isModalOpen.value = true; // Mostrar resultados en un modal
	} catch (error) {
		console.error("Error al realizar la búsqueda:", error);
	} finally {
		loading.value = false; // Ocultar indicador de carga
	}
};

const updateSelectedInfo = () => {
	const selected = departamentos.value.find(
		(dep) => dep.code === selectedCountry.value?.code
	);
	selectedInfo.value = selected ? selected : null;
	console.log(selectedInfo.value);
};

const setEntity = (newEntity) => {
	entity = newEntity;
	console.log(entity);
};

const selectImage = (image) => {
	selectedImage.value = image;
};

const selectSede = (sede) => {
	selectedSede.value = sede;
};

const searchDepartamentt = async (fetchOptions) => {
	const { url, options } = fetchOptions;
	let newUrl = url + `/${entity}/${selectedInfo.value.name}`;
	console.log(newUrl);

	loading.value = true;

	try {
		// Agregamos un delay artificial (opcional)
		await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms de delay

		const response = await fetch(newUrl, options);
		const json = await response.json();
		if (!response.ok)
			throw {
				error: true,
				errorStatus: response.status,
				errorMsg: response.statusText,
			};
		console.log(json);
		fetchData.value = json;
		isModalOpen.value = true;
	} catch (error) {
		if (!error.error) error.error = true;
		console.log(error);
	} finally {
		// Desactivamos el loading al finalizar
		loading.value = false;
		newUrl = "";
	}
};

const handleEntityClick = (options) => {
	const { image, sede, newEntity } = options;
	
	// Si se hace clic en la misma entidad, deseleccionarla
	if (selectedEntity.value === newEntity) {
		selectedEntity.value = null;
		selectedImage.value = null;
		selectedSede.value = "";
		entity = null;
		return;
	}
	
	// Si se hace clic en una entidad diferente, seleccionarla
	setEntity(newEntity);
	selectImage(image);
	selectSede(sede);
	selectedEntity.value = newEntity;
};
</script>

<style scoped>
/* Contenedor principal con fondo gris */
.lineas-atencion-container {
	min-height: 100vh;
	position: relative;
	overflow: hidden;
	font-family: 'Work Sans', sans-serif;
}

/* Cards de entidades con imágenes de fondo */
.entity-card {
	position: relative;
	width: 368px;
	height: 183px;
	background: #ffffff;
	border-radius: 20px;
	cursor: pointer;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

/* Imagen de fondo específica para SENA */
.entity-card:nth-child(1) {
	background-image: url('@/assets/images/LaSena.svg');
}

/* Imagen de fondo específica para APE */
.entity-card-ape {
	background-image: url('@/assets/images/LaApe.svg');
}

/* Imagen de fondo específica para Certificaciones */
.entity-card-cert {
	background-image: url('@/assets/images/Lacompetencias.svg');
}

/* Imagen de fondo específica para Fondo Emprender */
.entity-card-fondo {
	background-image: url('@/assets/images/LaFondoEmprender.svg');
}

/* Gradiente más oscuro al hacer hover */
.entity-card:hover .entity-card-overlay {
	background: linear-gradient(180deg, #ffffff 0%, rgba(81, 20, 88, 0.7) 0.01%);
}

/* Overlay degradado morado que va SOBRE la imagen de fondo */
.entity-card-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(180deg, #ffffff 0%, rgba(81, 20, 88, 0.5) 0.01%);
	background-blend-mode: multiply;
	border-radius: 20px;
	z-index: 1;
	pointer-events: none;
	transition: background 0.9s ease;
}

/* Logo centrado sobre el overlay */
.entity-card-logo {
	position: relative;
	z-index: 2;
	width: 93px;
	height: 89.74px;
	object-fit: contain;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.6));
}

.entity-card-logo-ape {
	position: relative;
	z-index: 2;
	width: 168.92px;
	height: 64px;
	object-fit: contain;
	filter: drop-shadow(0px 2.87721px 2.87721px rgba(0, 0, 0, 0.62));
}

.entity-card-logo-cert {
	position: relative;
	z-index: 2;
	width: 319.86px;
	height: 46px;
	object-fit: contain;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.6));
}

.entity-card-logo-fondo {
	position: relative;
	z-index: 2;
	width: 286px;
	height: 58px;
	object-fit: contain;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.6));
}

/* Card seleccionada con borde amarillo */
.entity-card-selected {
	box-shadow: 0 0 0 3px #FFD700, 0px 4px 4px rgba(0, 0, 0, 0.25);
}

/* Gradiente oscuro para card seleccionada */
.entity-card-selected .entity-card-overlay {
	background: linear-gradient(180deg, #ffffff 0%, rgba(81, 20, 88, 0.7) 0.01%);
}

/* Contenedor del select y botón en la misma fila */
.search-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;
	width: 100%;
}

/* Contenedor del select */
.select-container {
	position: relative;
	width: 1149px;
	flex-shrink: 0;
}

/* Select personalizado */
.custom-select {
	width: 100%;
	height: 50px;
	background: #ffffff;
	border: none;
	border-radius: 50px;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
	font-family: 'Work Sans', sans-serif;
	font-size: 18px;
	color: #000000;
	padding: 0 50px 0 24px;
	appearance: none;
	cursor: pointer;
	outline: none;
}

.custom-select:hover {
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}

.custom-select:focus {
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	outline: none;
}

/* Flecha del select */
.select-arrow {
	position: absolute;
	right: 24px;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
}

/* Botón de búsqueda verde */
.search-button {
	display: flex !important;
	flex-direction: row !important;
	justify-content: center !important;
	align-items: center !important;
	padding: 10px !important;
	gap: 10px !important;
	background: #00AA00 !important;
	border: none !important;
	border-radius: 30px !important;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
	cursor: pointer !important;
	transition: all 0.3s ease;
	width: 370px !important;
	height: 50px !important;
	flex-shrink: 0 !important;
}

.search-button:hover {
	background: #009900 !important;
	transform: translateY(-2px);
	box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3) !important;
}

.search-button:active {
	transform: translateY(0);
}

:deep(.search-button .p-button-icon) {
	color: #ffffff !important;
	font-size: 20px !important;
	width: 20px !important;
	height: 20px !important;
	flex: none;
	order: 0;
	flex-grow: 0;
}

:deep(.search-button .p-button-label) {
	width: 80px !important;
	height: 28px !important;
	font-family: 'Work Sans', sans-serif !important;
	font-style: normal !important;
	font-weight: 400 !important;
	font-size: 24px !important;
	line-height: 28px !important;
	color: #ffffff !important;
	flex: none;
	order: 1;
	flex-grow: 0;
}

/* Tipografía Work Sans */
.font-work-sans {
	font-family: 'Work Sans', sans-serif;
}
</style>
