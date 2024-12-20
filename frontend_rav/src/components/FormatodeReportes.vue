<template>
  <div class="min-h-screen p-4 flex flex-col -mt-20">
    <!-- Sección Superior -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-1">
      <div class="flex items-center">
        <div class="p-6 bg-customPurple rounded-full">
          <img :src="Reportes" alt="Icono de Reportes" class="w-16 h-16" />
        </div>
        <div class="ml-4 text-center md:text-left mt-14">
          <p class="text-black -mb-1 text-2xl md:text-[37px]">Generar</p>
          <h2 class="text-customPurple text-5xl md:text-[94px] mt-0 font-bold">Reportes</h2>
        </div>
      </div>
    </div>

    <!-- Sección Central -->
    <div class="flex flex-col xl:flex-row xl:items-start w-full max-w-9xl space-y-8 xl:space-x-20">
      <div class="flex-grow max-w-md lg:max-w-xl bg-white rounded-lg shadow-md w-72 p-3">
        <div class="text-center">
          <h3>Seleccione el tipo de reporte</h3>
        </div>

        <!-- Selección de tipo de reporte -->
        <div class="radio-button text-base grid grid-flow-col items-center mx-9 mr-3">
          <input 
            type="radio" 
            id="tickets" 
            name="reportType" 
            value="HistorialTickets" 
            class="custom-radio" 
            v-model="selectedReport" 
          />
          <label for="tickets">Historial de Tickets</label>

          <input 
            type="radio" 
            id="estadisticas" 
            name="reportType" 
            value="EstadisticasCiudadano" 
            class="custom-radio" 
            v-model="selectedReport" 
          />
          <label for="estadisticas">Estadísticas del Ciudadano</label>

          <input 
            type="radio" 
            id="auditLogs" 
            name="reportType" 
            value="AuditLogs" 
            class="custom-radio" 
            v-model="selectedReport" 
          />
          <label for="auditLogs">Logs de Auditoría</label>
        </div>

        <!-- Selección de Departamento -->
        <div v-if="selectedReport" class="mb-4">
          <select v-model="selectedDepartamento" class="block p-4  border-none mt-3 rounded-lg w-full">
            <option disabled value="">Buscar por regional</option>
            <option v-for="departamento in departamentos" :key="departamento.code" :value="departamento.code">
              {{ departamento.name }}
            </option>
          </select>
        </div>

        <!-- Rango de Fechas -->
        <div v-if="selectedReport" class="mb-4">
          <label>Seleccione el rango de fechas:</label>
          <div class="flex items-center mt-3  space-x-4">
            <input type="date" v-model="dateRange.from"  class="w-1/2 p-2 h-12 rounded-lg border-none bg-gray-100 " />
            <input type="date" v-model="dateRange.to" class="w-1/2 p-2 h-12 rounded-lg border-none bg-gray-100" />
          </div>
        </div>

        <!-- Campo de búsqueda por documento -->
        <div class="mb-4">
          
          <input
            type="text"
            id="document"
            v-model="documentNumber"
            placeholder="Ingrese el número de documento"
            class="block p-2 h-12 rounded-lg w-full border-none bg-gray-100"
          />
        </div>

        <!-- Botón de Búsqueda -->
        <button
          :disabled="loading"
          class="w-full bg-customPurple text-lg text-amarillo font-bold py-2 rounded-lg"
          @click="handleDownloadReport"
        >
          <span v-if="!loading">Generar Reporte</span>
          <span v-else>Generando...</span>
        </button>
      </div>

      <!-- Imagen lateral -->
      <div class="flex-1 max-w-md lg:max-w-lg">
        <img :src="PersonaReportes" alt="Persona sonriendo" class="h-auto max-w-auto" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ExcelJS from "exceljs";
import Reportes from "@/assets/images/Reportes.svg";
import PersonaReportes from "@/assets/images/PersonaReportes.svg";

