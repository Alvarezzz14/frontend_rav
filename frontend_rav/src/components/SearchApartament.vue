<template>
  <div class="w-full h-auto p-px flex flex-col">
    <!-- Contenedor del Select alineado con el título -->
    <div class="flex flex-col items-start space-y-4 mt-20 md:mt-32 ml-4 md:ml-[10%]">
      <!-- Selector del Departamento -->
      <div class="w-full max-w-xs md:max-w-md">
        <Select v-model="selectedCountry" :options="departamentos" placeholder="Seleccione departamento"
          class="w-full rounded-lg shadow-sm text-customPurple !border !border-customPurple"
          @change="updateSelectedInfo">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex gap-2 items-center font-semibold text-customPurple">
              <img :alt="slotProps.value.name" :src="slotProps.value.flagUrl" class="w-6 h-6" />
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else class="text-customPurple">{{ slotProps.placeholder }}</span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center font-medium text-customPurple">
              <img :alt="slotProps.name" :src="slotProps.option.flagUrl" class="w-6 h-6 mr-2" />
              <p>{{ slotProps.option.name }}</p>
            </div>
          </template>
          <template #dropdownicon>
            <i class="pi pi-map"></i>
          </template>
        </Select>
      </div>

      <!-- Tarjeta de Información del Departamento -->
      <div v-if="selectedInfo" class="w-full max-w-md p-4 rounded-lg shadow-lg bg-white">
        <!-- Imagen principal -->
        <img :src="selectedInfo.imageUrl" :alt="selectedInfo.name" class="rounded-t-lg w-full h-40 object-cover" />

        <!-- Encabezado con nombre y fondo color -->
        <div class="bg-customPurple text-white py-2 px-4 flex items-center">
          <h2 class="text-lg font-bold">{{ selectedInfo.name }}</h2>
          <!-- Imagen del mapa del departamento seleccionado -->
          <img :src="selectedInfo.imageMap" class="bg-white rounded-3xl ml-auto w-11 h-11" />
        </div>

        <!-- Descripción del departamento -->
        <div class="p-4 text-gray-600">
          <p>{{ getDepartmentDescription(selectedInfo.name) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import AmazonasBandera from "@/assets/images/webp/amazonas.webp";
import AmazonasCiudad from "@/assets/images/imagenDepartamento/Amazonas.svg";
import AmazonasMapa from "@/assets/images/FragmentoDepartamentos/Amazonas.svg";

import AntioquiaBandera from "@/assets/images/webp/antioquia.webp";
import AntioquiaCiudad from "@/assets/images/imagenDepartamento/antioquia.svg";
import AntioquiaMapa from "@/assets/images/FragmentoDepartamentos/Antioquia.svg";

import AraucaBandera from "@/assets/images/webp/Arauca.webp";
import AraucaCiudad from "@/assets/images/imagenDepartamento/Arauca.svg";
import AraucaMapa from "@/assets/images/FragmentoDepartamentos/Arauca.svg";

import AtlanticoBandera from "@/assets/images/webp/atlantico.webp";
import AtlanticoCiudad from "@/assets/images/imagenDepartamento/atlantico.svg";
import AtlanticoMapa from "@/assets/images/FragmentoDepartamentos/Atlantico.svg";

import BolivarBandera from "@/assets/images/webp/bolivar.webp";
import BolivarCiudad from "@/assets/images/imagenDepartamento/bolivar.svg";
import BolivarMapa from "@/assets/images/FragmentoDepartamentos/Bolivar.svg";

import BoyacaBandera from "@/assets/images/webp/boyaca.webp";
import BoyacaCiudad from "@/assets/images/imagenDepartamento/boyaca.svg";
import BoyacaMapa from "@/assets/images/FragmentoDepartamentos/Boyaca.svg";

import CaldasBandera from "@/assets/images/webp/caldas.webp";
import CaldasCiudad from "@/assets/images/imagenDepartamento/caldas.svg";
import CaldasMapa from "@/assets/images/FragmentoDepartamentos/Caldas.svg";

import CaquetaBandera from "@/assets/images/webp/caqueta.webp";
import CaquetaCiudad from "@/assets/images/imagenDepartamento/caqueta.svg";
import CaquetaMapa from "@/assets/images/FragmentoDepartamentos/Caqueta.svg";

import CasanareBandera from "@/assets/images/webp/casanare.webp";
import CasanareCiudad from "@/assets/images/imagenDepartamento/casanare.svg";
import CasanareMapa from "@/assets/images/FragmentoDepartamentos/Casanare.svg";

import CaucaBandera from "@/assets/images/webp/casanare.webp";
import CaucaCiudad from "@/assets/images/imagenDepartamento/cauca.svg";
import CaucaMapa from "@/assets/images/FragmentoDepartamentos/Cauca.svg";

import CesarBandera from "@/assets/images/webp/cesar.webp";
import CesarCiudad from "@/assets/images/imagenDepartamento/cesar.svg";
import CesarMapa from "@/assets/images/FragmentoDepartamentos/Cesar.svg";

import ChocoBandera from "@/assets/images/webp/choco.webp";
import ChocoCiudad from "@/assets/images/imagenDepartamento/choco.svg";
import ChocoMapa from "@/assets/images/FragmentoDepartamentos/Choco.svg";

import CordobaBandera from "@/assets/images/webp/cordoba.webp";
import CordobaCiudad from "@/assets/images/imagenDepartamento/cordoba.svg";
import CordobaMapa from "@/assets/images/FragmentoDepartamentos/Cordoba.svg";

import CundinamarcaBandera from "@/assets/images/webp/cundinamarca.webp";
import CundinamarcaCiudad from "@/assets/images/imagenDepartamento/cundinamarca.svg";
import CundinamarcaMapa from "@/assets/images/FragmentoDepartamentos/Cundinamarca.svg";

import GuainiaBandera from "@/assets/images/webp/guainia.webp";
import GuainiaCiudad from "@/assets/images/imagenDepartamento/guainia.svg";
import GuainiaMapa from "@/assets/images/FragmentoDepartamentos/Guainia.svg";

import GuaviareBandera from "@/assets/images/webp/guaviare.webp";
import GuaviareCiudad from "@/assets/images/imagenDepartamento/guaviare.svg";
import GuaviareMapa from "@/assets/images/FragmentoDepartamentos/Guaviare.svg";

import HuilaBandera from "@/assets/images/webp/huila.webp";
import HuilaCiudad from "@/assets/images/imagenDepartamento/huila.svg";
import HuilaMapa from "@/assets/images/FragmentoDepartamentos/Huila.svg";

import GuajiraBandera from "@/assets/images/webp/guajira.webp";
import GuajiraCiudad from "@/assets/images/imagenDepartamento/guajira.svg";
import GuajiraMapa from "@/assets/images/FragmentoDepartamentos/Guajira.svg";

import MagdalenaBandera from "@/assets/images/webp/magdalena.webp";
import MagdalenaCiudad from "@/assets/images/imagenDepartamento/magdalena.svg";
import MagdalenaMapa from "@/assets/images/FragmentoDepartamentos/Magdalena.svg";

import MetaBandera from "@/assets/images/webp/meta.webp";
import MetaCiudad from "@/assets/images/imagenDepartamento/meta.svg";
import MetaMapa from "@/assets/images/FragmentoDepartamentos/Meta.svg";

import NariñoBandera from "@/assets/images/webp/nariño.webp";
import NariñoCiudad from "@/assets/images/imagenDepartamento/nariño.svg";
import NariñoMapa from "@/assets/images/FragmentoDepartamentos/Nariño.svg";

import NorteSantanderBandera from "@/assets/images/webp/norte-de-santander.webp";
import NorteSantanderCiudad from "@/assets/images/imagenDepartamento/norteSantander.svg";
import NorteSantanderMapa from "@/assets/images/FragmentoDepartamentos/Norte-de-Santander.svg";

import PutumayoBandera from "@/assets/images/webp/putumayo.webp";
import PutumayoCiudad from "@/assets/images/imagenDepartamento/putumayo.svg";
import PutumayoMapa from "@/assets/images/FragmentoDepartamentos/Putumayo.svg";

import QuindioBandera from "@/assets/images/webp/quindio.webp";
import QuindioCiudad from "@/assets/images/imagenDepartamento/quindio.svg";
import QuindioMapa from "@/assets/images/FragmentoDepartamentos/Quindio.svg";

import RisaraldaBandera from "@/assets/images/webp/risaralda.webp";
import RisaraldaCiudad from "@/assets/images/imagenDepartamento/risaralda.svg";
import RisaraldaMapa from "@/assets/images/FragmentoDepartamentos/Risaralda.svg";

import SanAndresBandera from "@/assets/images/webp/san-andres-y-providencia.webp";
import SanAndresCiudad from "@/assets/images/imagenDepartamento/san-andres.svg";
import SanAndresMapa from "@/assets/images/FragmentoDepartamentos/San-andres.svg"


import SantanderBandera from "@/assets/images/webp/santander.webp";
import SantanderCiudad from "@/assets/images/imagenDepartamento/santander.svg";
import SantanderMapa from "@/assets/images/FragmentoDepartamentos/Santander.svg";

import SucreBandera from "@/assets/images/webp/sucre.webp";
import SucreCiudad from "@/assets/images/imagenDepartamento/sucre.svg";
import SucreMapa from "@/assets/images/FragmentoDepartamentos/Sucre.svg";

import TolimaBandera from "@/assets/images/webp/tolima.webp";
import TolimaCiudad from "@/assets/images/imagenDepartamento/Tolima.svg";
import TolimaMapa from "@/assets/images/FragmentoDepartamentos/Tolima.svg";

import ValleCaucaBandera from "@/assets/images/webp/valle-del-cauca.webp";
import ValleCaucaCiudad from "@/assets/images/imagenDepartamento/valleCauca.svg";
import ValleCaucaMapa from "@/assets/images/FragmentoDepartamentos/Valle-del-cauca.svg";

import VaupesBandera from "@/assets/images/webp/vaupes.webp";
import VaupesCiudad from "@/assets/images/imagenDepartamento/vaupes.svg";
import VaupesMapa from "@/assets/images/FragmentoDepartamentos/Vaupes.svg";

import VichadaBandera from "@/assets/images/webp/vichada.webp";
import VichadaCiudad from "@/assets/images/imagenDepartamento/vichada.svg";
import VichadaMapa from "@/assets/images/FragmentoDepartamentos/Vichada.svg";


import { ref } from "vue";
import Select from "primevue/select";

const selectedCountry = ref();
const selectedInfo = ref(null);

const departamentos = ref([
  { name: "Amazonas", code: "91", flagUrl: AmazonasBandera, imageUrl: AmazonasCiudad, imageMap: AmazonasMapa },
  { name: "Antioquia", code: "05", flagUrl: AntioquiaBandera, imageUrl: AntioquiaCiudad, imageMap: AntioquiaMapa },
  { name: "Arauca", code: "81", flagUrl: AraucaBandera, imageUrl: AraucaCiudad, imageMap: AraucaMapa },
  { name: "Atlantico", code: "08", flagUrl: AtlanticoBandera, imageUrl: AtlanticoCiudad, imageMap:AtlanticoMapa },
  { name: "Bolivar", code: "13", flagUrl: BolivarBandera, imageUrl: BolivarCiudad, imageMap: BolivarMapa},
  { name: "Boyaca", code: "15", flagUrl: BoyacaBandera, imageUrl: BoyacaCiudad, imageMap: BoyacaMapa },
  { name: "Caldas", code: "17", flagUrl: CaldasBandera, imageUrl: CaldasCiudad, imageMap: CaldasMapa },
  { name: "Caqueta", code: "18", flagUrl: CaquetaBandera, imageUrl: CaquetaCiudad, imageMap: CaquetaMapa},
  { name: "Casanare", code: "85", flagUrl: CasanareBandera, imageUrl: CasanareCiudad, imageMap: CasanareMapa },
  { name: "Cauca", code: "19", flagUrl: CaucaBandera, imageUrl: CaucaCiudad, imageMap: CaucaMapa},
  { name: "Cesar", code: "20", flagUrl: CesarBandera, imageUrl: CesarCiudad, imageMap: CesarMapa },
  { name: "Choco", code: "27", flagUrl: ChocoBandera, imageUrl: ChocoCiudad, imageMap: ChocoMapa },
  { name: "Cundinamarca", code: "25", flagUrl: CundinamarcaBandera, imageUrl: CundinamarcaCiudad, imageMap: CundinamarcaMapa},
  { name: "Cordoba", code: "23", flagUrl: CordobaBandera, imageUrl: CordobaCiudad, imageMap:CordobaMapa },
  { name: "Guainia", code: "94", flagUrl: GuainiaBandera, imageUrl: GuainiaCiudad, imageMap: GuainiaMapa },
  { name: "Guaviare", code: "95", flagUrl: GuaviareBandera, imageUrl: GuaviareCiudad, imageMap: GuaviareMapa},
  { name: "Huila", code: "41", flagUrl: HuilaBandera, imageUrl: HuilaCiudad, imageMap: HuilaMapa },
  { name: "La Guajira", code: "44", flagUrl: GuajiraBandera, imageUrl: GuajiraCiudad, imageMap: GuajiraMapa },
  { name: "Magdalena", code: "47", flagUrl: MagdalenaBandera, imageUrl: MagdalenaCiudad, imageMap: MagdalenaMapa },
  { name: "Meta", code: "50", flagUrl: MetaBandera, imageUrl: MetaCiudad, imageMap:MetaMapa },
  { name: "Nariño", code: "52", flagUrl: NariñoBandera, imageUrl: NariñoCiudad, imageMap: NariñoMapa },
  { name: "Norte de Santander", code: "54", flagUrl: NorteSantanderBandera, imageUrl: NorteSantanderCiudad, imageMap: NorteSantanderMapa },
  { name: "Putumayo", code: "86", flagUrl: PutumayoBandera, imageUrl: PutumayoCiudad, imageMap: PutumayoMapa },
  { name: "Quindio", code: "63", flagUrl: QuindioBandera, imageUrl: QuindioCiudad, imageMap: QuindioMapa },
  { name: "Risaralda", code: "66", flagUrl: RisaraldaBandera, imageUrl: RisaraldaCiudad, imageMap:RisaraldaMapa },
  { name: "San Andres, Providencia y Santa Catalina", code: "88", flagUrl: SanAndresBandera, imageUrl: SanAndresCiudad, imageMap: SanAndresMapa },
  { name: "Santander", code: "68", flagUrl: SantanderBandera, imageUrl: SantanderCiudad, imageMap: SantanderMapa },
  { name: "Sucre", code: "70", flagUrl: SucreBandera, imageUrl: SucreCiudad, imageMap: SucreMapa},
  { name: "Tolima", code: "73", flagUrl: TolimaBandera, imageUrl: TolimaCiudad, imageMap: TolimaMapa },
  { name: "Valle del Cauca", code: "76", flagUrl: ValleCaucaBandera, imageUrl: ValleCaucaCiudad, imageMap:ValleCaucaMapa },
  { name: "Vaupes", code: "97", flagUrl: VaupesBandera, imageUrl: VaupesCiudad, imageMap: VaupesMapa },
  { name: "Vichada", code: "99", flagUrl: VichadaBandera, imageUrl: VichadaCiudad, imageMap: VichadaMapa},
]);

const getDepartmentDescription = (name) => {
  const descriptions = {
    Amazonas: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed odio imperdiet...",
    Antioquia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien non nisl vehicula...",
    Arauca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque magna et facilisis...",
    Atlantico: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at velit sit amet erat sagittis...",
    Bolivar: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat elit a facilisis...",
    Boyaca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere enim id urna egestas...",
    Caldas: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac sapien non dolor tincidunt...",
    Caqueta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra quam a odio...",
    Casanare: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, nisi eget elementum...",
    Cauca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lorem a justo gravida...",
    Cesar: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui vel elit cursus sodales...",
    Choco: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus dolor id velit vehicula...",
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
    Vaupes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt arcu id turpis...",
    Vichada: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum dui sed ligula..."
  };
  return descriptions[name] || "No description available.";
};

const updateSelectedInfo = () => {
  const selected = departamentos.value.find(
    (dep) => dep.code === selectedCountry.value?.code
  );
  selectedInfo.value = selected ? selected : null;
  console.log(selectedInfo.value);
};
</script>

<style scoped>
/* Puedes personalizar más estilos si es necesario */
</style>