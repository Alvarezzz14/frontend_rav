<template>
  <div class="h-screen flex flex-col text-center rounded-3xl">
    <div class="cover-container flex-grow w-full p-3 mx-auto flex flex-col items-center justify-center">
      <main role="main" class="inner cover flex flex-col items-center w-full">
        <div id="colombia" class="map tall text-left" v-if="!loading"></div>
        <div id="loader-wrapper" v-if="loading">
          <div class="loader-section section-left"></div>
          <div class="loader-section section-right"></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3'; // Importar D3.js
import Datamap from 'datamaps'; // Importar Datamaps
import jsonData from '../assets/colombia.topo.json'; // Asegúrate de que la ruta sea correcta

export default {
  setup() {
    const loading = ref(true);

    onMounted(() => {
      loadMap();
    });

    const loadMap = () => {
      var map = new Datamap({
        element: document.getElementById('colombia'),
        scope: 'colombia',
        fills: {
          defaultFill: '#FFFFFF',
        },
        geographyConfig: {
          data: jsonData,
          hideAntarctica: true,
          borderWidth: 2,
          borderColor: '#FDC300',
          popupTemplate: function (geography) {
            return `<div class="hoverinfo"><strong>${geography.properties.name}</strong></div>`;
          },
          popupOnHover: true,
          highlightOnHover: true,
          highlightFillColor: '#FFBF00',
          highlightBorderColor: '#FFBF00',
        },
        setProjection: function (element) {
          // Asegúrate de usar geoMercator() y geoPath()
          const projection = d3.geoMercator()
            .center([-74, 3])
            .scale(element.offsetWidth * 4)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
          const path = d3.geoPath().projection(projection);
          return { path, projection };
        },
      });

      // Hacer el mapa responsive al redimensionar la ventana
      window.addEventListener('resize', function () {
        map.resize();
      });

      // Cerrar el preloader después de cargar el mapa
      setTimeout(() => {
        loading.value = false;
        document.body.classList.add('loaded');
      }, 1000);
    };

    return {
      loading,
    };
  },
};

</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>

<style scoped>
/* Estilos de Tailwind adaptados desde el CSS original */
html,
body {
  height: 100%;
  background-color: white;
}

.cover-container {
  max-width: 42em;
}

.map {
  position: relative;
  margin: 0 auto;
  width: 100%; /* Cambiado para ser responsivo */
  height: 700px; /* Altura fija o ajustada a tus necesidades */
  color: black;
}

@media (max-width: 980px) {
  .map {
    height: 500px; /* Ajustar la altura para dispositivos móviles */
  }
}

/* Estilos para el preloader */
#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.loader-section {
  position: fixed;
  top: 0;
  width: 51%;
  height: 100%;
  background: white;
  z-index: 1000;
}

.loader-section.section-left {
  left: 0;
}

.loader-section.section-right {
  right: 0;
}

/* Estilos de carga */
.loaded #loader-wrapper .loader-section.section-left {
  transform: translateX(-100%);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader-wrapper .loader-section.section-right {
  transform: translateX(100%);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader {
  opacity: 0;
  transition: all 0.3s ease-out;
}

.loaded #loader-wrapper {
  visibility: hidden;
  transform: translateY(-100%);
  transition: all 0.3s 1s ease-out;
}

/* Hover info */
.hoverinfo {
  border-radius: 4px;
  width: auto;
  border-color: #71277a;
  height: auto;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: medium;
  padding: 0.5rem;
  border-style: solid;
  background-color: rgba(113, 39, 122, 0.5);
}
</style>