// Variables reactivas
const selectedReport = ref(""); // Tipo de reporte seleccionado
const selectedDepartamento = ref(""); // Departamento seleccionado
const dateRange = ref({ from: "", to: "" }); // Rango de fechas
const documentNumber = ref(""); // Número de documento
const loading = ref(false);

// Lista de departamentos
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

//// Validación de los inputs
function validateInputs() {
  if (!selectedReport.value || !selectedDepartamento.value || !dateRange.value.from || !dateRange.value.to || !documentNumber.value) {
    alert("Por favor, complete todos los campos.");
    return false;
  }
  return true;
}

// Función para manejar la descarga del reporte
async function handleDownloadReport() {
  if (!validateInputs()) return;

  loading.value = true;

  try {
    let endpoint;
    let worksheetName;

    // Configuración de los endpoints y nombres de los reportes
    if (selectedReport.value === "HistorialTickets") {
      endpoint = "http://127.0.0.1:5000/tickets";
      worksheetName = "Historial de Tickets";
    } else if (selectedReport.value === "EstadisticasCiudadano") {
      endpoint = "http://127.0.0.1:5000/estadistica_ciudadano";
      worksheetName = "Estadísticas del Ciudadano";
    } else if (selectedReport.value === "AuditLogs") {
      endpoint = "http://127.0.0.1:5000/audit_logs";
      worksheetName = "Logs de Auditoría";
    } else {
      alert("Tipo de reporte no válido.");
      return;
    }

    // Buscar el nombre del departamento según el código seleccionado
    const departamentoNombre = departamentos.value.find(
      (d) => d.code === selectedDepartamento.value
    )?.name || "";

    // Parámetros que se enviarán al backend
    const queryParams = {
      department_name: departamentoNombre,
      document: documentNumber.value,
      from: dateRange.value.from,
      to: dateRange.value.to,
    };

    // Solicitud al endpoint con parámetros
    const response = await axios.get(endpoint, { params: queryParams });

    const data = response.data;

    // Validación de datos recibidos
    if (!data || !Array.isArray(data) || data.length === 0) {
      alert("No se encontraron datos para el reporte seleccionado.");
      return;
    }

    // Crear el archivo Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName);

    // Configurar encabezados
    const headers = Object.keys(data[0]).map((key) => ({
      header: key.replace(/_/g, " ").toUpperCase(),
      key,
      width: 20,
    }));
    worksheet.columns = headers;

    // Agregar datos al archivo
    data.forEach((item) => {
      const row = worksheet.addRow(item);
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Estilo del encabezado
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "77277A" },
      };
      cell.font = { color: { argb: "FFFFFF" }, bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    });

    // Descargar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte ${worksheetName.replace(/ /g, " ")}.xlsx`;
    link.click();

    alert("Reporte generado exitosamente.");
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    alert("Ocurrió un error al generar el reporte. Por favor, intente nuevamente.");
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>
/* Estilo para radio buttons personalizados */
.radio-button input[type="radio"].custom-radio {
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	width: 16px;
	height: 16px;
	border: 2px solid #71277A;
	/* Color morado del borde */
	border-radius: 50%;
	margin-right: 0.5rem;
	outline: none;
	cursor: pointer;
}

.radio-button input[type="radio"].custom-radio:checked {
	background-color: #71277A;
	/* Fondo morado al seleccionar */
	border-color: #71277A;
	/* Asegura que el borde sea morado al seleccionarse */
}

.radio-button label {
	cursor: pointer;
	font-weight: 500;
	margin-right: 1rem;
	color: #333;
	/* Color del texto */
}

.radio-button input[type="radio"].custom-radio:checked+label {
	color: #080808;
	/* Color del texto cuando se selecciona */
	font-weight: 700;
}

option {
    font-size: 14px; /* Cambia el tamaño de la fuente de las opciones */
    padding: 4px; /* Reduce el espacio interno */
    line-height: 1.2; /* Ajusta el espaciado entre líneas */
  }


</style>