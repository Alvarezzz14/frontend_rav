<template>
	<div class="w-[300px] h-screen bg-customPurple flex flex-col shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">
		<!-- Sección de Actividad -->
		<div class="flex flex-row justify-center items-center px-[10px] py-[10px] gap-[40px] w-full h-[60px] bg-amarillo flex-shrink-0">
			<h2 class="font-['Work_Sans'] font-bold text-[24px] leading-[28px] text-center text-[#7A1F7E]">
				Actividad
			</h2>
			<router-link to="/IndicadoresActividad">
				<div class="flex flex-row items-center justify-center p-[10px] w-[40px] h-[40px] bg-[#7A1F7E] rounded-[30px]">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.45 1.78C13.41 2.03 13.39 2.28 13.39 2.53C13.39 4.78 15.21 6.5991 17.45 6.5991C17.7 6.5991 17.94 6.5701 18.19 6.5301V14.5991C18.19 17.9901 16.19 20.0001 12.79 20.0001H5.401C2 20.0001 0 17.9901 0 14.5991V7.2001C0 3.8001 2 1.78 5.401 1.78H13.45ZM13.651 7.86C13.38 7.83 13.111 7.95 12.95 8.17L10.531 11.3L7.76 9.12C7.59 8.99 7.39 8.9391 7.19 8.9601C6.991 8.9901 6.811 9.0991 6.69 9.2591L3.731 13.1101L3.67 13.2001C3.5 13.5191 3.58 13.9291 3.88 14.1501C4.02 14.2401 4.17 14.3001 4.34 14.3001C4.571 14.3101 4.79 14.1891 4.93 14.0001L7.44 10.7691L10.29 12.9101L10.38 12.9691C10.7 13.1391 11.1 13.0601 11.33 12.7591L14.22 9.0301L14.18 9.0501C14.34 8.8301 14.37 8.5501 14.26 8.3001C14.151 8.0501 13.91 7.8801 13.651 7.86ZM17.5901 0C18.9201 0 20.0001 1.0798 20.0001 2.4098C20.0001 3.7398 18.9201 4.8198 17.5901 4.8198C16.2601 4.8198 15.1801 3.7398 15.1801 2.4098C15.1801 1.0798 16.2601 0 17.5901 0Z" fill="#FDC300"/>
					</svg>
				</div>
			</router-link>
		</div>


		<!-- Gráficos Circulares de Metas -->
		<div class="flex-shrink-0 px-[10px] py-[10px]">
			<CircularChart />
		</div>

		<!-- Sección de Notificaciones -->
		<div class="flex flex-row justify-center items-center px-[10px] py-[10px] gap-[40px] w-full h-[60px] bg-white flex-shrink-0">
			<h2 class="font-['Work_Sans'] font-bold text-[24px] leading-[28px] text-center text-[#70267A]">
				Notificaciones
			</h2>
			<div class="flex flex-row items-center justify-center p-[10px] w-[40px] h-[40px] bg-customPurple rounded-[30px]">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 0C7.25 0 5 2.25 5 5C5 7.6 3.7 9.95 1.65 11.65C0.625 12.5 0 13.7 0 15H20C20 13.7 19.4 12.5 18.35 11.65C16.3 9.95 15 7.6 15 5C15 2.25 12.775 0 10 0ZM7.5 17.5C7.5 18.875 8.625 20 10 20C11.375 20 12.5 18.875 12.5 17.5H7.5Z" fill="#FDC300"/>
				</svg>
			</div>
		</div>

		<!-- Lista de Notificaciones con scroll -->
		<div class="flex-1 overflow-y-auto px-[10px] py-[10px]">
			<div v-for="(notification, index) in notifications" :key="index" class="mb-[10px]">
				<div class="bg-[rgba(0,0,0,0.2)] rounded-[10px] p-[16px] relative">
					<!-- Título y Fecha -->
					<div class="flex justify-between items-start mb-[12px]">
						<h3 class="font-['Work_Sans'] font-bold text-[14px] leading-[16px] text-white m-0">
							{{ notification.title }}
						</h3>
						<span class="font-['Work_Sans'] font-normal text-[14px] leading-[16px] text-white whitespace-nowrap ml-2">
							{{ notification.date }}
						</span>
					</div>
					
					<!-- Mensaje -->
					<p class="font-['Work_Sans'] font-normal text-[14px] leading-[16px] text-white m-0">
						{{ notification.message }}
					</p>
				</div>
			</div>
		</div>

		<!-- Divisor decorativo inferior -->
		<div class="flex-shrink-0 relative h-[53px] w-full">
			<div class="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.5)] to-transparent opacity-50"></div>
			<button class="absolute right-[20px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-[#7A1F7E] rounded-full flex items-center justify-center text-white text-[20px] leading-[20px] font-bold">
				+
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useGoalStore } from "@/stores/goalStore";
import CircularChart from "@/components/metas/CircularChart.vue";

// Acceso al store de metas
const goalStore = useGoalStore();

const goals = computed(() => goalStore.processedGoals);

// Notificaciones
const notifications = ref([
	{
		title: "Primera Notificación",
		date: "17/07/2024",
		message: "Contenido de la primera notificación...",
		progress: 75,
		redirectUrl: "http://localhost:5173/subirfichero",
		isRead: false,
	},
	{
		title: "Segunda Notificación",
		date: "17/07/2024",
		message: "Contenido de la segunda notificación...",
		redirectUrl: "http://localhost:5173/subirfichero",
		isRead: false,
	},
]);
const extraNotifications = computed(() => notifications.value.length - 1);
const toggleNotifications = () => {
	// Cambiar estado si las notificaciones adicionales deben ser visibles
};

const markAsRead = (index) => {
	notifications.value[index].isRead = true;
};

watch(
	() => goalStore.goals,
	(newGoals) => {
		console.log("Metas actualizadas:", newGoals);
	},
	{ deep: true } // Observar cambios profundos en las metas
);
onMounted(() => {
	goalStore.fetchGoals(); // Cargar metas del localStorage
});
</script>
