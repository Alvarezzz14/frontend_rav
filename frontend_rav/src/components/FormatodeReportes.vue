<template>
  <div class="reportes-container xl:pt-9 xl:pl-6">
    <!-- Sección Superior -->
    <div class="header-section">
      <div class="title-container">
        <div class="icon-wrapper bg-azul-gradian">
          <img :src="Reportes" alt="Icono de Reportes" class="icon-reportes" />
        </div>
        <h2 class="title-reportes text-azul2Ape">Generar reportes</h2>
      </div>
    </div>

    <!-- Sección Central -->
    <div class="content-section">
      <div class="form-card order-2 xl:order-none -mt-20 md:-mt-28 xl:mt-0">
        <div class="form-header">
          <h3 class="form-title text-azul2Ape">Seleccione el tipo de reporte</h3>
        </div>

        <!-- Selección de tipo de reporte -->
        <div class="radio-options">
          <div class="radio-item">
            <div class="radio-container">
              <input 
                type="radio" 
                id="tickets" 
                name="reportType" 
                value="HistorialTickets" 
                class="custom-radio" 
                v-model="selectedReport" 
              />
              <CheckIcon 
                class="radio-check-icon"
                :size="10"
                stroke="white"
                :stroke-width="2"
              />
            </div>
            <label class="radio-label" for="tickets">Historial de ticket</label>
          </div>

          <div class="radio-item">
            <div class="radio-container">
              <input 
                type="radio" 
                id="estadisticas" 
                name="reportType" 
                value="EstadisticasVictima" 
                class="custom-radio" 
                v-model="selectedReport" 
              />
              <CheckIcon 
                class="radio-check-icon"
                :size="10"
                stroke="white"
                :stroke-width="2"
              />
            </div>
            <label class="radio-label" for="estadisticas">Estadísticas del ciudadano</label>
          </div>

          <div class="radio-item">
            <div class="radio-container">
              <input 
                type="radio" 
                id="auditLogs" 
                name="reportType" 
                value="AuditLogs" 
                class="custom-radio" 
                v-model="selectedReport" 
              />
              <CheckIcon 
                class="radio-check-icon"
                :size="10"
                stroke="white"
                :stroke-width="2"
              />
            </div>
            <label class="radio-label" for="auditLogs">Historial de usuarios</label>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Selección de Departamento -->
        <div v-if="selectedReport && selectedReport !== 'HistorialTickets'" class="form-group">
          <RavSelect
            v-model="selectedDepartmentOption"
            :options="departamentos"
            :showImage="true"
            placeholder="Buscar por regional"
            :withShadow="true"
            :bgColor="'#EEF5FF'"
            inputClass="w-[442px]"
            :height="'50px'"
            overlayWidth="442px"
            :placeholderFontSize="'22.77px'"
          />
        </div>

        <!-- Campo de búsqueda por documento -->
        <div v-if="selectedReport === 'EstadisticasVictima'" class="form-group">
          <input
            type="text"
            id="document"
            v-model="form.document"
            placeholder="Buscar por correo SENA"
            class="form-input"
          />
        </div>

        <!-- Checkbox para desplegar filtros adicionales -->
        <div v-if="selectedReport === 'EstadisticasVictima'" class="checkbox-group">
          <div class="checkbox-container">
            <input 
              type="checkbox" 
              id="needsSearch" 
              v-model="needsSearch" 
              class="custom-checkbox" 
            />
            <CheckIcon 
              class="checkbox-check-icon"
              :size="12"
              stroke="white"
              :stroke-width="2"
            />
          </div>
          <label for="needsSearch" class="checkbox-label">¿Necesitas una búsqueda avanzada?</label>
        </div>

        <!-- Filtros adicionales -->
        <div v-if="needsSearch && selectedReport === 'EstadisticasVictima'" class="filters-section">
          <div class="form-group">
            <RavSelect
              v-model="selectedGeneroOption"
              :options="opcionesGenero"
              :showImage="false"
              placeholder="Seleccione el género"
              :withShadow="true"
              :bgColor="'#EEF5FF'"
              inputClass="w-full"
              :height="'50.6px'"
              overlayWidth="442px"
              :placeholderFontSize="'22.77px'"
            />
          </div>
          <div class="form-group">
            <RavSelect
              v-model="selectedGrupoEtarioOption"
              :options="opcionesGrupoEtario"
              :showImage="false"
              placeholder="Seleccione el grupo etario"
              :withShadow="true"
              :bgColor="'#EEF5FF'"
              inputClass="w-full"
              :height="'50.6px'"
              overlayWidth="442px"
              :placeholderFontSize="'22.77px'"
            />
          </div>
          <div class="form-group">
            <RavSelect
              v-model="selectedProcedenciaEtnicaOption"
              :options="opcionesProcedenciaEtnica"
              :showImage="false"
              placeholder="Seleccione la procedencia étnica"
              :withShadow="true"
              :bgColor="'#EEF5FF'"
              inputClass="w-full"
              :height="'50.6px'"
              overlayWidth="442px"
              :placeholderFontSize="'22.77px'"
              position="top"
            />
          </div>
        </div>
        
        <!-- Botón de Búsqueda -->
        <button
          :disabled="loading"
          class="generate-button  sm:w-[278.3px]"
          @click="handleSubmit"
        >
          <span v-if="!loading">Generar reporte</span>
          <span v-else>Generando...</span>
        </button>
      </div>

      <!-- Imagen lateral -->
      <div class="image-section order-1 xl:order-none max-w-80 xl:max-w-[600px] -mt-10 xl:-mt-24 xl:ml-8">
        <img :src="PersonaReportes" alt="Persona sonriendo" class="persona-image w-64 h-64 md:w-80 md:h-96 xl:w-[600px] xl:h-[784px]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'; 
