<template>
  <div
    class="lineas-atencion-container min-h-[90vh] -mt-[25px] md:mt-[0px] relative overflow-hidden font-work-sans w-full mx-auto md:px-4 max-w-[440px] md:max-w-none md:px-0 md:mx-0"
  >
    <!-- Sección Superior: Título e Icono -->
    <div class="flex items-center gap-3 md:pt-8 pb-4 md:pt-4">
      <div
        class="flex items-center justify-center w-[30px] h-[30px] md:w-[30px] md:h-[30px] bg-azul-gradian rounded-full"
      >
        <img
          :src="lineaAten"
          alt="Icono de Líneas de Atención"
          class="w-4 h-4"
        />
      </div>
      <h1
        class="text-azul2Ape text-[21px] leading-[25px] font-bold font-work-sans md:text-[30px] md:leading-[35px]"
      >
        Líneas de atención
      </h1>
    </div>

    <!-- Sección de Selección de Entidades -->
    <div class="flex flex-col gap-6">
      <!-- Subtítulo de Selección con Número -->
      <div class="flex items-center gap-3">
        <div
          class="flex items-center justify-center w-[20px] h-[20px] md:w-[35px] md:h-[35px] bg-azul-gradian rounded-full"
        >
          <span
            class="text-white font-bold text-[14px] md:text-[24px] leading-none font-work-sans"
            >1</span
          >
        </div>
        <p class="font-work-sans text-[24px] leading-[28px] text-black">
          Seleccione la <span class="font-bold">Entidad</span>
        </p>
      </div>

      <!-- Contenedor de Cards de Entidades (grid 2 columnas en mobile, layout desktop intacto) -->
      <div
        class="grid grid-cols-2 place-items-center gap-x-4 gap-y-4 md:mb-6 md:flex md:flex-wrap md:justify-start md:gap-5"
      >
        <!-- SENA Card -->
        <div
          class="entity-card entity-card-sena relative w-[184px] h-[185px] md:w-[368px] md:h-[183px] bg-white rounded-[20px] cursor-pointer overflow-hidden flex items-center justify-center transition-all duration-300 shadow bg-[length:320px_183px] md:bg-cover bg-[position:-120px_center] md:bg-center bg-no-repeat"
          :class="{ 'entity-card-selected': selectedEntity === 'sena' }"
          @click="
            () =>
              handleEntityClick({
                image: LogoSenaverde,
                sede: sedes[0],
                newEntity: 'sena',
              })
          "
        >
          <div class="entity-card-overlay"></div>
          <SenaLaIcon class="entity-card-logo" />
        </div>

        <!-- APE Card -->
        <div
          class="entity-card entity-card-ape relative w-[184px] h-[185px] md:w-[368px] md:h-[183px] bg-white rounded-[20px] cursor-pointer overflow-hidden flex items-center justify-center transition-all duration-300 shadow bg-[length:272px_183px] md:bg-cover bg-[position:-44px_center] md:bg-center bg-no-repeat"
          :class="{ 'entity-card-selected': selectedEntity === 'ape' }"
          @click="
            () =>
              handleEntityClick({
                image: LogoApe,
                sede: sedes[1],
                newEntity: 'ape',
              })
          "
        >
          <div class="entity-card-overlay"></div>
          <ApeLaIcon class="entity-card-logo-ape" />
        </div>

        <!-- Certificaciones Card -->
        <div
          class="entity-card entity-card-cert relative w-[184px] h-[185px] md:w-[368px] md:h-[183px] bg-white rounded-[20px] cursor-pointer overflow-hidden flex items-center justify-center transition-all duration-300 shadow bg-[length:180px_245px] md:bg-cover bg-[position:2px_-57px] md:bg-center bg-no-repeat"
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
          "
        >
          <div class="entity-card-overlay"></div>
          <CompetenciasLaboralLaIcon class="entity-card-logo-cert" />
        </div>

        <!-- Fondo Emprender Card -->
        <div
          class="entity-card entity-card-fondo relative w-[184px] h-[185px] md:w-[368px] md:h-[183px] bg-white rounded-[20px] cursor-pointer overflow-hidden flex items-center justify-center transition-all duration-300 shadow bg-[length:262px_380px] md:bg-cover bg-[position:-52px_-120px] md:bg-center bg-no-repeat"
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
          "
        >
          <div class="entity-card-overlay"></div>
          <FondoEmprenderIcon class="entity-card-logo-fondo" />
        </div>
      </div>

      <!-- Sección de Selección de Regional con Número -->
      <div class="flex items-center gap-3 md:mt-4">
        <div
          class="flex items-center justify-center w-[20px] h-[20px] md:w-[35px] md:h-[35px] bg-azul-gradian rounded-full"
        >
          <span
            class="text-white font-bold text-[14px] md:text-[24px] leading-none font-work-sans"
            >2</span
          >
        </div>
        <p class="font-work-sans text-[24px] leading-[28px] text-black">
          Seleccione la <span class="font-bold">Regional</span>
        </p>
      </div>

      <!-- Contenedor del Select y Botón -->
      <div
        class="search-row flex flex-col md:flex-row items-center gap-5 w-full mt-4"
      >
        <!-- Dropdown de Departamentos -->
        <div
          class="select-container relative w-[380px] md:w-[800px] lg:w-[1149px] flex-shrink-0 mx-auto"
        >
          <RavSelect
            v-model="selectedCountry"
            :options="departamentos"
            placeholder="Seleccione Regional"
            :showImage="false"
            :withShadow="true"
            :bgColor="'#FFFFFF'"
            inputClass="w-full h-[40px] md:h-[50px]"
            :height="'40px'"
            :overlayPaddingTop="'30px'"
          />
        </div>

        <!-- Botón de Búsqueda -->
        <button
          type="button"
          :disabled="loading"
          @click="validateAndSearch"
          class="bg-verdeApe border-none hover:brightness-95 active:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full w-[380px] h-[40px] md:w-[370px] md:h-[40px] shadow-md transition-all duration-300 flex justify-center items-center gap-2 font-work-sans font-normal text-[18px] md:font-semibold md:text-[20px] mx-auto mt-4 md:mt-0"
        >
          <span
            :class="['pi', loading ? 'pi-spinner animate-spin' : 'pi-search']"
            class="text-[20px]"
          ></span>
          <span>Buscar</span>
        </button>
      </div>

      <!-- Componente de PopUp -->
      <PopUp
        :data="fetchData"
        :isOpen="isModalOpen"
        :image="selectedImage"
        :sede="selectedSede"
        :departamento="selectedCountry?.name"
        @close="isModalOpen = false"
      />
    </div>

    <Dialog
      v-model:visible="noResultsModal"
      modal
      header="Búsqueda Fallida"
      :style="{ width: '30rem' }"
      :closable="true"
      :draggable="true"
    >
      <p class="m-0 text-customPurple">
        Por favor seleccione una entidad y un departamento para continuar con la
        búsqueda.
      </p>
      <template #footer>
        <Button
          label="Entendido"
          @click="noResultsModal = false"
          class="p-button-text"
        />
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
import CompetenciasLaboralLaIcon from "@/components/Icons/CompetenciasLaboralLaIcon.vue";
// Imágenes de fondo para las cards
import PopUp from "./PopUpLineasAtencion.vue";
import RavSelect from "@/components/Inputs/RavSelect.vue";

