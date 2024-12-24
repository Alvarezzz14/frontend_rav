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
      <div class="flex-grow max-w-md lg:max-w-xl bg-white rounded-lg shadow-md sm:w-auto md:w-auto  w-auto p-3">
        <div class="text-center">
          <h3>Seleccione el tipo de reporte</h3>
        </div>

        <!-- Selección de tipo de reporte -->
        <div class="radio-button text-base grid grid-flow-col  w-auto items-center mx-9 mr-3">
          <input 
            type="radio" 
            id="tickets" 
            name="reportType" 
            value="HistorialTickets" 
            class="custom-radio" 
            v-model="selectedReport" 
          />
          <label class="w-auto" for="tickets">Historial de Tickets</label>

          <input 
            type="radio" 
            id="estadisticas" 
            name="reportType" 
            value="EstadisticasVictima" 
            class="custom-radio" 
            v-model="selectedReport" 
          />
          <label class="w-auto" for="estadisticas">Estadísticas de victima</label>

          <input 
            type="radio" 
            id="auditLogs" 
            name="reportType" 
            value="AuditLogs" 
            class="custom-radio" 
            v-model="selectedReport" 
          />
          <label class="w-auto" for="auditLogs">Logs de Auditoría</label>
        </div>

        <!-- Selección de Departamento - Ahora solo se muestra para EstadisticasVictima y AuditLogs -->
        <div v-if="selectedReport && selectedReport !== 'HistorialTickets'" class="mb-4">
          <select v-model="form.department_name" class="block p-4 rounded-lg w-full">
            <option disabled value="">Buscar por regional</option>
            <option v-for="departamento in department_name" :key="departamento.code" :value="departamento.name">
              {{ departamento.name }}
            </option>
          </select>
        </div>

 

        <div v-if="selectedReport === 'EstadisticasVictima'" class="mb-4">
          <label for="document">Buscar por numero de identificación:</label>
          <input
            type="text"
            id="document"
            v-model="form.document"
            placeholder="Ingrese el número de identificación"
            class="block p-2 rounded-lg w-full"
          />
        </div>

        <!-- Checkbox para desplegar filtros adicionales -->
        <div v-if="selectedReport === 'EstadisticasVictima'" class="mb-4 flex items-center">
          <input 
            type="checkbox" 
            id="needsSearch" 
            v-model="needsSearch" 
            class="mr-2" 
          />
          <label for="needsSearch">¿Necesitas una búsqueda avanzada?</label>
        </div>

        <!-- Filtros adicionales -->
        <div v-if="needsSearch && selectedReport === 'EstadisticasVictima'" class="space-y-4">
          <!-- Filtros existentes permanecen igual -->
          <div class="mb-4">
            <label for="genere">Seleccione el género:</label>
            <select v-model="form.genere" id="genere" class="block p-4 rounded-lg w-full">
              <option disabled value="">Seleccione un género</option>
              <option value="HOMBRE">Hombre</option>
              <option value="MUJER">Mujer</option>
              <option value="LGBTI">LGBTI</option>
              <option value="INTERSEXUAL">Intersexual</option>              
            </select>
          </div>
          <div class="mb-4">
            <label for="etario_group">Seleccione el grupo etario:</label>
            <select v-model="form.etario_group" id="etario_group" class="block p-4 rounded-lg w-full">
              <option disabled value="">Seleccione un grupo etario</option>
              <option value="Primera infancia (0-5 años)">Primera infancia (0-5 años)</option>
              <option value="Infancia (6-11 años)">Infancia (6-11 años)</option>
              <option value="Adolescencia temprana (12-13 años)">Adolescencia temprana (12-13 años)</option>
              <option value="Adolescencia (14-18 años)">Adolescencia (14-18 años)</option>
              <option value="Juventud (19-26 años)">Juventud (19-26 años)</option>
              <option value="Adultez (27-59 años)">Adultez (27-59 años)</option>
              <option value="Persona mayor (60 años o más)">Persona mayor (60 años o más)</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="pertenencia_etnica">Seleccione la procedencia étnica:</label>
            <select v-model="form.pertenencia_etnica" id="pertenencia_etnica" class="block p-4 rounded-lg w-full">
              <option disabled value="">Seleccione una étnia</option>         
              <option value="AFROCOLOMBIANO (ACREDITADO RA)">Afrocolombiano</option>            
              <option value="GITANO (RROM) (ACREDITADO RA)">Gitano</option>              
              <option value="INDIGENA (ACREDITADO RA)">Indigena</option>
              <option value="NEGRO (ACREDITADO RA)">Negro RA</option>
              <option value="NEGRO(A) O AFROCOLOMBIANO(A)">Negro Afro</option>
              <option value="ROM">Rom</option>
              <option value="RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES Y PROVIDENCIA">Raizal de San Andres y Providencia</option>
              <option value="PALENQUERO">Palenquero</option>
              <option value="PALENQUERO (ACREDITADO RA)">Palenquero RA</option>
              <option value="RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES Y PROVIDENCIA">Raizal</option>     
              <option value="NINGUNA">Ninguna</option>     
            </select>
          </div>
        </div>
        
        <!-- Botón de Búsqueda -->
        <button
          :disabled="loading"
          class="w-full bg-customPurple text-lg text-amarillo font-bold py-2 rounded-lg"
          @click="handleSubmit"
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
import { ref, watch } from 'vue'; 
import axios from "axios";
import ExcelJS from "exceljs";
import Reportes from "@/assets/images/Reportes.svg";
import PersonaReportes from "@/assets/images/PersonaReportes.svg";
import logoRavBlanco from '@/assets/images/logoRavBlanco.png';


