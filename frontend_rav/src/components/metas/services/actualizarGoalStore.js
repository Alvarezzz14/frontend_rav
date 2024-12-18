// services/actualizarGoalStore.js
import { useGoalStore } from "@/stores/goalStore";

/**
 * Función para actualizar metas y sus progresos.
 * Carga metas desde el backend y actualiza el progreso basado en el total de tickets en el rango de fechas.
 */
export async function actualizarGoalStore() {
    const goalStore = useGoalStore(); // Accede al store de metas

    try {
        // Cargar metas desde el backend
        await goalStore.fetchGoals();

        // Actualizar el progreso para cada meta
        const updatePromises = goalStore.goals.map((goal) =>
            goalStore.fetchTicketCountForGoal(goal.id)
        );

        // Esperar que todas las actualizaciones terminen
        await Promise.all(updatePromises);

        console.log("Metas y progresos actualizados exitosamente");
    } catch (error) {
        console.error("Error al actualizar metas:", error);
    }
}
