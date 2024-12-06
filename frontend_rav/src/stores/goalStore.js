// stores/goalStore.js
import { defineStore } from "pinia";

export const useGoalStore = defineStore("goalStore", {
    state: () => ({
        goals: [], // Lista de metas
    }),
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
