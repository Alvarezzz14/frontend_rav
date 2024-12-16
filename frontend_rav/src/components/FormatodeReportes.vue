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
          <label for="estadisticas">Estadísticas de victima</label>

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
          <select v-model="selectedDepartamento" class="block p-4 rounded-lg w-full">
            <option disabled value="">Buscar por regional</option>
            <option v-for="departamento in departamentos" :key="departamento.code" :value="departamento.code">
              {{ departamento.name }}
            </option>
          </select>
        </div>

        <!-- Filtros dinámicos -->
        <!-- Rango de Fechas (Historial de Tickets, Logs de Auditoría, Estadísticas del Ciudadano) -->
        <div v-if="selectedReport === 'HistorialTickets' || selectedReport === 'AuditLogs' || selectedReport === 'EstadisticasCiudadano'" class="mb-4">
          <label>Seleccione el rango de fechas:</label>
          <div class="flex items-center space-x-4">
            <input type="date" v-model="dateRange.from" class="w-1/2 p-2 rounded-lg" />
            <input type="date" v-model="dateRange.to" class="w-1/2 p-2 rounded-lg" />
          </div>
        </div>

        <!-- Campo de búsqueda por correo (Logs de Auditoría) -->
        <div v-if="selectedReport === 'AuditLogs'" class="mb-4">
          <label for="emailSearch">Buscar por correo SENA:</label>
          <input
            type="email"
            id="emailSearch"
            v-model="searchEmail"
            placeholder="Ingrese el correo"
            class="block p-2 rounded-lg w-full"
          />
        </div>

        <!-- Campo de búsqueda por C.C. (Estadísticas del Ciudadano) -->
        <div v-if="selectedReport === 'EstadisticasCiudadano'" class="mb-4">
          <label for="ccSearch">Buscar por numero de identificación:</label>
          <input
            type="text"
            id="ccSearch"
            v-model="searchCC"
            placeholder="Ingrese el número de identificación"
            class="block p-2 rounded-lg w-full"
          />
        </div>

        <!-- Checkbox para desplegar filtros adicionales solo si el reporte es 'Estadísticas del Ciudadano' -->
        <div v-if="selectedReport === 'EstadisticasCiudadano'" class="mb-4 flex items-center">
          <input 
            type="checkbox" 
            id="needsSearch" 
            v-model="needsSearch" 
            class="mr-2" 
          />
          <label for="needsSearch">¿Necesitas una búsqueda avanzada?</label>
        </div>

        <!-- Filtros adicionales solo se muestran si 'needsSearch' es verdadero y el reporte es 'Estadísticas del Ciudadano' -->
        <div v-if="needsSearch && selectedReport === 'EstadisticasCiudadano'" class="space-y-4">
          <!-- Filtro de Género -->
          <div class="mb-4">
            <label for="gender">Seleccione el género:</label>
            <select v-model="selectedGender" id="gender" class="block p-4 rounded-lg w-full">
              <option disabled value="">Seleccione un género</option>
              <option value="masculino">Hombre</option>
              <option value="femenino">Mujer</option>
              <option value="femenino">LGBTI</option>
              <option value="femenino">Intersexual</option>
              <option value="otro">No informa</option>
            </select>
          </div>

          <!-- Filtro de Grupos Etarios -->
          <div class="mb-4">
            <label for="ageGroup">Seleccione el grupo etario:</label>
            <select v-model="selectedAgeGroup" id="ageGroup" class="block p-4 rounded-lg w-full">
              <option disabled value="">Seleccione un grupo etario</option>
              <option value="0-14">Niños</option>
              <option value="15-17">Adolescentes</option>
              <option value="18-25">Jóvenes</option>
              <option value="26-59">Adultos</option>
              <option value="60+">Adultos mayores</option>
            </select>
          </div>

          <!-- Filtro de Procedencia Étnica -->
          <div class="mb-4">
            <label for="ethnicity">Seleccione la procedencia étnica:</label>
            <select v-model="selectedEthnicity" id="ethnicity" class="block p-4 rounded-lg w-full">
              <option disabled value="">Seleccione una étnia</option>
              <option value="indigena">Indígena</option>
              <option value="afrocolombiano">Afrocolombiano</option>
              <option value="rom">Rom</option>
              <option value="raizal">Raizal</option>
              <option value="palenquero">Palenquero</option>
              <option value="mestizo">Mestizo</option>
              <option value="blanco">Blanco</option>
            </select>
          </div>
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
import logoRavBlanco from '@/assets/images/logoRavBlanco.png';

