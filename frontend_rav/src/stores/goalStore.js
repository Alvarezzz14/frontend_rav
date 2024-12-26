import { defineStore } from "pinia";

export const useGoalStore = defineStore("goalStore", {
    state: () => ({
        goals: [], // Lista de metas
    }),

    getters: {
        // Procesar metas con el progreso calculado
        processedGoals: (state) => {
            return state.goals.map((goal) => {
                const progress = calculateProgress(goal.startDate, goal.endDate, goal.limit);
                return {
                    ...goal,
                    progress, // Porcentaje del progreso (0 a 100)
                    current: Math.round((progress / 100) * goal.limit), // Estado actual basado en el progreso
                };
            });
        },
    },

    actions: {
        // Obtener metas desde localStorage
        fetchGoals() {
            const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
            this.goals = savedGoals;
        },

        // Agregar una nueva meta
        addGoal(goal) {
            if (!goal.id) goal.id = Date.now(); // Generar un ID único
            this.goals.push(goal);
            this.saveGoalsToLocal();
        },

        // Guardar metas en localStorage
        saveGoalsToLocal() {
            localStorage.setItem("goals", JSON.stringify(this.goals));
        },
    },
});

// Función para calcular el progreso basado en las fechas de inicio y fin
function calculateProgress(startDate, endDate, limit) {
    if (!startDate || !endDate || !limit) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    if (today < start) return 0; // Antes de la fecha de inicio
    if (today > end) return 100; // Después de la fecha de fin

    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
    const elapsedDays = (today - start) / (1000 * 60 * 60 * 24);

    return Math.min(100, Math.round((elapsedDays / totalDays) * 100));
}
