<template>
	<div class="w-[240px] h-[240px] bg-azul2Ape rounded-[20px] flex flex-col items-center justify-center relative p-2">
		<!-- Contenedor del círculo de progreso -->
		<div class="relative w-[118px] h-[118px] flex-shrink-0 mb-[20px]">
			<svg
				class="w-full h-full"
				viewBox="0 0 138 138"
				xmlns="http://www.w3.org/2000/svg">
				<!-- Círculo de borde blanco -->
					<circle
						cx="66"
						cy="66"
						r="52"
						fill="none"
						stroke="#FFFFFF"
						stroke-width="10" />

				<!-- Progreso dinámico amarillo -->
						<circle
							cx="62"
							cy="66"
							r="52"
							fill="none"
							stroke="#FDC300"
							stroke-width="11"
							stroke-linecap="round"
							:stroke-dasharray="calculateStrokeDasharray(animatedProgress, 52)"
							stroke-dashoffset="0"
							transform="rotate(-90 64 64)"
							style="transition: stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1);"
						/>

				<!-- Círculo pequeño inicial amarillo -->
					<circle
						cx="64"
						cy="14"
						r="7.375"
						fill="#FDC300" />

				<!-- Círculo grande final dinámico amarillo -->
						<circle
							:cx="getProgressPositionX(animatedProgress, 64, 52)"
							:cy="getProgressPositionY(animatedProgress, 64, 52)"
							r="9.98"
							fill="#FDC300"
							style="transition: cx 1.2s cubic-bezier(0.4,0,0.2,1), cy 1.2s cubic-bezier(0.4,0,0.2,1);"
						/>
			</svg>

			<!-- Porcentaje en el centro -->
					<div class="absolute inset-0 flex items-center justify-center">
						<span class="font-['Work_Sans'] font-bold text-[24px] leading-[28px] text-center text-white">
							{{ Math.round(animatedProgress) }}%
						</span>
					</div>
		</div>

		<!-- Información de la meta -->
		<div class="flex flex-col w-full px-[19.69px] gap-[7px]">
			<!-- Meta Anual -->
			<div class="flex flex-row items-center gap-[7px]">
				<div class="w-[16px] h-[16px] bg-white rounded-[30px] flex items-center justify-center flex-shrink-0">
								<svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M3.5 0L0 4H7L3.5 0Z" fill="#005DCA"/>
					</svg>
				</div>
				<span class="font-['Work_Sans'] font-normal text-[12px] leading-[14px] text-white">
					Meta Anual
				</span>
				<span class="font-['Work_Sans'] font-bold text-[14px] leading-[16px] text-white ml-auto">
					{{ goal.limit || 0 }}
				</span>
			</div>

			<!-- Estado Actual -->
			<div class="flex flex-row items-center gap-[7px]">
				<div class="w-[16px] h-[16px] bg-white rounded-[30px] flex items-center justify-center flex-shrink-0">
								<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M3.657 2.046C3.478 2.226 3.478 2.521 3.657 2.701L4.597 3.641L2 3.641C1.723 3.641 1.5 3.864 1.5 4.141C1.5 4.418 1.723 4.641 2 4.641L4.597 4.641L3.657 5.581C3.478 5.761 3.478 6.056 3.657 6.236C3.837 6.416 4.132 6.416 4.312 6.236L6.315 4.233C6.495 4.053 6.495 3.758 6.315 3.578L4.312 1.575C4.132 1.395 3.837 1.395 3.657 1.575Z" fill="#005DCA"/>
									<circle cx="4" cy="4" r="3.5" stroke="#005DCA"/>
					</svg>
				</div>
				<span class="font-['Work_Sans'] font-normal text-[12px] leading-[14px] text-white">
					Estado actual
				</span>
				<span class="font-['Work_Sans'] font-bold text-[14px] leading-[16px] text-white ml-auto">
					{{ goal.current || 0 }}
				</span>
			</div>

			<!-- Fecha Límite -->
			<div class="flex flex-row items-center gap-[7px]">
				<div class="w-[16px] h-[16px] bg-white rounded-[30px] flex items-center justify-center flex-shrink-0">
								<svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 4L3.5 8L7 4H0Z" fill="#005DCA"/>
					</svg>
				</div>
				<span class="font-['Work_Sans'] font-normal text-[12px] leading-[14px] text-white">
					Fecha límite
				</span>
				<span class="font-['Work_Sans'] font-bold text-[14px] leading-[16px] text-white ml-auto">
					{{ formatDate(goal.deadline) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useGoalStore } from "@/stores/goalStore";

// Prop para recibir una meta individual
const props = defineProps({
	goal: {
		type: Object,
		required: true
	}
});

const goalStore = useGoalStore();

// Animación de progreso
const animatedProgress = ref(0);
let animationFrame;

const animateProgress = (target, duration = 1200) => {
	const start = 0;
	const end = target;
	const startTime = performance.now();

	const animate = (now) => {
		const elapsed = now - startTime;
		const progress = Math.min(elapsed / duration, 1);
		animatedProgress.value = start + (end - start) * progress;
		if (progress < 1) {
			animationFrame = requestAnimationFrame(animate);
		} else {
			animatedProgress.value = end;
		}
	};
	cancelAnimationFrame(animationFrame);
	animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
	goalStore.fetchGoals();
	animateProgress(props.goal.progress || 0);
});

watch(() => props.goal.progress, (newVal) => {
	animateProgress(newVal || 0);
});

// Cálculo de stroke-dasharray dinámico
const calculateStrokeDasharray = (value, r = 52) => {
	const circumference = 2 * Math.PI * r;
	return `${(circumference * value) / 100} ${circumference}`;
};

// Función para calcular la posición X del círculo final
const getProgressPositionX = (value, centerX, radius) => {
	const angle = (value / 100) * 360 - 90;
	return centerX + radius * Math.cos((angle * Math.PI) / 180);
};

// Función para calcular la posición Y del círculo final
const getProgressPositionY = (value, centerY, radius) => {
	const angle = (value / 100) * 360 - 90;
	return centerY + radius * Math.sin((angle * Math.PI) / 180);
};

// Función para formatear fecha
const formatDate = (dateString) => {
	if (!dateString) return "00/00/0000";
  
	// Si ya está en formato DD/MM/YYYY, retornar tal cual
	if (dateString.includes('/')) return dateString;
  
	// Si es un objeto Date o string ISO
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "00/00/0000";
  
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
  
	return `${day}/${month}/${year}`;
};
</script>

<style scoped></style>
