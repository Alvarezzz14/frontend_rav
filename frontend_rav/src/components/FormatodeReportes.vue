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
				<!-- Selección de Departamento -->
				<div class="mb-4">
					<select v-model="selectedDepartamento" class="block p-4 rounded-lg w-full">
						<option disabled value="">Seleccione Departamento</option>
						<option v-for="departamento in departamentos" :key="departamento.code" :value="departamento.code">
							{{ departamento.name }}
						</option>
					</select>
				</div>
				<!-- Selección de Fechas -->
				<div class="mb-4">
					<label>Seleccione el rango de fechas.</label>
					<div class="flex items-center space-x-4">
						<input type="date" v-model="dateRange.from" class="w-1/2 p-2 rounded-lg" />
						<input type="date" v-model="dateRange.to" class="w-1/2 p-2 rounded-lg" />
					</div>
				</div>
				<!-- Botón de Búsqueda -->
				<button
					:disabled="loading"
					class="w-full bg-customPurple text-lg text-amarillo font-bold py-2 rounded-lg"
					@click="handleDownloadTickets"
				>
					<span v-if="!loading">Generar Reporte</span>
					<span v-else>Generando...</span>
				</button>
			</div>
			<div class="flex-1 max-w-md lg:max-w-lg">
				<img :src="PersonaReportes" alt="Persona sonriendo" class="h-auto max-w-auto" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ExcelJS from "exceljs"; // Importar exceljs
import Reportes from "@/assets/images/Reportes.svg";
import PersonaReportes from "@/assets/images/PersonaReportes.svg";

const selectedDepartamento = ref("");
const dateRange = ref({ from: "", to: "" });
const loading = ref(false);

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


function validateInputs() {
  if (!selectedDepartamento.value || !dateRange.value.from || !dateRange.value.to) {
    alert("Por favor, complete todos los campos.");
    return false;
  }
  return true;
}

async function handleDownloadTickets() {
  if (!validateInputs()) return;

  loading.value = true;

  try {
    const response = await axios.get("http://127.0.0.1:5000/tickets", {
      params: {
        departamento: selectedDepartamento.value,
        from: dateRange.value.from,
        to: dateRange.value.to,
      },
    });

    const tickets = response.data;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Historial de Tickets");

    // Combinar celdas para el encabezado de imagen
    //worksheet.mergeCells("A1:H6");

    // Insertar la imagen
    //const imageId = workbook.addImage({
    //  base64: Reportes,
    //  extension: "png",
    //});
    //worksheet.addImage(imageId, {
    //  tl: { col: 0, row: 0 }, // Celda A1
    //  br: { col: 8, row: 6 }, // Celda H6
    //});

    // Definir columnas
    worksheet.columns = [
      { header: "ID TICKET", key: "ID_TICKET", width: 15 },
      { header: "ID USUARIO", key: "ID_USUARIO", width: 15 },
      { header: "NUMERO DOCUMENTO", key: "NUMERO_DOCUMENTO", width: 20 },
      { header: "TITULO", key: "TITULO", width: 20 },
      { header: "CONTENIDO", key: "CONTENIDO", width: 40 },
      { header: "PALABRAS CLAVES", key: "PALABRAS_CLAVES", width: 25 },
      { header: "DEPARTAMENTO", key: "DEPARTAMENTO", width: 20 },
      { header: "FECHA HORA", key: "FECHA_HORA", width: 25 },
    ];

    // Estilo de encabezados
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "77277A" },
      };
      cell.font = { color: { argb: "FFFFFF" }, bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin", color: { argb: "77277A" } },
        bottom: { style: "thin", color: { argb: "77277A" } },
        left: { style: "thin", color: { argb: "77277A" } },
        right: { style: "thin", color: { argb: "77277A" } },
      };
    });

    // Agregar datos
    tickets.forEach((ticket) => {
      const row = worksheet.addRow(ticket);
      row.eachCell((cell) => {
		cell.alignment = { wrapText: true, horizontal: "center", vertical: "middle" };// Ajustar texto automáticamente	
      });
    });

    // Estilo de bordes para todas las celdas
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "77277A" } },
          bottom: { style: "thin", color: { argb: "77277A" } },
          left: { style: "thin", color: { argb: "77277A" } },
          right: { style: "thin", color: { argb: "77277A" } },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte Historial Tickets.xlsx`;
    link.click();

    alert("Reporte generado exitosamente.");
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    alert("Ocurrió un error. Intente nuevamente.");
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
