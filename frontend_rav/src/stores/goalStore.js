import { defineStore } from "pinia";

export const useGoalStore = defineStore("goalStore", {
    state: () => ({
        goals: [], // Lista de metas
    }),

    getters: {
        processedGoals: (state) => {
            return state.goals.map((goal) => {
                const current = goal.current || 0; // Tickets actuales (simulados o reales)
                const limit = goal.limit || 1; // Evita dividir por cero
                const progress = Math.min(100, Math.round((current / limit) * 100)); // Asegura un máximo de 100%
                return {
                    ...goal,
                    progress, // Porcentaje calculado
                    current,  // Tickets actuales
                };
            });
        },
    },

    actions: {
        // Obtener metas desde localStorage
        fetchGoals() {
            const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
            const uniqueGoals = Array.from(new Map(savedGoals.map(goal => [goal.id, goal])).values());
            this.goals = uniqueGoals; // Elimina duplicados basados en el ID
        },

        addGoal(goal) {
            if (!goal.id) goal.id = Date.now(); // Genera un ID único si no existe
            const exists = this.goals.some((g) => g.id === goal.id);
            if (!exists) {
                this.goals.push(goal);
                this.saveGoalsToLocal();
            }
        },

        // Guardar metas en localStorage
        saveGoalsToLocal() {
            localStorage.setItem("goals", JSON.stringify(this.goals));
        },
        /* // Actualizar el número de tickets para cada meta desde el backend
        async updateCurrentFromBackend() {
            for (const goal of this.goals) {
                try {
                    const response = await fetch(`/api/tickets/count?startDate=${goal.startDate}&endDate=${goal.endDate}`);
                    const data = await response.json();
                    goal.current = data.count; // Actualiza el campo current con el total de tickets
                } catch (error) {
                    console.error(`Error al obtener los datos para la meta ${goal.name}:`, error);
                }
            }
            this.saveGoalsToLocal(); // Actualizar localStorage con los valores actuales
        }, */
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