const selectedCountry = ref(null);
const selectedImage = ref(null);
const selectedSede = ref("");
const isModalOpen = ref(false);
const fetchData = ref([]);
const loading = ref(false);
const selectedEntity = ref(null);
const noResultsModal = ref(false);
const host = import.meta.env.VITE_HOST;

// const selectedDepart = ref (null);

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
    return;
  }

  // Si se hace clic en una entidad diferente, seleccionarla
  selectImage(image);
  selectSede(sede);
  selectedEntity.value = newEntity;
};
</script>

<style scoped>
/* Contenedor principal migrado a Tailwind (clases en el template) */

/* Imagen de fondo específica para SENA */
.entity-card-sena {
  background-image: url("@/assets/images/LaSena.svg");
}

/* Imagen de fondo específica para APE */
.entity-card-ape {
  background-image: url("@/assets/images/LaApe.svg");
}

/* Imagen de fondo específica para Certificaciones */
.entity-card-cert {
  background-image: url("@/assets/images/Lacompetencias.svg");
}

/* Imagen de fondo específica para Fondo Emprender */
.entity-card-fondo {
  background-image: url("@/assets/images/LaFondoEmprender.svg");
}

/* Gradiente más oscuro al hacer hover */
.entity-card:hover .entity-card-overlay {
  background: linear-gradient(180deg, #ffffff 0%, rgba(0, 93, 202, 0.6) 0.01%);
}

/* Overlay degradado morado que va SOBRE la imagen de fondo */
.entity-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #ffffff 0%, rgba(0, 93, 202, 0.2) 0.01%);
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
  box-shadow: 0 0 0 3px #ffd700, 0px 4px 4px rgba(0, 0, 0, 0.25);
}

/* Gradiente oscuro para card seleccionada */
.entity-card-selected .entity-card-overlay {
  background: linear-gradient(180deg, #ffffff 0%, rgba(0, 93, 202, 0.8) 0.01%);
}


/* Tipografía Work Sans */
.font-work-sans {
  font-family: "Work Sans", sans-serif;
}

/* Quitar padding por defecto en todos los <p> dentro del componente */
p {
  margin: 0;
}
</style>
