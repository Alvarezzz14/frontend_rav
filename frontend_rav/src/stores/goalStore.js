import { defineStore } from "pinia";

export const useGoalStore = defineStore("goalStore", {
    state: () => ({
        goals: [], // Lista de metas
    }),

    getters: {
        processedGoals: (state) => {
            return state.goals.map((goal) => {
                const current = goal.current || 100; // Tickets actuales (simulados o reales)
                const limit = goal.limit || 1; // Evita división por cero
                const progress = Math.min(100, Math.round((current / limit) * 100)); // Progreso calculado
                console.log(`Meta: ${goal.name}, Current: ${current}, Limit: ${limit}, Progress: ${progress}`);
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

            // Fallback: si no hay metas en localStorage, cargar 5 actividades "quemadas"
            if (!Array.isArray(savedGoals) || savedGoals.length === 0) {
                const defaultGoals = [
                    {
                        id: 1,
                        name: "Atenciones del mes",
                        limit: 1200,
                        current: 350,
                        deadline: "31/12/2025",
                        startDate: "2025-01-01",
                        endDate: "2025-12-31",
                    },
                    {
                        id: 2,
                        name: "Casos resueltos",
                        limit: 800,
                        current: 420,
                        deadline: "31/12/2025",
                        startDate: "2025-01-01",
                        endDate: "2025-12-31",
                    },
                    {
                        id: 3,
                        name: "Nuevos registros",
                        limit: 500,
                        current: 260,
                        deadline: "31/12/2025",
                        startDate: "2025-01-01",
                        endDate: "2025-12-31",
                    },
                    {
                        id: 4,
                        name: "Seguimientos",
                        limit: 900,
                        current: 300,
                        deadline: "31/12/2025",
                        startDate: "2025-01-01",
                        endDate: "2025-12-31",
                    },
                    {
                        id: 5,
                        name: "Remisiones",
                        limit: 400,
                        current: 150,
                        deadline: "31/12/2025",
                        startDate: "2025-01-01",
                        endDate: "2025-12-31",
                    },
                ];

                this.goals = defaultGoals.map((goal) => ({
                    ...goal,
                    animatedValue: 0, // Arranca la animación desde 0
                }));
                return; // No persistimos en localStorage; son solo de visualización inicial
            }

            const uniqueGoals = Array.from(
                new Map(savedGoals.map((goal) => [goal.id, goal])).values()
            );
            this.goals = uniqueGoals.map((goal) => ({
                ...goal,
                animatedValue: goal.animatedValue || goal.progress || 0, // Inicializa `animatedValue`
            }));

        },

        addGoal(goal) {
            if (!goal.id) goal.id = Date.now(); // Generar ID único si no existe
            const exists = this.goals.some((g) => g.id === goal.id);
            if (!exists) {
                this.goals.push({ ...goal, animatedValue: goal.progress || 0 });
                this.saveGoalsToLocal();
            }
        },

        saveGoalsToLocal() {
            const goalsToSave = this.goals.map((goal) => ({
                ...goal,
                animatedValue: goal.animatedValue || 0,
            }));
            localStorage.setItem("goals", JSON.stringify(goalsToSave));
        },

        async fetchRealDataForGoals() {
            for (const goal of this.goals) {
                try {
                    const response = await fetch(
                        `/api/tickets/count?startDate=${goal.startDate}&endDate=${goal.endDate}`
                    );
                    if (!response.ok) continue;

                    const data = await response.json();
                    goal.current = data.count || 0; // Actualiza los tickets reales
                } catch (error) {
                    console.error(`Error al obtener los datos para ${goal.name}:`, error);
                }
            }
            this.saveGoalsToLocal();
        },
        resetAnimatedValues() {
            this.goals = this.goals.map((goal) => ({
                ...goal,
                animatedValue: 0, // Reinicia el valor de la animación
            }));
            this.saveGoalsToLocal(); // Guarda los cambios en localStorage
        }
    },
});
