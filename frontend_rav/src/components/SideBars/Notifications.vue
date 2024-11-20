<template>
	<div class="overflow-auto w-56 md:w-60 lg:w-72">
		<!-- Sidebar Derecho -->
		<div>
			<div class="flex flex-col bg-white items-center">
				<!-- Sección de Actividad -->
				<div class="bg-amarillo w-full h-12 flex justify-around items-center">
					<h2
						class="text-base lg:text-lg text-left lg:text-center font-bold text-customPurple py-2">
						Actividad
					</h2>
					<svg
						width="25"
						height="26"
						viewBox="0 0 25 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<ellipse
							cx="12.4683"
							cy="12.7551"
							rx="12.4683"
							ry="12.7551"
							fill="#7A1F7E" />
						<path
							d="M12.4683 5.10205C11.9446 5.10205 11.5331 5.52297 11.5331 6.05868C11.5331 6.5944 11.9446 7.01532 12.4683 7.01532C12.9919 7.01532 13.4034 6.5944 13.4034 6.05868C13.4034 5.52297 12.9919 5.10205 12.4683 5.10205ZM7.79267 7.01532C7.269 7.01532 6.85755 7.43623 6.85755 7.97195C6.85755 8.50766 7.269 8.92858 7.79267 8.92858C8.31633 8.92858 8.72779 8.50766 8.72779 7.97195C8.72779 7.43623 8.31633 7.01532 7.79267 7.01532ZM17.1439 7.01532C16.6202 7.01532 16.2088 7.43623 16.2088 7.97195C16.2088 8.50766 16.6202 8.92858 17.1439 8.92858C17.6675 8.92858 18.079 8.50766 18.079 7.97195C18.079 7.43623 17.6675 7.01532 17.1439 7.01532ZM12.4683 8.92858C10.411 8.92858 8.72779 10.6505 8.72779 12.7551C8.72779 14.8597 10.411 16.5816 12.4683 16.5816C14.5255 16.5816 16.2088 14.8597 16.2088 12.7551C16.2088 10.6505 14.5255 8.92858 12.4683 8.92858ZM5.92243 11.7985C5.39876 11.7985 4.9873 12.2194 4.9873 12.7551C4.9873 13.2908 5.39876 13.7117 5.92243 13.7117C6.44609 13.7117 6.85755 13.2908 6.85755 12.7551C6.85755 12.2194 6.44609 11.7985 5.92243 11.7985ZM19.0141 11.7985C18.4904 11.7985 18.079 12.2194 18.079 12.7551C18.079 13.2908 18.4904 13.7117 19.0141 13.7117C19.5378 13.7117 19.9492 13.2908 19.9492 12.7551C19.9492 12.2194 19.5378 11.7985 19.0141 11.7985ZM7.79267 16.5816C7.269 16.5816 6.85755 17.0026 6.85755 17.5383C6.85755 18.074 7.269 18.4949 7.79267 18.4949C8.31633 18.4949 8.72779 18.074 8.72779 17.5383C8.72779 17.0026 8.31633 16.5816 7.79267 16.5816ZM17.1439 16.5816C16.6202 16.5816 16.2088 17.0026 16.2088 17.5383C16.2088 18.074 16.6202 18.4949 17.1439 18.4949C17.6675 18.4949 18.079 18.074 18.079 17.5383C18.079 17.0026 17.6675 16.5816 17.1439 16.5816ZM12.4683 18.4949C11.9446 18.4949 11.5331 18.9158 11.5331 19.4515C11.5331 19.9873 11.9446 20.4082 12.4683 20.4082C12.9919 20.4082 13.4034 19.9873 13.4034 19.4515C13.4034 18.9158 12.9919 18.4949 12.4683 18.4949Z"
							fill="#FDC300" />
					</svg>
				</div>
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
								class="text-customPurple transition-all duration-1000 ease-out" />
						</svg>
						<span
							class="absolute inset-0 flex items-center justify-center text-lg font-bold"
							>{{ goal.value }}</span
						>
					</div>
					<p class="text-center text-xs font-semibold">{{ goal.label }}</p>
				</div>

				<!-- Sección de Notificaciones -->
				<div class="w-full">
					<h2
						class="text-lg font-semibold bg-customPurple mb-2 p-2 flex items-center text-amarillo justify-between">
						Notificaciones
						<button
							v-if="extraNotifications > 0"
							@click="toggleNotifications"
							class="bg-amarillo text-customPurple w-6 h-6 cursor-copy rounded-full flex items-center justify-center text-xs">
							+{{ extraNotifications }}
						</button>
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
