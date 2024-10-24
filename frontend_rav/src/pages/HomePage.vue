<template>
	<div>
		<h1 class="text-3xl font-bold text-center">Home Page</h1>
		<p class="text-lg text-center">Bienvenido a la página de inicio</p>
		<SearchApartament></SearchApartament>
		
	</div>
	<Button />
</template>

<script setup>
import Button from "../components/Button.vue";

import SearchApartament from "../components/SearchApartament.vue";
</script>
