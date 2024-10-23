<template>
	<div>
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
		</nav>
		<!-- Aquí se renderizan las rutas -->
		<router-view />
	</div>
</template>

<script setup>
// No se necesita lógica aquí por ahora, ya que estamos manteniendo el archivo lo más limpio posible.
</script>
