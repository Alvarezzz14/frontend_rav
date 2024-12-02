<template>
	<div class="overflow-auto w-56 md:w-60 lg:w-72">
		<!-- Sidebar Derecho -->
		<div>
			<div class="flex flex-col bg-white items-center">
				<!-- Sección de Actividad -->
				<div
					class="bg-amarillo w-full h-14 md:h-16 flex justify-between px-4 items-center shadow-custom lg:shadow-none">
					<h2
						class="text-lg md:text-xl lg:text-2xl lg:text-center font-bold text-customPurple py-2">
						Actividad
					</h2>
					<div class="md:w-10">
						<router-link to="/IndicadoresActividad">
						<span>
						<svg
							width="38"
							height="37"
							viewBox="0 0 41 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<rect
								x="0.5"
								y="-0.000244141"
								width="40.0001"
								height="40.0003"
								rx="20"
								fill="#7A1F7E" />
							<path	
								d="M23.95 11.7801C23.91 12.0301 23.89 12.2801 23.89 12.5301C23.89 14.7801 25.71 16.5991 27.95 16.5991C28.2 16.5991 28.44 16.5701 28.69 16.5301V24.5991C28.69 27.9901 26.69 30.0001 23.29 30.0001H15.901C12.5 30.0001 10.5 27.9901 10.5 24.5991V17.2001C10.5 13.8001 12.5 11.7801 15.901 11.7801H23.95ZM24.151 17.8601C23.88 17.8301 23.611 17.9501 23.45 18.1701L21.031 21.3001L18.26 19.1201C18.09 18.9901 17.89 18.9391 17.69 18.9601C17.491 18.9901 17.311 19.0991 17.19 19.2591L14.231 23.1101L14.17 23.2001C14 23.5191 14.08 23.9291 14.38 24.1501C14.52 24.2401 14.67 24.3001 14.84 24.3001C15.071 24.3101 15.29 24.1891 15.43 24.0001L17.94 20.7691L20.79 22.9101L20.88 22.9691C21.2 23.1391 21.6 23.0601 21.83 22.7591L24.72 19.0301L24.68 19.0501C24.84 18.8301 24.87 18.5501 24.76 18.3001C24.651 18.0501 24.41 17.8801 24.151 17.8601ZM28.0901 9.99976C29.4201 9.99976 30.5001 11.0798 30.5001 12.4098C30.5001 13.7398 29.4201 14.8198 28.0901 14.8198C26.7601 14.8198 25.6801 13.7398 25.6801 12.4098C25.6801 11.0798 26.7601 9.99976 28.0901 9.99976Z"
								fill="#FDC300" />
						</svg>
						</span>
						</router-link>
					</div>
				</div>
				<div class="flex flex-col bg-white items-center gap-4"> <!-- Agrega un gap para separación -->
				<div v-for="(goal, index) in goals" :key="index" class="indicator-wrapper flex items-center gap-10 rounded-lg overflow-hidden" :style="getGradientStyle(index)">
					<!-- Indicador Circular -->
					<div class="relative w-30 h-20 md:w-40 md:h-24">
					<svg class="w-full h-full" viewBox="0 0 100 100">
						<circle
						cx="50"
						cy="50"
						r="40"
						stroke="lightgray"
						stroke-width="6"
						fill="none" />
						<circle
						cx="50"
						cy="50"
						r="40"
						stroke="currentColor"
						:stroke-dasharray="circumference"
						:stroke-dashoffset="circumference - (circumference * goal.value) / 100"
						stroke-width="6"
						fill="none"
						class="text-customPurple transition-all duration-1000 ease-out" />
					</svg>
					<span class="absolute inset-0 flex items-center justify-center text-lg font-bold w-full h-full text-center">
						{{ goal.value }}%
					</span>
					</div>

					<!-- Texto a la derecha del indicador -->
					<div class="flex flex-col justify-center items-start">
					<div :class="index === 2 ? 'text-white' : 'text-black'" class="text-sm font-semibold">
						{{ goal.label }}
					</div>
					<div :class="index === 2 ? 'text-white text-2xl font-bold' : 'text-black text-xl font-bold'">
						{{ goal.meta || 0 }}
					</div>
					<div :class="index === 2 ? 'text-white' : 'text-black'" class="mt-1 text-sm font-semibold">
						Estado Actual
					</div>
					<div :class="index === 2 ? 'text-white text-2xl font-bold' : 'text-black text-xl font-bold'">
						{{ goal.current || 0 }}
					</div>
					</div>
				</div>
				</div>
				
				<!-- Sección de Notificaciones -->
				<div class="w-full">
					<h2
						class="shadow-custom lg:shadow-none h-14 md:h-16 text-lg md:text-xl lg:text-2xl font-semibold bg-customPurple mb-2 p-2 flex items-center text-amarillo justify-between">
						Notificaciones
						<button
							v-if="extraNotifications > 0"
							@click="toggleNotifications"
							class="bg-amarillo text-customPurple w-6 h-6 cursor-copy rounded-full flex items-center justify-center text-xs">
							+{{ extraNotifications }}
						</button>				
						<svg
						width="41"
						height="40"
						viewBox="0 0 41 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="0.5" width="40" height="40" rx="20" fill="#FDC300" />
						<path
							d="M20.5 10C17.75 10 15.5 12.25 15.5 15C15.5 17.6 14.2 19.95 12.15 21.65C11.125 22.5 10.5 23.7 10.5 25H30.5C30.5 23.7 29.9 22.5 28.85 21.65C26.8 19.95 25.5 17.6 25.5 15C25.5 12.25 23.275 10 20.5 10ZM18 27.5C18 28.875 19.125 30 20.5 30C21.875 30 23 28.875 23 27.5H18Z"
							fill="#7A1F7E" />
						</svg>						
					</h2>

					<!-- Mostrar solo la primera notificación -->
					<div
						v-if="notifications.length > 0"
						class="bg-gray-50 p-3 rounded-lg mx-4 mb-2">
						<h3 class="font-semibold">{{ notifications[0].title }}</h3>
						<span class="text-xs text-gray-500">{{
							notifications[0].date
						}}</span>
						<p class="text-sm mt-1">
							{{ notifications[0].message }}
							<!-- Mostrar el progreso de carga -->
							<span v-if="notifications[0].progress !== undefined">
								<progress
									:value="notifications[0].progress"
									max="100"></progress>
								<p>{{ notifications[0].progress }}%</p>
							</span>
							<!-- Mostrar la URL de redirección si está definida -->
							<span v-if="notifications[0].redirectUrl">
								<a
									:href="notifications[0].redirectUrl"
									class="text-blue-500 underline">
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
							class="bg-gray-50 p-3 rounded-lg mb-2 mx-4">
							<h3 class="font-semibold">{{ notification.title }}</h3>
							<span class="text-xs text-gray-500">{{ notification.date }}</span>
							<p class="text-sm mt-1">
								{{ notification.message }}
								<!-- Mostrar el progreso de carga -->
								<span v-if="notification.progress !== undefined">
									<progress :value="notification.progress" max="100"></progress>
									<p>{{ notification.progress }}%</p>
								</span>
								<!-- Mostrar la URL de redirección si está definida -->
								<span v-if="notification.redirectUrl">
									<a
										:href="notification.redirectUrl"
										class="text-blue-500 underline">
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

const getGradientStyle = (index) => {
  switch (index) {
    case 0:
      return { background: 'linear-gradient(to right, rgba(242, 243, 243, 1), rgba(217, 217, 217, 1))' };
    case 1:
      return { background: 'linear-gradient(to right, rgba(253, 195, 0, 0.4), rgba(253, 195, 0, 1))' };
    case 2:
      return { background: 'linear-gradient(to right, rgba(207, 95, 221, 1), rgba(113, 39, 122, 1))' };
    default:
      return {};
  }
};

const goals = ref([
  { label: "Meta Anual", value: 0, meta: 1000000, current: 1200 },
  { label: "Meta Trimestral", value: 0, meta: 3000000, current: 50 },
  { label: "Meta Diaria", value: 0, meta: 30000, current: 600 }     
]);


const circumference = 2 * Math.PI * 40;
// Simular valores de las metas (puedes eliminar esta parte si no es necesario)
onMounted(() => {
	setTimeout(() => {
	    goals.value[0].value = 80; 
		goals.value[1].value = 50; 
		goals.value[2].value = 60; 
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
</script>
<style scoped></style>
