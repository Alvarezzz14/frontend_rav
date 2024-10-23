<template>
	<div>

		

		<ComponenteMapa></ComponenteMapa>
	
		<!-- Aquí se renderizan las rutas -->
		<router-view />
	</div>
</template>

<script setup>

import ComponenteMapa from './components/ComponenteMapa.vue';



// No se necesita lógica aquí por ahora, ya que estamos manteniendo el archivo lo más limpio posible.
</script>
