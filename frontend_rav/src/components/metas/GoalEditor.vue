<template>
	<div class="goal-editor bg-gray-50 p-4 rounded-lg shadow">
		<h3 class="text-xl font-semibold text-black mb-4">Configurar Nueva Meta</h3>
		<form @submit.prevent="saveGoal">
			<!-- Nombre de la Meta -->
			<div class="mb-4">
				<label for="name" class="block text-sm font-medium text-gray-700 mb-1">
					Nombre
				</label>
				<select
					v-model="goal.name"
					id="name"
					class="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customPurple">
					<option value="" disabled>Seleccione un tipo de meta</option>
					<option value="Mensual">Mensual</option>
					<option value="Trimestral">Trimestral</option>
					<option value="Semestral">Semestral</option>
					<option value="Anual">Anual</option>
				</select>
			</div>

			<!-- Límite de la Meta -->
			<div class="mb-4">
				<label for="limit" class="block text-sm font-medium text-gray-700 mb-1">
					Límite
				</label>
				<input
					type="number"
					id="limit"
					v-model.number="goal.limit"
					min="1"
					class="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customPurple"
					placeholder="Ingresa el límite de la meta" />
			</div>

			<!-- Fechas de Inicio y Fin -->
			<div class="grid grid-cols-2 gap-4 mb-4">
				<div>
					<label
						for="startDate"
						class="block text-sm font-medium text-gray-700 mb-1">
						Fecha Inicio
					</label>
					<input
						type="date"
						id="startDate"
						v-model="goal.startDate"
						class="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customPurple" />
				</div>
				<div>
					<label
						for="endDate"
						class="block text-sm font-medium text-gray-700 mb-1">
						Fecha Fin
					</label>
					<input
						type="date"
						id="endDate"
						v-model="goal.endDate"
						class="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customPurple" />
				</div>
			</div>

			<!-- Botón Guardar -->
			<button
				type="submit"
				class="w-full bg-customPurple text-white font-bold py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
				Guardar Meta
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useGoalStore } from "@/stores/goalStore";

const goalStore = useGoalStore();

// Meta reactiva para el formulario
const goal = ref({
	name: "", // Nombre de la meta (Mensual, Trimestral, etc.)
	limit: null, // Límite de la meta
	startDate: "", // Fecha de inicio
	endDate: "", // Fecha de fin
	current: 0, // Estado actual, siempre comienza en 0
});

// Validación de datos antes de guardar
const validateGoal = () => {
	if (!goal.value.name) {
		alert("Debe seleccionar un nombre para la meta.");
		return false;
	}
	if (!goal.value.limit || goal.value.limit <= 0) {
		alert("El límite de la meta debe ser mayor a 0.");
		return false;
	}
	if (!goal.value.startDate || !goal.value.endDate) {
		alert("Debe seleccionar un rango de fechas.");
		return false;
	}
	if (new Date(goal.value.startDate) > new Date(goal.value.endDate)) {
		alert("La fecha de inicio no puede ser mayor que la fecha de fin.");
		return false;
	}
	return true;
};

// Guardar meta
const saveGoal = () => {
	if (!validateGoal()) return;

	// Guardar la meta en el store
	goalStore.addGoal({ ...goal.value });

	// Limpia el formulario
	goal.value = {
		name: "",
		limit: null,
		startDate: "",
		endDate: "",
		current: 0,
	};

	alert("Meta guardada exitosamente.");
};
</script>

<style scoped>
/* Agrega aquí los estilos necesarios */
</style>
