// store.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import logoApe from '@/assets/images/logoape.svg';
import logoSenaVerde from '@/assets/images/logosenaverde.svg';

export const useEventStore = defineStore('eventStore', () => {
    // Datos quemados de personas y eventos
    const events = ref([
        {
            date: "13-jul-2024",
            profile: "John Doe",
            profileImage: logoApe,
            cedula: "12345678",
            title: "Evento 1: Revisión médica",
            description: "Descripción del evento: Revisión médica para John Doe",
        },
        {
            date: "13-jul-2024",
            profile: "John Doe",
            profileImage: logoSenaVerde,
            cedula: "12345678",
            title: "Evento 2: Consulta jurídica",
            description: "Descripción del evento: Consulta jurídica para John Doe",
        },
        {
            date: "13-jul-2024",
            profile: "John Doe",
            profileImage: logoSenaVerde,
            cedula: "12345678",
            title: "Evento 3: Seguimiento social",
            description: "Descripción del evento: Seguimiento social para John Doe",
        },
        {
            date: "13-jul-2024",
            profile: "Jane Smith",
            profileImage: logoSenaVerde,
            cedula: "87654321",
            title: "Evento 4: Entrevista psicológica",
            description:
                "Descripción del evento: Entrevista psicológica para Jane Smith",
        },
        {
            date: "13-jul-2024",
            profile: "Jane Smith",
            profileImage: logoSenaVerde,
            cedula: "87654321",
            title: "Evento 5: Entrega de documentos",
            description:
                "Descripción del evento: Entrega de documentos para Jane Smith",
        },
        {
            date: "14-jul-2024",
            profile: "Robert Johnson",
            profileImage: logoSenaVerde,
            cedula: "11223344",
            title: "Evento 6: Citación a audiencia",
            description:
                "Descripción del evento: Citación a audiencia para Robert Johnson",
        },
        {
            date: "14-jul-2024",
            profile: "Robert Johnson",
            profileImage: logoSenaVerde,
            cedula: "11223344",
            title: "Evento 7: Notificación de medidas",
            description:
                "Descripción del evento: Notificación de medidas para Robert Johnson",
        },
        {
            date: "15-jul-2024",
            profile: "Laura Romero",
            profileImage: logoSenaVerde,
            cedula: "55667788",
            title: "Evento 8: Informe final de caso",
            description:
                "Descripción del evento: Informe final de caso para Laura Romero",
        },
        {
            date: "15-jul-2024",
            profile: "Laura Romero",
            profileImage: logoSenaVerde,
            cedula: "55667788",
            title: "Evento 9: Seguimiento social",
            description: "Descripción del evento: Seguimiento social para Laura Romero",
        },
        {
            date: "16-jul-2024",
            profile: "John Doe",
            profileImage: logoApe,
            cedula: "12345678",
            title: "Evento 10: Entrega de documentos",
            description: "Descripción del evento: Entrega de documentos para John Doe",
        },
        {
            date: "17-jul-2024",
            profile: "Jane Smith",
            profileImage: logoSenaVerde,
            cedula: "87654321",
            title: "Evento 11: Revisión médica",
            description: "Descripción del evento: Revisión médica para Jane Smith",
        },
        {
            date: "18-jul-2024",
            profile: "Robert Johnson",
            profileImage: logoSenaVerde,
            cedula: "11223344",
            title: "Evento 12: Consulta jurídica",
            description:
                "Descripción del evento: Consulta jurídica para Robert Johnson",
        },
        {
            date: "19-jul-2024",
            profile: "Laura Romero",
            profileImage: logoSenaVerde,
            cedula: "55667788",
            title: "Evento 13: Entrevista psicológica",
            description:
                "Descripción del evento: Entrevista psicológica para Laura Romero",
        },
        {
            date: "20-jul-2024",
            profile: "John Doe",
            profileImage: logoSenaVerde,
            cedula: "12345678",
            title: "Evento 14: Informe final de caso",
            description: "Descripción del evento: Informe final de caso para John Doe",
        },
        {
            date: "21-jul-2024",
            profile: "Jane Smith",
            profileImage: logoSenaVerde,
            cedula: "87654321",
            title: "Evento 15: Citación a audiencia",
            description: "Descripción del evento: Citación a audiencia para Jane Smith",
        },
    ]);

    // Acción para buscar eventos por cédula
    function searchByCedula(cedula) {
        return events.value.filter(event => event.cedula === cedula);
    }

    // Getter para obtener eventos ordenados por fecha para una persona específica
    const sortedEventsByCedula = (cedula) => computed(() =>
        events.value
            .filter(event => event.cedula === cedula)
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    );

    return { events, searchByCedula, sortedEventsByCedula };
});
