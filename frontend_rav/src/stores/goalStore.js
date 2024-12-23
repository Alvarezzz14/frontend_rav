// stores/goalStore.js
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
                const progress = Math.min(100, Math.round((current / limit) * 100)); // Progreso calculado
                return {
                    ...goal,
                    progress,
                    current,
                };
            });
        },
    },

    actions: {
        fetchGoals() {
            const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
            // Evitar duplicados basados en el ID
            const uniqueGoals = Array.from(
                new Map(savedGoals.map((goal) => [goal.id, goal])).values()
            );
            this.goals = uniqueGoals;
        },

        addGoal(goal) {
            if (!goal.id) goal.id = Date.now(); // ID único
            const exists = this.goals.some((g) => g.id === goal.id);
            if (!exists) {
                this.goals.push(goal);
                this.saveGoalsToLocal();
            }
        },

        saveGoalsToLocal() {
            localStorage.setItem("goals", JSON.stringify(this.goals));
        },
    },
});
