// stores/goalStore.js
import { defineStore } from "pinia";

export const useGoalStore = defineStore("goalStore", {
    state: () => ({
        goals: [], // Lista de metas
    }),
    getters: {
        // Procesa las metas con progreso y segmentos calculados
        processedGoals: (state) => {
            return state.goals.map((goal) => {
                const progress = calculateProgress(goal.startDate, goal.endDate);
                const segments = calculateSegments(); // Siempre 5 segmentos
                return {
                    ...goal,
                    progress, // Porcentaje del progreso (0 a 100)
                    segments, // Segmentos (dividido en porcentajes iguales)
                };
            });
        },
    },
    actions: {
        fetchGoals() {
            const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
            this.goals = savedGoals;
        },
        addGoal(goal) {
            if (!goal.id) goal.id = Date.now(); // Generar un ID único
            this.goals.push(goal);
            this.saveGoalsToLocal();
        },
        saveGoalsToLocal() {
            localStorage.setItem("goals", JSON.stringify(this.goals));
        },
    },
});

// Función para calcular el progreso basado en las fechas de inicio y fin
function calculateProgress(startDate, endDate) {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    if (today < start) return 0; // Antes de la fecha de inicio
    if (today > end) return 100; // Después de la fecha de fin

    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
    const elapsedDays = (today - start) / (1000 * 60 * 60 * 24);

    return Math.round((elapsedDays / totalDays) * 100);
}

// Función para calcular siempre 5 segmentos divididos equitativamente
function calculateSegments() {
    return 5; // Cada segmento representa el 20%
}
