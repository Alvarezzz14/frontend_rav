<template>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
      <main role="main" class="inner cover">
        <div id="colombia" class="map tall text-left"></div>
        <div class="card fixed-bottom" style="margin: 10px; text-shadow: none;">
          <div class="card-body" style="padding: 10;"></div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ColombiaMap',
    mounted() {
      // Aquí puedes incluir la lógica de tu script mapa_app.js
      this.loadMapScripts();
    },
    methods: {
      loadMapScripts() {
        // Cargar scripts de manera dinámica si es necesario
        const scripts = [
          'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
          '//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js',
          '//cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js',
          'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/datamaps.none.js',
          'mapa_app.js' // Asegúrate de que este archivo está en la carpeta adecuada
        ];
        
        scripts.forEach(src => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false; // Para mantener el orden de carga
          document.body.appendChild(script);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  </style>
  
