<template>
	<div class="overflow-auto">
	  <!-- Sidebar Derecho -->
	  <div>
		<div class="flex flex-col bg-white items-center">
		  <!-- Sección de Actividad -->
		  <h2
			class="text-lg bg-amarillo w-full text-center font-bold text-azulBarraApe py-2">
			Actividad
		  </h2>
		  <div v-for="(goal, index) in goals" :key="index" class="border-b my-2">
			<div class="relative w-16 h-16 md:w-20 md:h-20">
			  <!-- Fondo del medidor vacío -->
			  <svg class="w-full h-full" viewBox="0 0 100 100">
				<circle
				  cx="50"
				  cy="50"
				  r="40"
				  stroke="lightgray"
				  stroke-width="6"
				  fill="none" />
				<!-- Círculo animado que muestra el progreso -->
				<circle
				  cx="50"
				  cy="50"
				  r="40"
				  stroke="currentColor"
				  :stroke-dasharray="circumference"
				  :stroke-dashoffset="
					circumference - (circumference * goal.value) / 100
				  "
				  stroke-width="6"
				  fill="none"
				  class="text-azulBarraApe transition-all duration-1000 ease-out" />
			  </svg>
			  <span
				class="absolute inset-0 flex items-center justify-center text-lg font-bold">
				{{ goal.value }}
			  </span>
			</div>
			<p class="text-center text-xs font-semibold">{{ goal.label }}</p>
		  </div>
  
		  <!-- Sección de Notificaciones -->
		  <div class="shadow-top w-full">
			<h2
			  class="text-lg font-semibold bg-azulBarraApe mb-2 p-2 flex items-center text-amarillo justify-between">
			  Notificaciones
			  <button
				v-if="extraNotifications > 0"
				@click="toggleNotifications"
				class="bg-amarillo text-azulBarraApe w-6 h-6 rounded-full flex items-center justify-center text-xs">
				+{{ extraNotifications }}
			  </button>
			</h2>
  
			<!-- Mostrar solo la primera notificación -->
			<div
			  v-if="notifications.length > 0"
			  class="bg-gray-50 p-3 rounded-lg mx-4 mb-2 shadow">
			  <h3 class="font-semibold">{{ notifications[0].title }}</h3>
			  <span class="text-xs text-gray-500">{{ notifications[0].date }}</span>
			  <p class="text-sm mt-1">{{ notifications[0].message }}
				<!-- Mostrar el progreso de carga -->
				<span v-if="notifications[0].progress !== undefined">
				  <progress :value="notifications[0].progress" max="100"></progress>
				  <p>{{ notifications[0].progress }}%</p>
				</span>
				<!-- Mostrar la URL de redirección si está definida -->
				<span v-if="notifications[0].redirectUrl">
				  <a :href="notifications[0].redirectUrl" class="text-blue-500 underline">
					Ir a la página
				  </a>
				</span>
			  </p>
			</div>
  
			<!-- Mostrar notificaciones adicionales si están desplegadas -->
			<div v-if="showAllNotifications">
			  <div
				v-for="(notification, index) in additionalNotifications"
				:key="index"
				class="bg-gray-50 p-3 rounded-lg mb-2 mx-4 shadow">
				<h3 class="font-semibold">{{ notification.title }}</h3>
				<span class="text-xs text-gray-500">{{ notification.date }}</span>
				<p class="text-sm mt-1">{{ notification.message }}
				  <!-- Mostrar el progreso de carga -->
				  <span v-if="notification.progress !== undefined">
					<progress :value="notification.progress" max="100"></progress>
					<p>{{ notification.progress }}%</p>
				  </span>
				  <!-- Mostrar la URL de redirección si está definida -->
				  <span v-if="notification.redirectUrl">
					<a :href="notification.redirectUrl" class="text-blue-500 underline">
					  Ir a la página
					</a>
				  </span>
				</p>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Estado de las metas (si es necesario para otras funcionalidades)
const goals = ref([
  { label: "META TRIMESTRAL", value: 0 },
  { label: "META DIARIA", value: 0 },
]);

const circumference = 2 * Math.PI * 40;

// Simular valores de las metas (puedes eliminar esta parte si no es necesario)
onMounted(() => {
  setTimeout(() => {
    goals.value[0].value = 80;
    goals.value[1].value = 50;
  }, 500);
});

// Notificaciones
const notifications = ref([
  {
    title: "Título de notificación",
    date: "17/07/2024",
    message: "Lorem ipsum dolor sit amet...",
    redirectUrl: "http://localhost:5173/subirfichero", // Aquí se añade la URL de redirección
  },
]);

const additionalNotifications = computed(() => notifications.value.slice(1));

const extraNotifications = computed(() =>
  Math.max(0, notifications.value.length - 1)
);

const showAllNotifications = ref(false);

const toggleNotifications = () => {
  showAllNotifications.value = !showAllNotifications.value;
};

// Función para manejar la actualización del progreso de la carga
const handleFileUploadProgress = (event) => {
  const notification = event.detail;

  // Buscar la notificación existente o crear una nueva si no existe
  const existingNotification = notifications.value.find(
    (notif) => notif.title === notification.title && notif.message === notification.message
  );

  if (existingNotification) {
    // Actualizar la notificación con el progreso
    existingNotification.progress = notification.progress;
  } else {
    // Si es una nueva notificación, añadirla a la lista
    notifications.value.push(notification);
  }
};

// Escuchar el evento de progreso de carga
window.addEventListener("file-upload-progress", handleFileUploadProgress);

// Limpiar el evento cuando el componente sea destruido
import { onUnmounted } from "vue";
onUnmounted(() => {
  window.removeEventListener("file-upload-progress", handleFileUploadProgress);
});
</script>

<style scoped>
.shadow-top {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1),
    0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

a {
  text-decoration: none;
}
</style>
