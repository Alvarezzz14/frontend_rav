<template>
	<div class="relative w-full h-[110vh] overflow-hidden">
		<!-- Frame 620 - Título con icono de Mapa -->
		<div class="absolute top-[52px] flex flex-row items-center gap-3 w-[141px] h-[41px]">
			<!-- Group 1322 - Icono de Mapa con círculo morado -->
			<div class="relative w-[30px] h-[29.93px] flex-none">
				<!-- Círculo morado de fondo -->
				<div class="absolute inset-0 w-[30px] h-[29.93px] bg-[#71277A] rounded-full"></div>
				<!-- Icono blanco centrado, tamaño 16.61x15.91px -->
				<div class="absolute inset-0 flex items-center justify-center">
					<IconMap 
						:size="16.61" 
						color="white" 
						class="w-[16.61px] h-[15.91px]" />
				</div>
			</div>
			
			<!-- Texto "Mapa" -->
			<h1 class="font-work-sans font-bold text-[30px] leading-[35px] text-[#71277A] flex-none">
				Mapa
			</h1>
		</div>

		<!-- Selector del Departamento -->
		<div class="absolute top-[115px] w-[520px] h-10">
			<Select
				v-model="selectedCountry"
				:options="departamentos"
				placeholder="Seleccione departamento"
				class="w-[520px] h-10 !border-0 !rounded-[30px] !shadow-[0px_4px_4px_rgba(0,0,0,0.25)] !bg-white"
				@change="handleChange">
				<template #value="slotProps">
					<div
						v-if="slotProps.value"
						class="flex gap-2 items-center font-work-sans font-normal text-[18px] leading-[21px] text-black">
						<img 
							:src="slotProps.value.flagUrl" 
							:alt="slotProps.value.name"
							class="w-6 h-6 rounded-full object-cover" />
						<div>{{ slotProps.value.name }}</div>
					</div>
					<span v-else class="font-work-sans font-normal text-[18px] leading-[21px] text-black">
						{{ slotProps.placeholder }}
					</span>
				</template>
				<template #dropdownicon>
					<!-- Flecha triangular morada -->
					<svg
						width="13"
						height="8"
						viewBox="0 0 13 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="ml-2">
						<path d="M1 1L6.5 7L12 1" stroke="#71277A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</template>
				<template #option="slotProps">
					<div class="flex items-center gap-2 font-work-sans font-normal text-[18px] text-black py-2">
						<img 
							:src="slotProps.option.flagUrl" 
							:alt="slotProps.option.name"
							class="w-6 h-6 rounded-full object-cover" />
						<p>{{ slotProps.option.name }}</p>
					</div>
				</template>
			</Select>
		</div>

		<!-- Tarjeta de Información del Departamento -->
		<!-- Group 574 -->
		<div 
			v-if="selectedInfo" 
			class="absolute top-[192px] w-[518px] h-[371px]"
			style="filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));">
			
			<!-- Frame 515 - Imagen principal -->
			<div class="absolute w-[518px] h-[141px] flex flex-col items-start p-0 gap-[10px]">
				<img
					:src="selectedInfo.imageUrl"
					:alt="selectedInfo.name"
					class="w-[518px] h-[141px] object-cover rounded-t-[20px] flex-none order-0 self-stretch flex-grow-0" />
			</div>

			<!-- Frame 514 - Encabezado con nombre y fondo color -->
			<div
				class="absolute top-[125px] w-[518px] h-[68px] flex flex-row justify-center items-start pt-3 px-0 pb-0 gap-[212px]"
				style="background: linear-gradient(180deg, #71277A 0%, #410A48 100%);">
				
				<!-- Nombre del departamento -->
				<h2 class="w-[202px] h-[47px] font-work-sans font-bold text-[40px] leading-[47px] text-white flex-none order-0 flex-grow-0 m-0">
					{{ selectedInfo.name }}
				</h2>
				
				<!-- Group 363 - Imagen del mapa del departamento -->
				<div class="w-[44px] h-[44px] flex-none order-1 flex-grow-0 relative">
					<!-- Ellipse 7 - Fondo blanco circular -->
					<div class="absolute w-[44px] h-[44px] bg-white rounded-full"></div>
					<!-- Icono del mapa -->
					<img
						:src="selectedInfo.imageMap"
						class="absolute inset-0 w-full h-full object-contain p-1.5" />
				</div>
			</div>

			<!-- Frame 516 - Descripción del departamento -->
			<div class="absolute top-[193px] w-[518px] h-[184px] bg-white rounded-b-[20px] flex flex-row justify-center items-center px-[10px] pb-[10px] pt-0 gap-[10px]">
				<p class="w-[447px] h-[152px] font-work-sans font-normal text-[16px] leading-[19px] text-black flex-none order-0 flex-grow-0">
					La cantidad de victimas en el departamento es de:
					<strong class="font-bold">{{
						formatNumber(department.total_victimas)
					}}</strong>
					personas
				</p>
			</div>
		</div>

		<!-- Mapa de Colombia -->
		<div class="absolute right-[10px] top-[3%] -translate-y-1/2 w-[916px] h-[916px]">
			<svg
				class="w-full h-full"
				viewBox="0 0 780 780"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="390" cy="390" r="390" fill="white" />
				<g>
					<!-- Aquí puedes agregar los paths de los departamentos -->
					<path
						v-for="dep in departamentos"
						:key="dep.code"
						:d="departmentPaths[dep.code]"
						:fill="
							selectedCountry && selectedCountry.code === dep.code
								? '#71277A'
								: 'rgba(119, 39, 122, 0.05)'
						"
						:stroke="
							selectedCountry && selectedCountry.code === dep.code
								? '#71277A'
								: 'none'
						" />
				</g>
			</svg>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Select from "primevue/select";
