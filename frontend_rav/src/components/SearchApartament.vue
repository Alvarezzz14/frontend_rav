<template>
    <div class="flex flex-col items-center space-y-4">
        <!-- Selector del Departamento -->
        <div class="w-full max-w-xs">
            <Select v-model="selectedCountry" :options="departamentos" placeholder="Seleccione departamento"
                class="w-full rounded-lg shadow-sm text-customPurple !border !border-customPurple"
                @change="updateSelectedInfo">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex gap-2 items-center font-semibold text-customPurple">
                        <img :alt="slotProps.value.name" :src="slotProps.value.flagUrl" class="w-6 h-6" />
                        <div>{{ slotProps.value.name }}</div>
                    </div>
                    <span v-else class="text-customPurple">{{
                        slotProps.placeholder
                        }}</span>
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
                <p>
                    {{ getDepartmentDescription(selectedInfo.name) }}
                  
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Select from "primevue/select";

const selectedCountry = ref();
const selectedInfo = ref(null);

const departamentos = ref([
    { name: "Amazonas", code: "91", flagUrl: "/images/webp/amazonas.webp", imageUrl: "/images/imagenDepartamento/Amazonas.svg", imageMap: "/images/FragmentoDepartamentos/Amazonas.svg" },
    { name: "Antioquia", code: "05", flagUrl: "/images/webp/antioquia.webp", imageUrl: "/images/imagenDepartamento/antioquia.svg", imageMap: "/images/FragmentoDepartamentos/Antioquia.svg" },
    { name: "Arauca", code: "81", flagUrl: "/images/webp/arauca-departamento.webp", imageUrl: "/images/imagenDepartamento/arauca-departamento.svg", imageMap: "/images/FragmentoDepartamentos/Arauca.svg" },
    { name: "Atlantico", code: "08", flagUrl: "/images/webp/atlantico.webp", imageUrl: "/images/imagenDepartamento/atlantico.svg", imageMap: "/images/FragmentoDepartamentos/Atlantico.svg" },
    { name: "Bolivar", code: "13", flagUrl: "/images/webp/bolivar.webp", imageUrl: "/images/imagenDepartamento/bolivar.svg", imageMap: "/images/FragmentoDepartamentos/Bolivar.svg" },
    { name: "Boyaca", code: "15", flagUrl: "/images/webp/boyaca.webp", imageUrl: "/images/imagenDepartamento/boyaca.svg", imageMap: "/images/FragmentoDepartamentos/Boyaca.svg" },
    { name: "Caldas", code: "17", flagUrl: "/images/webp/caldas.webp", imageUrl: "/images/imagenDepartamento/caldas.svg", imageMap: "/images/FragmentoDepartamentos/Caldas.svg" },
    { name: "Caqueta", code: "18", flagUrl: "/images/webp/caqueta.webp", imageUrl: "/images/imagenDepartamento/caqueta.svg", imageMap: "/images/FragmentoDepartamentos/Caqueta.svg" },
    { name: "Casanare", code: "85", flagUrl: "/images/webp/casanare.webp", imageUrl: "/images/imagenDepartamento/casanare.svg", imageMap: "/images/FragmentoDepartamentos/Casanare.svg" },
    { name: "Cauca", code: "19", flagUrl: "/images/webp/cauca.webp", imageUrl: "/images/imagenDepartamento/cauca.svg", imageMap: "/images/FragmentoDepartamentos/Cauca.svg" },
    { name: "Cesar", code: "20", flagUrl: "/images/webp/cesar.webp", imageUrl: "/images/imagenDepartamento/cesar.svg", imageMap: "/images/FragmentoDepartamentos/Cesar.svg" },
    { name: "Choco", code: "27", flagUrl: "/images/webp/choco.webp", imageUrl: "/images/imagenDepartamento/choco.svg", imageMap: "/images/FragmentoDepartamentos/Choco.svg" },
    { name: "Cundinamarca", code: "25", flagUrl: "/images/webp/cundinamarca.webp", imageUrl: "/images/imagenDepartamento/cundinamarca.svg", imageMap: "/images/FragmentoDepartamentos/Cundinamarca.svg" },
    { name: "Cordoba", code: "23", flagUrl: "/images/webp/cordoba.webp", imageUrl: "/images/imagenDepartamento/cordoba.svg", imageMap: "/images/FragmentoDepartamentos/Cordoba.svg" },
    { name: "Guainia", code: "94", flagUrl: "/images/webp/guainia.webp", imageUrl: "/images/imagenDepartamento/guainia.svg", imageMap: "/images/FragmentoDepartamentos/Guainia.svg" },
    { name: "Guaviare", code: "95", flagUrl: "/images/webp/guaviare.webp", imageUrl: "/images/imagenDepartamento/guaviare.svg", imageMap: "/images/FragmentoDepartamentos/Guaviare.svg" },
    { name: "Huila", code: "41", flagUrl: "/images/webp/huila.webp", imageUrl: "/images/imagenDepartamento/huila.svg", imageMap: "/images/FragmentoDepartamentos/Huila.svg" },
    { name: "La Guajira", code: "44", flagUrl: "/images/webp/guajira.webp", imageUrl: "/images/imagenDepartamento/guajira.svg", imageMap: "/images/FragmentoDepartamentos/La_Guajira.svg" },
    { name: "Magdalena", code: "47", flagUrl: "/images/webp/magdalena.webp", imageUrl: "/images/imagenDepartamento/magdalena.svg", imageMap: "/images/FragmentoDepartamentos/Magdalena.svg" },
    { name: "Meta", code: "50", flagUrl: "/images/webp/meta.webp", imageUrl: "/images/imagenDepartamento/meta.svg", imageMap: "/images/FragmentoDepartamentos/Meta.svg" },
    { name: "Nariño", code: "52", flagUrl: "/images/webp/nariño.webp", imageUrl: "/images/imagenDepartamento/nariño.svg", imageMap: "/images/FragmentoDepartamentos/Nariño.svg" },
    { name: "Norte de Santander", code: "54", flagUrl: "/images/webp/norte-de-santander.webp", imageUrl: "/images/imagenDepartamento/norte-de-santander.svg" , imageMap: "/images/FragmentoDepartamentos/Norte_de_Santander.svg"},
    { name: "Putumayo", code: "86", flagUrl: "/images/webp/putumayo.webp", imageUrl: "/images/imagenDepartamento/putumayo.svg", imageMap: "/images/FragmentoDepartamentos/Putumayo.svg" },
    { name: "Quindio", code: "63", flagUrl: "/images/webp/quindio.webp", imageUrl: "/images/imagenDepartamento/quindio.svg", imageMap: "/images/FragmentoDepartamentos/Quindio.svg" },
    { name: "Risaralda", code: "66", flagUrl: "/images/webp/risaralda.webp", imageUrl: "/images/imagenDepartamento/risaralda.svg", imageMap: "/images/FragmentoDepartamentos/Risaralda.svg" },
    { name: "San Andres, Providencia y Santa Catalina", code: "88", flagUrl: "/images/webp/san-andres-y-providencia.webp", imageUrl: "/images/imagenDepartamento/san-andres-y-providencia.svg", imageMap: "/images/FragmentoDepartamentos/San_Andres.svg" },
    { name: "Santander", code: "68", flagUrl: "/images/webp/santander.webp", imageUrl: "/images/imagenDepartamento/santander.svg", imageMap: "/images/FragmentoDepartamentos/Santander.svg"},
    { name: "Sucre", code: "70", flagUrl: "/images/webp/sucre.webp", imageUrl: "/images/imagenDepartamento/sucre.svg", imageMap: "/images/FragmentoDepartamentos/Sucre.svg" },
    { name: "Tolima", code: "73", flagUrl: "/images/webp/tolima.webp", imageUrl: "/images/imagenDepartamento/tolima.svg", imageMap: "/images/FragmentoDepartamentos/Tolima.svg" },
    { name: "Valle del Cauca", code: "76", flagUrl: "/images/webp/valle-del-cauca.webp", imageUrl: "/images/imagenDepartamento/valle-del-cauca.svg", imageMap: "/images/FragmentoDepartamentos/Valle_del_Cauca.svg" },
    { name: "Vaupes", code: "97", flagUrl: "/images/webp/vaupes.webp", imageUrl: "/images/imagenDepartamento/vaupes.svg", imageMap: "/images/FragmentoDepartamentos/Vaupes.svg" },
    { name: "Vichada", code: "99", flagUrl: "/images/webp/vichada.webp", imageUrl: "/images/imagenDepartamento/vichada.svg" , imageMap: "/images/FragmentoDepartamentos/Vichada.svg"},
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