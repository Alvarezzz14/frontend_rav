<template>
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl ">
      <!-- Icono y Título -->
      <div class="flex items-center -mb-8 ">
        <div class="p-5 bg-customPurple rounded-full mb-5">
          <!-- Icono SVG -->
          <img :src="lineaAten" alt=" Icono de Lineas de atencion" width="50" height="50" />
        </div>
        <div class="ml-3 text-center md:text-left">
          <p class="text-black mb-0 text-6xl md:text-2xl">lineas de </p>
          <h2 class="text-customPurple text-5xl md:text-5xl mt-0 font-bold">Atencion</h2>
        </div>
      </div>
    </div>

		<!-- segunda Sección: Contenedores de imagen -->
		<div class="flex flex-col gap-5 p-4 "> 
			<div class="flex items-center space-x-1 flex-auto  -mb-5"> 
		<img :src="select1" alt="Icono de selección 1" width="25" height="25" />
		 <p class="font-sans">Seleccione la</p> 
		 <h3 class="font-sans">Entidad</h3> 
		</div>
		<div class="flex  gap-5 -mb-3 "> 
			<div class="flex flex-col w-48 h-32 items-center hover:bg-gray-200 rounded-lg cursor-pointer p-2  bg-white shadow-md  ">
				<img :src="LogoSenaverde" alt="imagen logo verde sena" class="w-20 h-40" /> 
			</div> 
			<div class="flex flex-col w-48 h-32 items-center hover:bg-gray-200 rounded-lg cursor-pointer p-2  bg-white shadow-md">
				<img :src="LogoApe" alt="Imagen ape" class="object-scale-down h-48 w-32 object-center" />
			</div> 
			<div class="flex flex-col w-48 h-32 items-center hover:bg-gray-200 rounded-lg cursor-pointer p-2  bg-white shadow-md">
				<img :src="LogCertLab" alt="Imagen certificados laborales" class="object-scale-down h-48 w-32 object-center" />			 
			</div> 
			<div class="flex flex-col w-48 h-32 items-center hover:bg-gray-200 rounded-lg cursor-pointer p-2  bg-white shadow-md"> 
				<img :src="FondoEmprender" alt="Imagen fondo emprender" class="object-scale-down h-48 w-32 object-center" /> 
			</div>
		</div> 
		<div class="flex gap-5  flex-auto -mb-8">
			<h4 class="font-bold mt-1 ml-20 text-center">SENA</h4>
			<h4 class="font-bold mt-1 ml-36 text-center">APE</h4>
			<h4 class="font-bold mt-1 ml-24 text-center">CERTIFICACIONES</h4>
			<h4 class="font-bold mt-1 ml-7 text-center ">FONDO EMPRENDER</h4>
		</div>
		<!-- Tercera Sección: Seleccion de Regional -->
	<div class="flex items-center space-x-1 flex-auto  -mb-3"> 
		<img :src="select2" alt="Icono de selección 2" width="25" height="25" />
		 	<p class="font-sans">Seleccione la</p> 
		 	<h3 class="font-sans">Regional</h3> 
	</div>
		<div class="flex items-center space-x-2 h-1-md">  
        <!-- Selección de Departamento -->
		<Select v-model="selectedCountry" :options="departamentos" placeholder="Seleccione departamento"
          class="rounded-lg shadow-sm text-customPurple !border !border-customPurple h-full w-full overflow-auto"
          @change="updateSelectedInfo">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex gap-2 items-center font-semibold text-customPurple">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else class="">{{ slotProps.placeholder }}</span>
          </template>
          <template #option="slotProps">
            <div class="tex-center text-sm font-normal -mb-6 text-black">
              <p class="">{{ slotProps.option.name }}</p>
            </div>
          </template>
        </Select>
		</div> 
    <!-- Tarjeta de Información del Departamento -->
    <div v-if="selectedInfo" class=" rounded-lg shadow-lg bg-white">
        <div class="p-2 text-gray-700">
          <p>{{ getDepartmentDescription(selectedInfo.name) }}</p>
        </div>
      </div>
	<div class="flex items-center justify-center"> 
		<!-- Botón de Búsqueda -->
        <Button class="w-72 !bg-customPurple text-lg cursor-pointer border-none !text-amarillo font-bold py-2 rounded-lg shadow-md mt-4"
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
import LogoSenaverde from "@/assets/images/logosenaverde.svg";
import LogCertLab from "@/assets/imgLineasAtencion/LogCertLab.svg";
import LogoApe from "@/assets/images/logoape.png";
import FondoEmprender from "@/assets/images/fondoemprender.png";
import Select from "primevue/select";

const selectedCountry = ref();
const selectedInfo = ref(null);

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

const getDepartmentDescription = (name) => {
const descriptions = {
    Amazonas: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed odio imperdiet...",
    Antioquia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien non nisl vehicula...",
    Arauca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque magna et facilisis...",
    Atlantico: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at velit sit amet erat sagittis...",
    Bolivar: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat elit a facilisis...",
    Boyacá: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere enim id urna egestas...",
    Caldas: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac sapien non dolor tincidunt...",
    Caquetá: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra quam a odio...",
    Casanare: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, nisi eget elementum...",
    Cauca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lorem a justo gravida...",
    Cesar: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui vel elit cursus sodales...",
    Chocó: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus dolor id velit vehicula...",
    Cundinamarca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel dui id neque varius...",
    Cordoba: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet risus a nibh facilisis...",
    Guainia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac turpis at lectus vestibulum...",
    Guaviare: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt turpis sed purus...",
    Huila: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum felis ac ligula gravida...",
    La_Guajira: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at massa sed metus...",
    Magdalena: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et justo id mauris ultricies...",
    Meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in neque eu orci fermentum...",
    Nariño: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget risus eu elit venenatis...",
    Norte_de_Santander: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis dui eu...",
    Putumayo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed eros tincidunt, placerat...",
    Quindio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod orci eget vehicula...",
    Risaralda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet leo non nulla iaculis...",
    San_Andres_Providencia_y_Santa_Catalina: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    Santander: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget urna sit amet dui...",
    Sucre: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper justo id lacus...",
    Tolima: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ligula ut est vehicula...",
    Valle_del_Cauca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec dui...",
    Vaupés: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt arcu id turpis...",
    Vichada: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum dui sed ligula..."
  };
  return descriptions[name] || "No description available.";
};

const updateSelectedInfo = () => {

  const selected = departamentos.value.find((dep) => dep.code === selectedCountry.value?.code);
  selectedInfo.value = selected ? selected : null;
  console.log(selectedInfo.value);
};
</script>

<style scoped>
/* No additional CSS needed as everything is styled with Tailwind CSS */
</style>