// Variables reactivas
const selectedReport = ref(""); // Tipo de reporte seleccionado

const selectedDepartamento = ref(""); // Departamento seleccionado
const loading = ref(false);
const needsSearch = ref(false);
const host = import.meta.env.VITE_HOST;

const form = ref({
  department_name:"",
  document: "",
  regional: "",
  genere: "",
  etario_group:"",
  pertenencia_etnica: "",
})

// Vigilar cambios en selectedReport
watch(selectedReport, (newValue) => {
  // Resetear el formulario
  form.value = {
    department_name: '',
    document: '',
    genere: '',
    etario_group: '',
    pertenencia_etnica: ''
  };
  
  // Resetear checkbox de búsqueda avanzada
  needsSearch.value = false;
});

// Lista de department_name
const department_name = ref([
  { name: "AMAZONAS", code: "91" },
  { name: "ANTIOQUIA", code: "05" },
  { name: "ARAUCA", code: "81" },
  { name: "ATLANTICO", code: "08" },
  { name: "BOLIVAR", code: "13" },
  { name: "BOYACA", code: "15" },
  { name: "CALDAS", code: "17" },
  { name: "CAQUETA", code: "18" },
  { name: "CASANARE", code: "85" },
  { name: "CAUCA", code: "19" },
  { name: "CESAR", code: "20" },
  { name: "CHOCO", code: "27" },
  { name: "CUNDINAMARCA", code: "25" },
  { name: "CORDOBA", code: "23" },
  { name: "GUAINIA", code: "94" },
  { name: "GUAVIARE", code: "95" },
  { name: "HUILA", code: "41" },
  { name: "LA GUAJIRA", code: "44" },
  { name: "MAGDALENA", code: "47" },
  { name: "META", code: "50" },
  { name: "NARIÑO", code: "52" },
  { name: "NORTE DE SANTANDER", code: "54" },
  { name: "PUTUMAYO", code: "86" },
  { name: "QUINDIO", code: "63" },
  { name: "RISARALDA", code: "66" },
  { name: "SAN ANDRES, PROVIDENCIA Y SANTA CATALINA", code: "88" },
  { name: "SANTANDER", code: "68" },
  { name: "SUCRE", code: "70" },
  { name: "TOLIMA", code: "73" },
  { name: "VALLE DEL CAUCA", code: "76" },
  { name: "VAUPÉS", code: "97" },
  { name: "VICHADA", code: "99" },
]);


// Validación de los inputs
function validateInputs() {
  if (!selectedReport.value || !selectedDepartamento.value) {
    alert("Por favor, complete todos los campos.");
    return false;
  }
  return true;
}


const generarURL = (baseURL, form) => {
  const params = Object.entries(form.value)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  let urlGenerada = params ? `${baseURL}?${params}` : baseURL;
  console.log("URL generada:", urlGenerada);
  return urlGenerada;
};

const getData = async () => {
  let url;
  
  // Seleccionar el endpoint basado en el tipo de reporte
  switch (selectedReport.value) {
    case 'HistorialTickets':
      url = generarURL(`${host}:8082/api/v1/victimas/ticket/all?`, form);
      break;
    case 'EstadisticasVictima':
      url = generarURL(`${host}:8082/api/v1/victimas/reports`, form);
      break;
    case 'AuditLogs':
      url = generarURL(`${host}:8080/audit/logs`, form);
      break;
    default:
      throw new Error('Tipo de reporte no válido');
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw { 
        error: true, 
        errorStatus: response.status, 
        errorMsg: response.statusText 
      };
    }

    const json = await response.json();
    console.log("Data received:", json);
    return { data: json, url: url };
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    const { data, url } = await getData();
    if (selectedReport.value === 'AuditLogs') {
      // Check for logs array specifically for AuditLogs
      if (data && data.logs && data.logs.length > 0) {
        await handleDownloadReport(url);
      } else {
        alert("No se encontraron datos para generar el reporte - Logs");
      }
    } else {
      // Original check for other reports
      if (data && data.data && data.data.length > 0) {
        await handleDownloadReport(url);
      } else {
        alert("No se encontraron datos para generar el reporte.");
      }
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    alert("Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
  } finally {
    loading.value = false;
  }
};

async function handleDownloadReport(url) {
  loading.value = true;

  try {
    const response = await axios.get(url);
    let processedData;

    if (selectedReport.value === 'AuditLogs') {
      // Extract logs array and ensure it's properly formatted
      processedData = response.data?.logs?.map(log => ({
        ID: log.id,
        Usuario_ID: log.id_usuario,
        Correo: log.correo || '',
        Regional: log.regional || '',
        Modulo: log.nombre_modulo || '',
        // Add any other fields you need
      })) || [];
    } else {
      processedData = response.data?.data || [];
    }

    if (processedData.length === 0) {
      throw new Error("No hay datos para procesar");
    }

    const worksheetName = selectedReport.value === "AuditLogs" ? "Logs de Auditoría" :
                         selectedReport.value === "HistorialTickets" ? "Historial de Tickets" :
                         "Estadísticas Victimas";

    await generateReport(processedData, worksheetName, {
      regional: "Tu Regional",
      responsable: "Nombre del Responsable",
      correo: "correo@ejemplo.com"
    });
  } catch (error) {
    console.error("Error al obtener el reporte:", error);
    alert("Ocurrió un error al obtener el reporte. Por favor, intente nuevamente.");
  } finally {
    loading.value = false;
  }
}



// Función para convertir imagen a Base64
async function getBase64Image(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL.replace(/^data:image\/png;base64,/, ''));
    };
    img.onerror = (error) => reject(error);
    img.src = imagePath;
  });
}

