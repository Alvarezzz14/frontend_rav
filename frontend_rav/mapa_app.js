var map = new Datamap({
  element: document.getElementById('colombia'),
  scope: 'colombia',
  responsive: true,
  done: function() {},

  // Asignación de color blanco a las áreas de los departamentos
  fills: {
    defaultFill: '#FFFFFF' // Fondo blanco para todos los departamentos
  },

  geographyConfig: {
    dataUrl: 'colombia.topo.json',
    hideAntarctica: true,
    borderWidth: 2, // Corregido: 'borderinlinesize' a 'borderWidth'
    borderColor: '#FDC300', // Bordes de los departamentos en amarillo
    borderOpacity: 3,

    popupTemplate: function(geography) {
      return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
    },

    popupOnHover: true, // El popup se muestra al hacer hover
    highlightOnHover: true,
    highlightFillColor: '#FFBF00', // Color de fondo blanco al hacer hover
    highlightBorderColor: '#FFBF00', // Bordes amarillos oscuros al hacer hover
    highlightBorderWidth: 4, // Corregido: 'higlightBorderWidth' a 'highlightBorderWidth'
    highlightBorderOpacity: 1
   

  },

  setProjection: function(element) {
    var projection = d3.geo.mercator()
      .center([-74, 3])
      .scale(element.offsetWidth * 4)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    var path = d3.geo.path().projection(projection);
    return { path: path, projection: projection };
  }
});

// Hacer el mapa responsive al redimensionar la ventana
window.addEventListener('resize', function() {
  map.resize();
});

// Evento para cargar contenido al cargar el documento
$(document).ready(function() {
  setTimeout(function() {
    $('body').addClass('loaded');
    $('h1').css('color', '#222222');
  }, 1000);
});