import IconMap from "@/components/Icons/IconMap.vue";
import { departamentos } from "@/data/departamentosMapa/departamentos";
import { getDepartmentDescription } from "@/data/departamentosMapa/descripciones";
import { departmentPaths } from "@/data/departamentosMapa/paths";
import FetchService from "@/services/fetchService";

// Reactive data
const selectedInfo = ref(null);
const selectedCountry = ref("");
let department = ref([]);
const fetchService = new FetchService();
const host = import.meta.env.VITE_HOST;

//Formatear numeros
const formatNumber = (num) => {
	return new Intl.NumberFormat("es-ES").format(num); // Formato español con separadores de miles
};

const handleChange = () => {
	getDepartment();
	updateSelectedInfo();
};

const getDepartment = async () => {
	if (!selectedCountry.value || !selectedCountry.value.name) return;
	
	const nameDeparment = selectedCountry.value.name.toUpperCase();
	console.log(nameDeparment);
	const url = `${host}:8082/api/v1/victimas/department/${nameDeparment}`;
	await fetchService.get(url, {
		fetchOptions: {
			method: "GET",
			headers: {
				Accept: "aplicattion/json",
			},
		},
		success: (response) => (department.value = response),
		error: (response) => console.log(response),
	});

	console.log(department.value);
};

// Methods
const updateSelectedInfo = () => {
	if (selectedCountry.value) {
		const selected = departamentos.find(
			(dep) => dep.code === selectedCountry.value.code
		);
		if (selected) {
			selectedInfo.value = {
				...selected,
				description: getDepartmentDescription(selected.name),
				path: departmentPaths[selected.code],
			};
		} else {
			selectedInfo.value = null;
		}
	} else {
		selectedInfo.value = null;
	}
};
</script>

<style scoped>
/* Estilos personalizados para el Select */
:deep(.p-select) {
	border: none !important;
	border-radius: 30px !important;
	background: white !important;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
	height: 40px !important;
}

:deep(.p-select:not(.p-disabled):hover) {
	border-color: transparent !important;
}

:deep(.p-select:not(.p-disabled).p-focus) {
	border-color: transparent !important;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
	outline: none !important;
}

:deep(.p-select .p-select-label) {
	padding: 0.5rem 5% !important;
	font-family: 'Work Sans', sans-serif !important;
	font-weight: 400 !important;
	font-size: 18px !important;
	line-height: 21px !important;
	color: #000000 !important;
}

:deep(.p-select .p-select-dropdown) {
	color: #71277A !important;
}

/* Panel desplegable del select */
:deep(.p-select-overlay) {
	margin-top: 0.5rem !important;
	border-radius: 20px !important;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
	border: none !important;
}

/* Opciones del select */
:deep(.p-select-option) {
	font-family: 'Work Sans', sans-serif !important;
	font-size: 18px !important;
	font-weight: 400 !important;
	color: #000000 !important;
	padding: 0.5rem 1rem !important;
}

:deep(.p-select-option:hover) {
	background-color: rgba(113, 39, 122, 0.1) !important;
}

:deep(.p-select-option.p-focus) {
	background-color: rgba(113, 39, 122, 0.1) !important;
}

:deep(.p-select-option.p-select-option-selected) {
	background-color: rgba(113, 39, 122, 0.2) !important;
	color: #71277A !important;
}
</style>
