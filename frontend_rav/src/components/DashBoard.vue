<template>
  <div class="main-view">
    <!-- Primera Sección: Contenedores con contenido e imagen -->
    <div class="top-section">
      <div class="content-container">
        <h4>SENA</h4>
        <div class="content">
          <p>12883124</p>
        </div>
        <div class="image">
          <img :src="imagePaths[0]" alt="Imagen estática" class="static-image" />
        </div>
      </div>
      <div class="content-container">
        <h4>Ape</h4>
        <div class="content">
          <p>97883112</p>
        </div>
        <div class="image">
          <img :src="imagePaths[1]" alt="Imagen estática" class="static-image" />
        </div>
      </div>
      <div class="content-container">
        <h4>SENA Certificados</h4>
        <div class="content">
          <p>85883161</p>
        </div>
        <div class="image">
          <img :src="imagePaths[2]" alt="Imagen estática" class="static-image" />
        </div>
      </div>
      <div class="content-container">
        <h4>Fondo Emprender</h4>
        <div class="content">
          <p>99883151</p>
        </div>
        <div class="image">
          <img :src="imagePaths[3]" alt="Imagen estática" class="static-image" />
        </div>
      </div>
    </div>

    <!-- Segunda Sección: Gráficos -->
    <div class="chart-section">
      <div class="chart-container">
        <LineChart />
      </div>
      <div class="chart-container">
        <BarChart />
      </div>
    </div>

    <!-- Tercera Sección: Tabla de Datos -->
    <div class="table-section">
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Departamento</th>
            <th>Estado Actual</th>
            <th>Fecha de Acercamiento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.Departamento }}</td>
            <td>{{ row.Estado }}</td>
            <td>{{ row.Fecha }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.vue';
import BarChart from './BarChart.vue';

// Importa las imágenes estáticas
import LogoSenaverde from '@/assets/images/logosenaverde.svg';
import LogoApe from '@/assets/images/logoape.svg';
import LogoSenaverdecer from '@/assets/images/logosenaverde.svg';
import FondoEmprender from '@/assets/images/fondoemprender.svg';

export default {
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      // Rutas de las imágenes estáticas para cada contenedor
      imagePaths: [
        LogoSenaverde,
        LogoApe,
        LogoSenaverdecer,
        FondoEmprender
      ],
      // Datos de ejemplo para la tabla
      tableData: [
        { Departamento: 1, Estado: 'Jorge Raul', Fecha: 2004 },
        { Departamento: 2, Estado: 'Pedronel Santa', Fecha: 2001 },
        { Departamento: 3, Estado: 'Alfredo Quinquilla', Fecha: 1967 },
        { Departamento: 4, Estado: 'Jorge Raul', Fecha: 2004 },
        { Departamento: 5, Estado: 'Pedronel Santa', Fecha: 2001 },
        { Departamento: 6, Estado: 'Alfredo Quinquilla', Fecha: 1967 },
        { Departamento: 7, Estado: 'Jorge Raul', Fecha: 2004 },
        { Departamento: 8, Estado: 'Pedronel Santa', Fecha: 2001 },
        { Departamento: 9, Estado: 'Alfredo Quinquilla', Fecha: 1967 },
        { Departamento: 10, Estado: 'Jorge Raul', Fecha: 2004 }
      ]
    };
  }
};
</script>

<style scoped>
.main-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Estilos para la Primera Sección */
.top-section {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.content-container {
  flex: 1;
  padding: 15px;
  border: 1px solid #7A1F7E;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
}

.image {
  margin-top: 10px;
}


.static-image {
  width: 100px; /* Establece el ancho fijo deseado */
  height: auto; /* Mantiene la proporción del aspecto */
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
  align-items: center;
}

/* Estilos para la Segunda Sección */
.chart-section {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.chart-container {
  flex: 1;
  padding: 15px;
  border: 1px solid #7A1F7E;
  border-radius: 8px;
  background-color: #f9f9f9;
}

/* Estilos para la Tercera Sección */
.table-section {
  padding: 15px;
  border: 1px solid #7A1F7E;
  border-radius: 8px;
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

p{
  color: #7A1F7E;
  font-size: 30px;
}

th {
  background-color: #f0f0f0;
  font-weight: bold;
}

h3 {
  color: #7A1F7E;
}

</style>
