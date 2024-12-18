<template>
  <div
    class="w-full h-auto p-px flex flex-col md:flex-row items-start md:space-x-8"
  >
    <!-- Contenedor del Select y Tarjeta de Información del Departamento -->
    <div
      class="order-1 md:order-none flex flex-col items-start space-y-4 mt-10 md:mt-16 ml-4 md:ml-[5%] md:max-w-[40%]"
    >
      <!-- Selector del Departamento -->
      <div class="w-full max-w-xs md:max-w-md">
        <Select
          v-model="selectedCountry"
          :options="departamentos"
          placeholder="Seleccione departamento"
          class="w-full rounded-lg shadow-sm text-customPurple !border !border-customPurple"
          @change="handleChange"
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
            <div class="flex items-center font-medium text-customPurple">
              <img
                :alt="slotProps.name"
                :src="slotProps.option.flagUrl"
                class="w-6 h-6 mr-2"
              />
              <p>{{ slotProps.option.name }}</p>
            </div>
          </template>
        </Select>
      </div>

      <!-- Tarjeta de Información del Departamento -->
      <div v-if="selectedInfo" class="w-full max-w-md rounded-lg shadow-custom">
        <!-- Imagen principal -->
        <img
          :src="selectedInfo.imageUrl"
          :alt="selectedInfo.name"
          class="rounded-t-lg w-full h-40 object-cover"
        />

        <!-- Encabezado con nombre y fondo color -->
        <div
          class="bg-customPurple h-16 -mt-1 text-white py-2 px-4 flex items-center"
        >
          <!-- Cambia el tamaño del texto según el ancho de pantalla -->
          <h2 class="font-bold text-xl md:text-3xl lg:4xl">
            {{ selectedInfo.name }}
          </h2>
          <!-- Imagen del mapa del departamento seleccionado -->
          <img
            :src="selectedInfo.imageMap"
            class="bg-white rounded-full ml-auto w-11 p-1 h-11"
          />
        </div>

        <!-- Descripción del departamento -->
        <div class="p-4 text-gray-700">
          <!-- <p>{{ getDepartmentDescription(selectedInfo.name) }}</p> -->
          <p>
            La cantidad de victimas en el departamento es de:
            {{ department.total_victimas }} personas
          </p>
        </div>
      </div>
    </div>

    <!-- Mapa de Colombia -->
    <div
      class="order-2 md:order-none relative w-full h-auto mt-6 md:mt-10 md:max-w-[55%]"
    >
      <svg
        class="w-full h-auto"
        viewBox="0 0 780 780"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="390" cy="390" r="390" fill="white" />
        <g>
          <!-- Aquí puedes agregar los paths de los departamentos -->
          <path
            v-for="dep in departamentos"
            :key="dep.code"
            :d="departmentPaths[dep.code]"
            :fill="
              selectedCountry && selectedCountry.code === dep.code
                ? 'purple'
                : '#F2F3F3'
            "
            :stroke="
              selectedCountry && selectedCountry.code === dep.code
                ? 'black'
                : 'none'
            "
          />
        </g>
      </svg>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import Select from "primevue/select";
import { departamentos } from "@/data/departamentosMapa/departamentos";
import { getDepartmentDescription } from "@/data/departamentosMapa/descripciones";
import { departmentPaths } from "@/data/departamentosMapa/paths";
import FetchService from "@/services/fetchService";

// Reactive data
const selectedInfo = ref(null);
const selectedCountry = ref("");
let department = ref([]);
const fetchService = new FetchService();



const handleChange = () => {
  getDepartment();
  updateSelectedInfo();
};

const getDepartment = async () => {
  const nameDeparment = selectedCountry.value.name.toUpperCase();
  console.log(nameDeparment);
  const url = `http://localhost:8082/api/v1/victimas/department/${nameDeparment}`;
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

<!-- SI -->
