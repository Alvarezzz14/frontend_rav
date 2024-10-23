<template>
	<div>
		<prueba></prueba>
		<SelectDepartamento></SelectDepartamento>
		<!-- Aquí se renderizan las rutas -->
		<router-view />
	</div>
</template>

<script setup>
import Prueba from "./components/Prueba.vue";
import SelectDepartamento from "./components/SelectDepartamento.vue";

// No se necesita lógica aquí por ahora, ya que estamos manteniendo el archivo lo más limpio posible.
</script>