const generateReport = async (data, worksheetName, reportDetails) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName);

    // Espacio para la sección superior (filas 1 a 7)
    for (let i = 1; i <= 7; i++) {
      worksheet.getRow(i).height = 20;
    }

    // Convertir la imagen a Base64 y agregarla
    const base64Image = await getBase64Image(logoRavBlanco);
    const imageId = workbook.addImage({
      base64: base64Image,
      extension: 'png',
    });
    worksheet.addImage(imageId, 'A1:B7');

    // Validar antes de combinar celdas
    const mergeCellsSafely = (range) => {
      const [startCell, endCell] = range.split(':');
      const start = worksheet.getCell(startCell);
      const end = worksheet.getCell(endCell);

      // Verificar si ya están combinadas
      if (!start.isMerged && !end.isMerged) {
        worksheet.mergeCells(range);
      }
    };

    // Fondo color para celdas combinadas de la imagen
    mergeCellsSafely('A1:B7');
    const imageCellsRange = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
    imageCellsRange.forEach((cell) => {
      worksheet.getCell(cell).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '71277A' }, // Fondo color #71277A
      };
      worksheet.getCell(cell).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    });

    // Título del reporte
    mergeCellsSafely('C1:H3');
    const titleCell = worksheet.getCell('C1');
    titleCell.value = `Reporte ${worksheetName}`;
    titleCell.font = { size: 35, bold: true, color: { argb: 'FFFFFF' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

    // Campo "Fecha de generación"
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    mergeCellsSafely('F6:H7');
    const dateCell = worksheet.getCell('F6');
    dateCell.value = `Fecha de generación: ${formattedDate}`;
    dateCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
    dateCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    dateCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

    // Otros detalles del reporte
    mergeCellsSafely('C4:E5');
    const regionalCell = worksheet.getCell('C4');
    regionalCell.value = `Regional: ${reportDetails.regional}`;
    regionalCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
    regionalCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    regionalCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

    mergeCellsSafely('C6:E7');
    const responsableCell = worksheet.getCell('C6');
    responsableCell.value = `Responsable de generación: ${reportDetails.responsable}`;
    responsableCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
    responsableCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    responsableCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

    mergeCellsSafely('F4:H5');
    const correoCell = worksheet.getCell('F4');
    correoCell.value = `Correo: ${reportDetails.correo}`;
    correoCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
    correoCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    correoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '71277A' } };

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
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    });

    // Ajustar el ancho de las celdas según el contenido
    const setColumnWidths = (worksheet, data) => {
      Object.keys(data[0]).forEach((key, colIndex) => {
        const column = worksheet.getColumn(colIndex + 1);
        let maxLength = 0;
        // Buscar el contenido más largo en la columna
        data.forEach((item) => {
          const value = item[key];
          if (value) {
            maxLength = Math.max(maxLength, value.toString().length);
          }
        });
        // Establecer un ancho mínimo si es necesario
        column.width = Math.max(maxLength + 2, 15); // Un valor mínimo de 15 para no ser demasiado estrecho
      });
    };

    // Llamar a la función después de agregar los datos de la tabla
    setColumnWidths(worksheet, data);

    // Agregar datos de la tabla a partir de la fila 10
    data.forEach((item, index) => {
      const row = worksheet.getRow(10 + index);
      Object.values(item).forEach((value, colIndex) => {
        row.getCell(colIndex + 1).value = value;
        row.getCell(colIndex + 1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
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
    link.download = `Reporte ${worksheetName.replace(/ /g, ' ')}.xlsx`;
    link.click();

    alert('Reporte generado exitosamente.');
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    alert('Ocurrió un error al generar el reporte. Por favor, intente nuevamente.');
  }
};


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