// Variables reactivas
const selectedReport = ref(""); // Tipo de reporte seleccionado
const selectedDepartamento = ref(""); // Departamento seleccionado
const dateRange = ref({ from: "", to: "" }); // Rango de fechas
const loading = ref(false);
const needsSearch = ref(false);

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

// Validación de los inputs
function validateInputs() {
  if (!selectedReport.value || !selectedDepartamento.value || !dateRange.value.from || !dateRange.value.to) {
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
      loading.value = false;
      return;
    }

    // Buscar el nombre del departamento según el código seleccionado
    const departamentoNombre = departamentos.value.find(
      (d) => d.code === selectedDepartamento.value
    )?.name || "";

    // Verificar datos que se enviarán
    console.log("Nombre del departamento enviado:", departamentoNombre);
    console.log("Fechas enviadas:", dateRange.value.from, dateRange.value.to);

    // Solicitud al endpoint
    const response = await axios.get(endpoint, {
      params: {
        departamento: departamentoNombre,
        from: dateRange.value.from,
        to: dateRange.value.to,
      },
    });

    const data = response.data;

    // Validación de datos recibidos
    if (!data || !Array.isArray(data) || data.length === 0) {
      alert("No se encontraron datos para el reporte seleccionado.");
      loading.value = false;
      return;
    }

    // Generar el reporte
    await generateReport(data, worksheetName, {
      imageBase64: "LogoRavBlanco", // Reemplazar con la imagen en base64
      regional: departamentoNombre,
      responsable: "Nombre del usuario activo",
      correo: "Correo del usuario activo",
    });
  } catch (error) {
    console.error("Error al manejar la descarga del reporte:", error);
    alert("Ocurrió un error al manejar la descarga del reporte.");
  } finally {
    loading.value = false;
  }
}


// Función para obtener imagen en Base64
const getBase64Image = (imagePath) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// Función para aplicar estilos según el reporte seleccionado
const applyStyles = (worksheet, reportType, reportDetails) => {
  switch (reportType) {
    case 'Historial de Tickets':
      worksheet.mergeCells('A1:B7');
      worksheet.getCell('A1').value = 'Historial de Tickets'; // Ejemplo
      worksheet.getCell('A1').font = { size: 14, bold: true };
      break;

    case 'Logs de Auditoría':
      worksheet.mergeCells('A1:B7');
      const imageCellRange = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
      imageCellRange.forEach((cell) => {
        worksheet.getCell(cell).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '71277A' },
        };
        worksheet.getCell(cell).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      });

      worksheet.mergeCells('C1:T3');
      const titleCell = worksheet.getCell('C1');
      titleCell.value = 'Reporte Logs de Auditoría';
      titleCell.font = { size: 35, bold: true, color: { argb: 'FFFFFF' } };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

      worksheet.mergeCells('C5:G6');
      const responsableCell = worksheet.getCell('C5');
      responsableCell.value = `Responsable de generación: ${reportDetails.responsable}`;
      responsableCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
      responsableCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      responsableCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

      worksheet.mergeCells('H5:L5');
      const regionalCell = worksheet.getCell('H5');
      regionalCell.value = `Regional: ${reportDetails.regional}`;
      regionalCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
      regionalCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      regionalCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

      worksheet.mergeCells('M5:P5');
      const correoCell = worksheet.getCell('M5');
      correoCell.value = `Correo: ${reportDetails.correo}`;
      correoCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
      correoCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      correoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

      worksheet.mergeCells('Q5:T5');
      const fechaCell = worksheet.getCell('Q5');
      fechaCell.value = `Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`;
      fechaCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
      fechaCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      fechaCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };
      break;

    case 'Estadísticas Víctima':
      worksheet.mergeCells('A1:B7');
      const imageCellRangeVictima = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
      imageCellRangeVictima.forEach((cell) => {
        worksheet.getCell(cell).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '71277A' },
        };
        worksheet.getCell(cell).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      });

      worksheet.mergeCells('C1:L3');
      const titleCellVictima = worksheet.getCell('C1');
      titleCellVictima.value = 'Reporte Estadísticas Víctima';
      titleCellVictima.font = { size: 35, bold: true, color: { argb: 'FFFFFF' } };
      titleCellVictima.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      titleCellVictima.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

      worksheet.mergeCells('C4:G5');
      const responsableCellVictima = worksheet.getCell('C4');
      responsableCellVictima.value = `Responsable de generación: ${reportDetails.responsable}`;
      responsableCellVictima.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
      responsableCellVictima.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      responsableCellVictima.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

      worksheet.mergeCells('M6:L7');
      const correoCellVictima = worksheet.getCell('M6');
      correoCellVictima.value = `Correo: ${reportDetails.correo}`;
      correoCellVictima.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
      correoCellVictima.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      correoCellVictima.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

      worksheet.mergeCells('H4:L5');
      const fechaCellVictima = worksheet.getCell('H4');
      fechaCellVictima.value = `Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`;
      fechaCellVictima.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
      fechaCellVictima.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      fechaCellVictima.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };
      break;

    default:
      console.error('Tipo de reporte no definido.');
      break;
  }
};