import axios from "axios";
import ExcelJS from "exceljs";
import Reportes from "@/assets/images/Reportes.svg";
import PersonaReportes from "@/assets/images/PersonaReportes.avif";
import logoRavBlanco from '@/assets/images/logoRavBlanco.png';
import RavSelect from '@/components/Inputs/RavSelect.vue';
import CheckIcon from '@/components/Icons/CheckIcon.vue';
import { departamentos } from "@/data/departamentosMapa/departamentos";


// Variables reactivas
const selectedReport = ref(""); // Tipo de reporte seleccionado

const selectedDepartamento = ref(""); // Departamento seleccionado (no usado directamente)
const selectedDepartmentOption = ref(null); // Opción seleccionada del componente RavSelect
const loading = ref(false);
const needsSearch = ref(false);
const host = import.meta.env.VITE_HOST;

// Variables reactivas para los RavSelect
const selectedGeneroOption = ref(null);
const selectedGrupoEtarioOption = ref(null);
const selectedProcedenciaEtnicaOption = ref(null);

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
  // Resetear selección del componente RavSelect
  selectedDepartmentOption.value = null;
  selectedGeneroOption.value = null;
  selectedGrupoEtarioOption.value = null;
  selectedProcedenciaEtnicaOption.value = null;
});

// Sincronizar la opción seleccionada del RavSelect con el nombre (string) esperado en el formulario
watch(selectedDepartmentOption, (val) => {
  if (!val) {
    form.value.department_name = '';
  } else if (typeof val === 'string') {
    form.value.department_name = val;
  } else {
    form.value.department_name = val.name ?? '';
  }
});

// Watchers para los nuevos RavSelect
watch(selectedGeneroOption, (val) => {
  if (!val) {
    form.value.genere = '';
  } else if (typeof val === 'string') {
    form.value.genere = val;
  } else {
    form.value.genere = val.value ?? '';
  }
});

watch(selectedGrupoEtarioOption, (val) => {
  if (!val) {
    form.value.etario_group = '';
  } else if (typeof val === 'string') {
    form.value.etario_group = val;
  } else {
    form.value.etario_group = val.value ?? '';
  }
});

