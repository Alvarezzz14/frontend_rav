<template>
    <div class="flex flex-col lg:flex-row justify-between items-start h-full">
        <div class="lg:w-auto p-4">
            <Select
                v-model="selectedCountry"
                :options="departamentos"
                placeholder="Seleccione el Departamento"
                class="w-auto rounded-lg shadow-sm text-customPurple !border !border-customPurple"
                @change="updateSelectedInfo"
            >
                <template #value="slotProps">
                    <div
                        v-if="slotProps.value"
                        class="flex gap-2 items-center font-semibold text-customPurple"
                    >
                        <img
                            :alt="slotProps.value.name"
                            :src="slotProps.value.flagUrl"
                            class="w-6 h-6"
                        />
                        <div>{{ slotProps.value.name }}</div>
                    </div>
                    <span v-else class="text-customPurple">{{
                        slotProps.placeholder
                    }}</span>
                </template>
                <template #option="slotProps">
                    <div
                        class="flex items-center font-medium text-customPurple"
                    >
                        <img
                            :alt="slotProps.name"
                            :src="slotProps.option.flagUrl"
                            class="w-6 h-6 mr-2"
                        />
                        <p>{{ slotProps.option.name }}</p>
                    </div>
                </template>
                <template #dropdownicon>
                    <i class="pi pi-map"></i>
                </template>
            </Select>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import Select from "primevue/select";

const selectedCountry = ref();
const selectedInfo = ref(null);
const emit = defineEmits(["update-info"]);

const departamentos = ref([
    { name: "Amazonas", code: "91", flagUrl: "/images/webp/amazonas.webp" },
    {
        name: "Antioquia",
        code: "05",
        flagUrl: "/images/webp/antioquia.webp",
    },
    {
        name: "Arauca",
        code: "81",
        flagUrl: "/images/webp/arauca-departamento.webp",
    },
    {
        name: "Atlantico",
        code: "08",
        flagUrl: "/images/webp/atlantico.webp",
    },
    { name: "Bolivar", code: "13", flagUrl: "/images/webp/bolivar.webp" },
    { name: "Boyaca", code: "15", flagUrl: "/images/webp/boyaca.webp" },
    { name: "Caldas", code: "17", flagUrl: "/images/webp/caldas.webp" },
    { name: "Caqueta", code: "18", flagUrl: "/images/webp/caqueta.webp" },
    { name: "Casanare", code: "85", flagUrl: "/images/webp/casanare.webp" },
    { name: "Cauca", code: "19", flagUrl: "/images/webp/cauca.webp" },
    { name: "Cesar", code: "20", flagUrl: "/images/webp/cesar.webp" },
    { name: "Choco", code: "27", flagUrl: "/images/webp/choco.webp" },
    {
        name: "Cundinamarca",
        code: "25",
        flagUrl: "/images/webp/cundinamarca.webp",
    },
    { name: "Cordoba", code: "23", flagUrl: "/images/webp/cordoba.webp" },
    { name: "Guainia", code: "94", flagUrl: "/images/webp/guainia.webp" },
    { name: "Guaviare", code: "95", flagUrl: "/images/webp/guaviare.webp" },
    { name: "Huila", code: "41", flagUrl: "/images/webp/huila.webp" },
    {
        name: "La Guajira",
        code: "44",
        flagUrl: "/images/webp/guajira.webp",
    },
    {
        name: "Magdalena",
        code: "47",
        flagUrl: "/images/webp/magdalena.webp",
    },
    { name: "Meta", code: "50", flagUrl: "/images/webp/meta.webp" },
    { name: "Nariño", code: "52", flagUrl: "/images/webp/nariño.webp" },
    {
        name: "Norte de Santander",
        code: "54",
        flagUrl: "/images/webp/norte-de-santander.webp",
    },
    { name: "Putumayo", code: "86", flagUrl: "/images/webp/putumayo.webp" },
    { name: "Quindio", code: "63", flagUrl: "/images/webp/quindio.webp" },
    {
        name: "Risaralda",
        code: "66",
        flagUrl: "/images/webp/risaralda.webp",
    },
    {
        name: "San Andres, Providencia y Santa Catalina",
        code: "88",
        flagUrl: "/images/webp/san-andres-y-providencia.webp",
    },
    {
        name: "Santander",
        code: "68",
        flagUrl: "/images/webp/santander.webp",
    },
    { name: "Sucre", code: "70", flagUrl: "/images/webp/sucre.webp" },
    { name: "Tolima", code: "73", flagUrl: "/images/webp/tolima.webp" },
    {
        name: "Valle del Cauca",
        code: "76",
        flagUrl: "/images/webp/valle-del-cauca.webp",
    },
    { name: "Vaupes", code: "97", flagUrl: "/images/webp/vaupes.webp" },
    { name: "Vichada", code: "99", flagUrl: "/images/webp/vichada.webp" },
]);

function updateSelectedInfo() {
    const selected = departamentos.value.find(
        (dep) => dep.code === selectedCountry.value?.code
    );
    selectedInfo.value = selected ? selected : null;
    emit("update-info", selectedInfo.value);
}
</script>