// Generar reporte en Excel
const generateReport = async (data, worksheetName, reportDetails) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName);

    // Configurar alturas de las primeras filas
    for (let i = 1; i <= 7; i++) {
      worksheet.getRow(i).height = 20;
    }

    // Obtener imagen Base64 y agregarla
    const base64Image = await getBase64Image('ruta/a/logo.png'); // Cambia por la ruta real
    const imageId = workbook.addImage({
      base64: base64Image,
      extension: 'png',
    });
    worksheet.addImage(imageId, 'A1:B7');

    // Aplicar estilos específicos
    applyStyles(worksheet, worksheetName, reportDetails);

    // Configurar encabezados de la tabla
    const headers = Object.keys(data[0]).map((key) => ({
      header: key.replace(/_/g, ' ').toUpperCase(),
      key,
      width: 20,
    }));
    worksheet.columns = headers;

    // Agregar datos de la tabla
    data.forEach((row) => worksheet.addRow(row));

    // Descargar el reporte
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_${worksheetName.replace(/ /g, '_')}.xlsx`;
    link.click();

    alert('Reporte generado exitosamente.');
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    alert('Ocurrió un error al generar el reporte. Por favor, intente nuevamente.');
  }
};

try {
  // Establecer los encabezados de la tabla comenzando en A9
  const headers = Object.keys(data[0]).map((key) => ({
    header: key.replace(/_/g, ' ').toUpperCase(),
    key,
    width: 20,
  }));

  // Filas para los encabezados de la tabla
  worksheet.getRow(9).values = headers.map((h) => h.header);
  worksheet.getRow(9).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '77277A' },
    };
    cell.font = { color: { argb: 'FFFFFF' }, bold: true };
    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true, // Alineación con ajuste de texto
    };
  });

  // Agregar datos de la tabla a partir de la fila 10
  data.forEach((item, index) => {
    const row = worksheet.getRow(10 + index);
    Object.values(item).forEach((value, colIndex) => {
      row.getCell(colIndex + 1).value = value;
      row.getCell(colIndex + 1).alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true, // Alineación con ajuste de texto
      };
      row.getCell(colIndex + 1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // Descargar el reporte
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Reporte_${worksheetName.replace(/ /g, '_')}.xlsx`;
  link.click();

  alert('Reporte generado exitosamente.');
} catch (error) {
  console.error('Error al generar el reporte:', error);
  alert('Ocurrió un error al generar el reporte. Por favor, intente nuevamente.');
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
