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
            placeholder="Ingrese el número de C.C."
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
              <option disabled value="">Seleccione una opción</option>
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

// Variables reactivas
const selectedReport = ref(""); // Tipo de reporte seleccionado
const selectedDepartamento = ref(""); // Departamento seleccionado
const dateRange = ref({ from: "", to: "" }); // Rango de fechas
const loading = ref(false);
const needsSearch = ref(false);

const municipios = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Abejorral", "Abriaquí", "Alejandría", "Amagá", "Amalfi", "Andes", "Angelópolis", "Anorí", "Antón García", "Argelia", "Armenia", "Barbosa", "Bello", "Betania", "Briceño", "Cañasgordas", "Caramanta", "Carolina", "Caucasia", "Chigorodó", "Cisneros", "Ciudad Bolívar", "Cocorná", "Concepción", "Concordia", "Dabeiba", "Donmatías", "Ebéjico", "Entrerríos", "Envigado", "Fredonia", "Frontino", "Giraldo", "Girardota", "Granada", "Guarne", "Guatapé", "Heliconia", "Jardín", "La Ceja", "La Estrella", "La Pintada", "La Unión", "Medellín", "Montebello", "Murindó", "Mutatá", "Nariño", "Necoclí", "Olaya", "Peñol", "Puerto Berrío", "Puerto Nare", "Puerto Triunfo", "Remedios", "Rionegro", "Sabanalarga", "Sabaneta", "San Andrés de Cuerquía", "San Carlos", "San Francisco", "San Jerónimo", "San José de la Montaña", "San Juan de Urabá", "San Luis", "San Pedro", "San Rafael", "San Roque", "San Vicente de Ferrer", "Santa Fe de Antioquia", "Santa Rosa de Osos", "Santo Domingo", "Segovia", "Sonsón", "Sopetrán", "Tarazá", "Támesis", "Titiribí", "Toledo", "Turbo", "Uramita", "Urrao", "Valdivia", "Valparaíso", "Vegachí", "Yalí", "Yarumal", "Yolombó", "Zaragoza"],
    "Arauca": ["Arauca", "Arauquita", "Cravo Norte", "Fortul", "Puerto Rondón", "Saravena", "Tame"],
    "Atlántico": ["Barranquilla", "Baranoa", "Campo de la Cruz", "Candelaria", "Galapa", "Juan de Acosta", "Luruaco", "Malambo", "Manatí", "Palmar de Varela", "Piohacha", "Polonuevo", "Repelón", "Sabanalarga", "Sabanagrande", "Santa Lucía", "Soledad", "Suán", "Tiburón", "Turipaná"],
    "Bolívar": ["Cartagena", "Achí", "Altos del Rosario", "Arenal", "Arjona", "Barranco de Loba", "Bayunca", "Brazo de Leche", "Calamar", "Cantagallo", "Cicuco", "Clemencia", "El Carmen de Bolívar", "El Guamo", "El Peñón", "Hatillo de Loba", "Magangué", "Mahates", "Margarita", "Mompox", "Montecristo", "Morales", "San Cristóbal", "San Estanislao", "San Jacinto", "San Juan Nepomuceno", "San Martín de Loba", "San Pablo", "Santa Catalina", "Santa Rosa", "Soplaviento", "Talaigua Nuevo", "Tiquisio", "Turbana", "Villanueva"],
    "Boyacá": ["Aquitania", "Arcabuco", "Belén", "Berbeo", "Bitugué", "Bocayá", "Boyacá", "Caldas", "Chiquinquirá", "Cucaita", "Gámeza", "Garagoa", "Iza", "Jenesano", "La Capilla", "La Victoria", "Monguí", "Moniquirá", "Morca", "Nobsa", "Nuevo Colón", "Oicata", "Paipa", "Pajarito", "Páez", "Pasto", "Pisba", "Ráquira", "Rondón", "Saboyá", "San Eduardo", "San José de Pare", "Santa María", "Siachoque", "Soatá", "Tibasosa", "Tuta", "Tuta", "Tunja", "Villa de Leyva", "Zetaquira"],
    "Caldas": ["Manizales", "Aguadas", "Anserma", "Aranzá", "Chinchiná", "Filadelfia", "La Dorada", "La Merced", "Marmato", "Neira", "Palestina", "Pácora", "Salamina", "Samaná", "San José", "Supía", "Villamaría", "Viterbo"],
    "Caquetá": ["Florencia", "Belén de los Andaquies", "Cartagena del Chairá", "Curillo", "El Doncello", "El Paujíl", "La Montañita", "Morelia", "Puerto Rico", "Solano", "Solita", "Valparaíso"],
    "Casanare": ["Yopal", "Aguazul", "Chámeza", "Hato Corozal", "La Salina", "Maní", "Montañas del Totumo", "Nunchía", "Orocué", "Paz de Ariporo", "Recetor", "Sabanalarga", "Tauramena", "Trinidad", "Villanueva"],
    "Cauca": ["Popayán", "Almagro", "Argelia", "Balboa", "Bolívar", "Buenos Aires", "Cajibío", "Caloto", "Corinto", "El Tambo", "Florencia", "Guapi", "Inzá", "Jambaló", "La Sierra", "La Vega", "López de Micay", "Mercaderes", "Morales", "Patía", "Piamonte", "Piendamó", "Puerto Tejada", "Puracé", "Rosas", "San Sebastián", "Santa Rosa", "Silvia", "Sotara", "Suárez", "Timbío", "Timbiquí", "Toribío", "Totoró", "Villa Rica"],    
    "Cesar": ["Valledupar", "Aguachica", "Agustín Codazzi", "Chimichagua", "La Paz", "Manaure", "Pailitas", "Pelaya", "San Alberto", "San Diego", "San Martín", "Tamalameque", "González", "La Jagua de Ibirico", "Chiriguaná", "Pueblo Bello", "Rio de Oro", "San Juan del Cesar", "El Copey", "Distracción", "Fonseca", "Hatonuevo", "La Glorieta"],
    "Chocó": ["Quibdó", "Acandí", "Alto Baudó", "Bagadó", "Bahía Solano", "Bojayá", "Carmen de Atrato", "Certegui", "Condoto", "El Carmen de Atrato", "Istmina", "Juradó", "Lloró", "Medio Atrato", "Medio Baudó", "Río Iró", "Río Quito", "San José del Palmar", "San Juan de Urabá", "Tadó", "Unguía", "Unión Panamericana"],
    "Córdoba": ["Montería", "Ayapel", "Buenavista", "Canalete", "Cereté", "Chimá", "Chinú", "Ciénaga de Oro", "Montelíbano", "Moñitos", "Planeta Rica", "Puerto Escondido", "Puerto Libertador", "San Andrés de Sotavento", "San Antero", "San Bernardo del Viento", "San Carlos", "San José de Uré", "San Pelayo", "Tierralta", "Tuchín", "Valencia"],
    "Cundinamarca": ["Bogotá", "Agua de Dios", "Albán", "Anapoima", "Anolaima", "Apulo", "Arbeláez", "Beltrán", "Bituima", "Bojacá", "Caparrapí", "Cáqueza", "Carmen de Carupa", "Chaguaní", "Chía", "Chipaque", "Choachí", "Chocontá", "Cogua", "Cota", "El Colegio", "El Peñón", "Fómeque", "Fontibón", "Funza", "Fusa", "Guachetá", "Guaduas", "Guasca", "Guatavita", "La Calera", "La Peña", "La Vega", "Madrid", "Manta", "Medina", "Mosquera", "Nemocón", "Nilo", "Nocaima", "Pacho", "Pandi", "Paratebueno", "Pasca", "Puerto Salgar", "Pueblo Nuevo", "Quetame", "Quipile", "Ricaurte", "San Antonio del Tequendama", "San Bernardo", "San Juan de Rioseco", "Sasaima", "Sesquilé", "Soacha", "Sopó", "Subachoque", "Supatá", "Tena", "Tenjo", "Tibacuy", "Tocaima", "Tocancipá", "Topaipí", "Ubate", "Venecia", "Vianí", "Villagómez", "Villapinzón", "Zipaquirá"],
    "Guainía": ["Inírida", "Barranco Minas", "Cacahual", "San Felipe", "Pana Pana", "Morichal", "Mapiripana", "La Guadalupe"],
    "Guaviare": ["San José del Guaviare", "Calamar", "El Retorno", "Miraflores"],
    "Huila": ["Neiva", "Acevedo", "Agrado", "Algeciras", "Altamira", "Baraya", "Campoalegre", "Colombia", "Elías", "Garzón", "Gigante", "Guadalupe", "Hobo", "Isnos", "La Argentina", "La Plata", "Nátaga", "Oporapa", "Paicol", "Pital", "Pitalito", "Rivera", "Saladoblanco", "San Agustín", "San Sebastián", "Santa María", "Suaza", "Tarqui", "Tesalia", "Tello", "Timaná", "Villavieja"],
    "La Guajira": ["Riohacha", "Albania", "Barrancas", "Dibulla", "Distracción", "Fonseca", "Hatonuevo", "La Jagua del Pilar", "Maicao", "Manaure", "San Juan del Cesar", "Urumita", "Villanueva"],
    "Magdalena": ["Santa Marta", "Algarrobo", "Aracataca", "Cerro de San Antonio", "Chivolo", "Ciénaga", "Concordia", "El Banco", "El Retén", "Fundación", "Guamal", "Ariguaní", "Pivijay", "Plato", "Salamina", "San Sebastián de Buenavista", "Santa Ana", "Sitionuevo", "Tenerife", "Zapata", "Zona Bananera"],
    "Meta": ["Villavicencio", "Acacías", "Barranca de Upía", "Cabuyaro", "Castilla la Nueva", "Cubarral", "Cumaral", "El Calvario", "El Dorado", "Fuentedeoro", "Granada", "La Macarena", "La Uribe", "Lejanías", "Mapiripán", "Mesetas", "Puerto Concordia", "Puerto Gaitán", "Puerto Lleras", "Puerto Rico", "Restrepo", "San Carlos de Guaroa", "San Juan de Arama", "San Martín", "Vistahermosa"],
    "Nariño": ["San Juan de Pasto", "Albania", "Ancuyá", "Arboleda", "Barbacoas", "Belén", "Buesaco", "Chachagüí", "Colón", "Consacá", "Contadero", "Córdoba", "El Peñol", "El Rosario", "Francisco Pizarro", "Guachucal", "Iles", "Imués", "La Cruz", "La Florida", "La Llanada", "La Tola", "Leiva", "Linares", "Los Andes", "Magüí Payán", "Mallama", "Mosquera", "Nariño", "Ospina", "Pasto", "Puerres", "Pupiales", "Ricaurte", "Roberto Payán", "Samaniego", "San Bernardo", "San José de Albán", "San Lorenzo", "San Pablo", "San Pedro de Cartago", "Sapuyes", "Taminango", "Tumaco", "Yacuanquer"],
    "Norte de Santander": ["Cúcuta", "Ábrego", "Arboledas", "Bochalema", "Bucarasica", "Cáchira", "Cacota", "Chinácota", "Chitagá", "Convención", "Cúcuta", "Durania", "El Carmen", "El Tarra", "Gramalote", "La Esperanza", "La Playa", "Los Patios", "Ocaña", "Pamplona", "Pamplonita", "San Calixto", "San Cayetano", "Sardinata", "Silos", "Teorama", "Tibú", "Toledo", "Villa del Rosario"],
    "Putumayo": ["Mocoa", "Colón", "Orito", "Puerto Asís", "Puerto Caicedo", "Puerto Guzmán", "San Miguel", "Santiago", "Valle del Guamuez", "Villagarzón"],
    "Quindío": ["Armenia", "Buenavista", "Calarcá", "Circasia", "Cordoba", "Filandia", "La Tebaida", "Montenegro", "Pijao", "Quimbaya", "Salento"],
    "Risaralda": ["Pereira", "Apía", "Balboa", "Dosquebradas", "Guática", "La Celia", "La Virginia", "Marsella", "Mistrató", "Pueblo Rico", "Quinchía", "Santa Rosa de Cabal", "Santuario"],
    "San Andrés y Providencia": ["San Andrés", "Providencia", "Santa Catalina"],
    "Santander": ["Bucaramanga", "Barrancabermeja", "San Gil", "Cúcuta", "Floridablanca", "Girón", "Piedecuesta", "Socorro", "Zapatoca", "Barrancabermeja", "Lebrija", "Málaga", "Páramo", "Puente Nacional", "Rionegro", "Pinchote", "Vélez", "Betulia", "Cabrera", "Cimitarra", "El Playón", "Encino", "Florian", "Güepsa", "Guapotá", "Palmar", "Piedecuesta", "Rionegro", "Sabana de Torres", "San Vicente de Chucurí", "Santa Bárbara, Santander", "Suratá"],
    "Sucre": ["Sincelejo", "Corozal", "San Onofre", "Sampués", "La Unión", "Morroa", "Tolú", "Ovejas", "Coveñas", "Los Palmitos", "San Benito Abad", "Colosó", "San Juan de Betulia", "Majagual", "San Pedro", "Buenavista", "Guaranda", "La Mojana", "San Marcos", "Sucre", "Tolu Viejo"],
    "Tolima": ["Ibagué", "Alvarado", "Ambalema", "Anzoátegui", "Armero", "Ataco", "Cajamarca", "Carmen de Apicalá", "Casabianca", "Chaparral", "Coello", "Coyaima", "Cunday", "Dolores", "Espinal", "Falan", "Flandes", "Guamo", "Honda", "Icononzo", "Lérida", "Mariquita", "Melgar", "Murillo", "Natagaima", "Ortega", "Palocabildo", "Piedras", "Planadas", "Prado", "Purificación", "Roncesvalles", "Rovira", "Saldaña", "San Antonio", "San Luis", "Santa Isabel", "Suárez", "Venadillo", "Villahermosa"],
    "Valle del Cauca": ["Cali", "Cartago", "Buenaventura", "Buga", "Tuluá", "Palmira", "Candelaria", "Zarzal", "Roldanillo", "El Cerrito", "Guadalajara de Buga", "Pradera", "Andalucía", "Yumbo", "La Cumbre", "Restrepo", "Dagua", "Candelaria", "El Águila", "Florida", "Ginebra", "Trujillo", "Obando", "Calima", "Riviera", "La Victoria", "Riofrío", "San Pedro", "Versalles", "Villarica", "Riohacha", "Zarzal"],
    "Vaupés": ["Mitú", "Carurú", "Papunaua", "Taraira", "Yavaraté"],
    "Vichada": ["Puerto Carreño", "La Primavera", "Cumaribo", "Santa Rosalía", "Mapiripana"]
}

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