watch(selectedProcedenciaEtnicaOption, (val) => {
  if (!val) {
    form.value.pertenencia_etnica = '';
  } else if (typeof val === 'string') {
    form.value.pertenencia_etnica = val;
  } else {
    form.value.pertenencia_etnica = val.value ?? '';
  }
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

// Opciones para RavSelect - Género
const opcionesGenero = ref([
  { name: "Hombre", value: "HOMBRE" },
  { name: "Mujer", value: "MUJER" },
  { name: "LGBTI", value: "LGBTI" },
  { name: "Intersexual", value: "INTERSEXUAL" }
]);

// Opciones para RavSelect - Grupo Etario
const opcionesGrupoEtario = ref([
  { name: "Primera infancia (0-5 años)", value: "Primera infancia (0-5 años)" },
  { name: "Infancia (6-11 años)", value: "Infancia (6-11 años)" },
  { name: "Adolescencia temprana (12-13 años)", value: "Adolescencia temprana (12-13 años)" },
  { name: "Adolescencia (14-18 años)", value: "Adolescencia (14-18 años)" },
  { name: "Juventud (19-26 años)", value: "Juventud (19-26 años)" },
  { name: "Adultez (27-59 años)", value: "Adultez (27-59 años)" },
  { name: "Persona mayor (60 años o más)", value: "Persona mayor (60 años o más)" }
]);

// Opciones para RavSelect - Procedencia Étnica
const opcionesProcedenciaEtnica = ref([
  { name: "Afrocolombiano", value: "AFROCOLOMBIANO (ACREDITADO RA)" },
  { name: "Gitano", value: "GITANO (RROM) (ACREDITADO RA)" },
  { name: "Indígena", value: "INDIGENA (ACREDITADO RA)" },
  { name: "Negro RA", value: "NEGRO (ACREDITADO RA)" },
  { name: "Negro Afro", value: "NEGRO(A) O AFROCOLOMBIANO(A)" },
  { name: "Rom", value: "ROM" },
  { name: "Raizal de San Andrés y Providencia", value: "RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES Y PROVIDENCIA" },
  { name: "Palenquero", value: "PALENQUERO" },
  { name: "Palenquero RA", value: "PALENQUERO (ACREDITADO RA)" },
  { name: "Raizal", value: "RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES Y PROVIDENCIA" },
  { name: "Ninguna", value: "NINGUNA" }
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
    let worksheetName = selectedReport.value === "AuditLogs" ? "Logs de Auditoría" : 
                       selectedReport.value === "HistorialTickets" ? "Historial de Tickets" : 
                       "Estadísticas Victimas";

    const response = await axios.get(url);
    let processedData;

    if (selectedReport.value === 'AuditLogs') {
      processedData = response.data?.logs.map(log => ({
        id: log.id,
        id_usuario: log.id_usuario,
        correo: log.correo,
        regional: log.regional,
        nombre_modulo: log.nombre_modulo,
        accion: log.accion,
        permiso_usado: log.permiso_usado,
        rol: log.rol,
        id_rol: log.id_rol,
        valor_anterior_mensaje: log.valor_anterior?.mensaje || '',
        valor_nuevo_error: log.valor_nuevo?.error || '',
        direccion_ip: log.direccion_ip,
        codigo_estado: log.codigo_estado,
        ruta_solicitud: log.ruta_solicitud,
        metodo_solicitud: log.metodo_solicitud,
        fecha_creacion: log.fecha_creacion
      })) || [];
    } else {
      processedData = response.data?.data || [];
    }

    if (processedData.length === 0) {
      alert("No se encontraron datos para el reporte seleccionado.");
      loading.value = false;
      return;
    }

    await generateReport(processedData, worksheetName, {
      regional: "Tu Regional",
      responsable: "Nombre del Responsable",
      correo: "correo@ejemplo.com"
    });

  } catch (error) {
    console.error("Error al obtener el reporte:", error);
    alert("Ocurrió un error al obtener el reporte. Por favor, inténtalo de nuevo.");
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
        fgColor: { argb: '005DCA' }, // Fondo color azul
      };
      worksheet.getCell(cell).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
    });

    // Título del reporte
    mergeCellsSafely('C1:H3');
    const titleCell = worksheet.getCell('C1');
    titleCell.value = `Reporte ${worksheetName}`;
    titleCell.font = { size: 35, bold: true, color: { argb: 'FFFFFF' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '005DCA' } };

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
  dateCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '005DCA' } };

    // Otros detalles del reporte
    mergeCellsSafely('C4:E5');
    const regionalCell = worksheet.getCell('C4');
    regionalCell.value = `Regional: ${reportDetails.regional}`;
    regionalCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
    regionalCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
  regionalCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '005DCA' } };

    mergeCellsSafely('C6:E7');
    const responsableCell = worksheet.getCell('C6');
    responsableCell.value = `Responsable de generación: ${reportDetails.responsable}`;
    responsableCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
    responsableCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
  responsableCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '005DCA' } };

    mergeCellsSafely('F4:H5');
    const correoCell = worksheet.getCell('F4');
    correoCell.value = `Correo: ${reportDetails.correo}`;
    correoCell.font = { size: 13, bold: true, color: { argb: 'FFFFFF' } };
    correoCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Alineación con ajuste de texto
  correoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '005DCA' } };

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
        fgColor: { argb: '005DCA' },
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
/* Contenedor principal */
.reportes-container {
  position: relative;
  width: 100%;
  min-height: 90vh;
}

