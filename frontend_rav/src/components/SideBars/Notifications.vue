<template>
	<aside class="bg-gray-100 pt-2 w-full md:w-64 space-y-4">
	  <!-- Sección de Actividad -->
	  <div>
		<h2 class="text-lg font-bold pt-8  text-customPurple">Actividad</h2>
		<div class="flex flex-col items-center">
		  <div v-for="(goal, index) in goals" :key="index" class="my-2">
			<div class="relative w-16 h-16 md:w-20 md:h-20">
			  <!-- Fondo del medidor vacío -->
			  <svg class="w-full h-full" viewBox="0 0 100 100">
				<circle cx="50" cy="50" r="40" stroke="lightgray" stroke-width="6" fill="none" />
				<!-- Círculo animado que muestra el progreso -->
				<circle
				  cx="50"
				  cy="50"
				  r="40"
				  stroke="currentColor"
				  :stroke-dasharray="circumference"
				  :stroke-dashoffset="circumference - (circumference * goal.value / 100)"
				  stroke-width="6"
				  fill="none"
				  class="text-customPurple transition-all duration-1000 ease-out"
				/>
			  </svg>
			  <span class="absolute inset-0 flex items-center justify-center text-lg font-bold">
				{{ goal.value }}
			  </span>
			</div>
			<p class="text-center text-xs font-semibold">{{ goal.label }}</p>
		  </div>
		</div>
	  </div>
  
	  <!-- Sección de Notificaciones -->
	  <div>
		<h2 class="text-lg font-bold text-customPurple mb-2 flex items-center">
		  Notificaciones
		  <button
			v-if="extraNotifications > 0"
			@click="toggleNotifications"
			class="ml-2 bg-customPurple text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
		  >
			+{{ extraNotifications }}
		  </button>
		</h2>
		
		<!-- Mostrar solo la primera notificación -->
		<div v-if="notifications.length > 0" class="bg-white p-3 rounded-lg mb-2 shadow">
		  <h3 class="font-semibold">{{ notifications[0].title }}</h3>
		  <span class="text-xs text-gray-500">{{ notifications[0].date }}</span>
		  <p class="text-sm mt-1">{{ notifications[0].message }}</p>
		</div>
  
		<!-- Mostrar notificaciones adicionales si están desplegadas -->
		<div v-if="showAllNotifications">
		  <div v-for="(notification, index) in additionalNotifications" :key="index" class="bg-white p-3 rounded-lg mb-2 shadow">
			<h3 class="font-semibold">{{ notification.title }}</h3>
			<span class="text-xs text-gray-500">{{ notification.date }}</span>
			<p class="text-sm mt-1">{{ notification.message }}</p>
		  </div>
		</div>
	  </div>
	</aside>
  </template>
<script setup>
import { ref, computed, onMounted } from 'vue';

const goals = ref([
  { label: 'META TRIMESTRAL', value: 0 },
  { label: 'META DIARIA', value: 0 },
]);

const circumference = 2 * Math.PI * 40; // Circunferencia para el círculo SVG

// Simulación de carga de los valores del medidor
onMounted(() => {
  setTimeout(() => {
    goals.value[0].value = 80; // Valor final de la meta trimestral (puedes ajustarlo)
    goals.value[1].value = 50; // Valor final de la meta diaria (puedes ajustarlo)
  }, 500);
});

// Lista de notificaciones
const notifications = ref([
  { title: 'Título de notificación', date: '17/07/2024', message: 'Lorem ipsum dolor sit amet...' },
  { title: 'Título de notificación', date: '17/07/2024', message: 'Lorem ipsum dolor sit amet...' },
  // Agrega más notificaciones si lo deseas
]);

// Computed para mostrar las notificaciones adicionales
const additionalNotifications = computed(() => notifications.value.slice(1));

// Contador de notificaciones adicionales
const extraNotifications = computed(() => Math.max(0, notifications.value.length - 1));

// Estado para controlar si las notificaciones adicionales están desplegadas
const showAllNotifications = ref(false);

// Función para alternar la visibilidad de las notificaciones adicionales
const toggleNotifications = () => {
  showAllNotifications.value = !showAllNotifications.value;
};
</script>
  