/* Sección del header */
.header-section {
  margin-bottom: 40px;
}

.title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  height: 41px;
}

.icon-wrapper {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-reportes {
  width: 16px;
  height: 14px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.title-reportes {
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  margin: 0;
}

/* Sección de contenido */
.content-section {
  display: flex;
  flex-direction: row;
  gap: 12rem;
  align-items: flex-start;
}

/* Card del formulario */
.form-card {
  width: 506px;
  background: #FFFFFF;
  box-shadow: 0px 5.06px 12.65px rgba(0, 0, 0, 0.25);
  border-radius: 25.3px;
  padding: 31.62px;
  display: flex;
  flex-direction: column;
  gap: 20.24px;
}

/* Título del formulario */
.form-header {
  margin-bottom: 10px;
}

.form-title {
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25.3px;
  line-height: 30px;
  margin: 0;
}

/* Radio buttons */
.radio-options {
  display: flex;
  flex-direction: column;
  gap: 20.24px;
}

.radio-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15.18px;
  gap: 15.18px;
  background: #EEF5FF;
  border-radius: 37.95px;
  height: 50.6px;
}

.radio-container {
  position: relative;
  flex-shrink: 0;
}

.custom-radio {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border: 1.265px solid #005DCA;
  border-radius: 6.325px;
  margin: 0;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
}

.custom-radio:checked::after {
  content: '';
  position: absolute;
  width: 17.78px;
  height: 17.78px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #005DCA;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Contenedor para el icono del check en radio buttons */
.radio-check-icon {
  position: absolute;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1;
}

.custom-radio:checked ~ .radio-check-icon {
  opacity: 1;
}

.radio-label {
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 22.77px;
  line-height: 27px;
  color: #000000;
  cursor: pointer;
  margin: 0;
  flex: 1;
}

/* Divisor */
.divider {
  width: 100%;
  height: 0px;
  border: 1.265px solid #EEF5FF;
  margin: 10px 0;
}

/* Form groups */
.form-group {
  margin-bottom: 20.24px;
}

/* Selects e Inputs */
.form-input {
  width: 100%;
  height: 50.6px;
  background: #EEF5FF;
  border-radius: 37.95px;
  padding: 10.12px 25.3px;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 22.77px;
  line-height: 27px;
  color: #000000;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #000000;
  opacity: 0.6;
}

/* Checkbox group */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20.24px;
}

.checkbox-container {
  position: relative;
  flex-shrink: 0;
}

.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #005DCA;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  background: #FFFFFF;
}

.custom-checkbox:checked {
  background: #005DCA;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #005DCA;
  border-radius: 2px;
}

/* Icono del check para checkbox */
.checkbox-check-icon {
  position: absolute;
  left: 52%;
  top: 46%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1;
}

.custom-checkbox:checked ~ .checkbox-check-icon {
  opacity: 1;
}

.checkbox-label {
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  cursor: pointer;
}

/* Filters section */
.filters-section {
  display: flex;
  flex-direction: column;
  gap: 20.24px;
}

/* Botón de generar reporte */
.generate-button {
  height: 50.6px;
  background: #00AA00;
  border-radius: 37.95px;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 25.3px;
  line-height: 30px;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
}

.generate-button:hover:not(:disabled) {
  background: #009900;
}

.generate-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

/* Sección de imagen */
.image-section {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.persona-image {
  object-fit: contain;
}

/* Responsive */
@media (max-width: 1279px) {
  .content-section {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  
  .reportes-container {
    padding: 52px 40px 50px;
  }
}

@media (max-width: 768px) {
  .reportes-container {
    padding: 0px 10px;
  }
  
  .form-card {
    width: 100%;
    max-width: 506px;
    padding: 20px;
  }
  
  .icon-wrapper {
    width: 30px;
    height: 30px;
  }
  
  .icon-reportes {
    width: 16px;
    height: 14px;
  }
  
  .title-reportes {
    font-size: 24px;
    line-height: 28px;
  }
  
  .form-title {
    font-size: 20px;
    line-height: 24px;
  }
  
  .radio-label,
  .form-input {
    font-size: 18px;
    line-height: 22px;
  }
  
  .generate-button {
    font-size: 20px;
    line-height: 24px;
    width: 209px;
    height: 38px;
  }
}

/* Opciones de select */
option {
  font-size: 18px;
  padding: 8px;
  line-height: 1.4;
  background: #FFFFFF;
  color: #000000;
}
</style>
