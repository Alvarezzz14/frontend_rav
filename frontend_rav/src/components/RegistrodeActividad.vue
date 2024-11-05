<template>
    <div class="bg-gray-100 flex items-center justify-between p-4 rounded-lg shadow-md">
        <!-- Sección Izquierda (Icono y Título) -->
        <div class="flex items-center">
            <div class="p-4 ">
                <img :src="Chart" alt="Chart"width="50" height="50"   />
                
            </div>
            <div class="ml-4">
                <p class="text-black mb-0 text-2xl">Registro de</p>
                <h2 class="text-customPurple text-5xl mt-0 font-bold">Actividad</h2>
            </div>
        </div>

        <!-- Sección Central (Información del ciudadano) -->
        <div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <!-- Ícono -->
            <div class="flex-shrink-0">
                <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24.0939 0.027541C11.1836 0.766707 4.40665 15.6399 12.4454 25.7735C19.4536 34.6085 33.3544 33.4898 38.9046 23.7258C45.1034 12.8181 36.6423 -0.691648 24.0939 0.027541ZM0.329441 59.9949H49.623C49.8945 59.7252 49.6682 59.2757 49.6582 58.9461C49.5777 56.334 49.7436 54.1815 49.2308 51.5594C47.6171 43.2838 41.554 36.2267 33.5856 33.3699C28.1661 35.967 21.8064 35.962 16.3819 33.3799C8.53917 36.1668 2.51133 43.059 0.802015 51.1699C0.36966 53.2126 0.304304 54.9206 0.294249 56.9883C0.294249 57.9372 0.238948 58.8962 0.243975 59.8401C0.243975 59.93 0.249003 59.94 0.329441 59.9999V59.9949Z"
                        fill="#7A1F7E" />
                    <path
                        d="M0.329118 59.9945C0.24868 59.9345 0.243652 59.9246 0.243652 59.8347C0.243652 58.8907 0.288899 57.9318 0.293926 56.9829C0.303981 54.9152 0.369337 53.2071 0.801692 51.1644C2.511 43.0536 8.53884 36.1663 16.3816 33.3745C21.8061 35.9566 28.1658 35.9616 33.5853 33.3645C41.5537 36.2263 47.6167 43.2783 49.2305 51.554C49.7433 54.176 49.5774 56.3286 49.6579 58.9407C49.6679 59.2753 49.8941 59.7198 49.6227 59.9895H0.329118V59.9945Z"
                        fill="#7A1F7E" />
                    <path
                        d="M24.094 0.027541C36.6423 -0.691648 45.0984 12.8181 38.9046 23.7258C33.3544 33.4898 19.4537 34.6086 12.4454 25.7735C4.40665 15.6399 11.1836 0.766707 24.0939 0.027541Z"
                        fill="#7A1F7E" />
                </svg>
            </div>

            <!-- Información del ciudadano -->
            <div class="flex flex-col space-y-1">
                <p class="text-gray-800 font-semibold"><span class="font-bold">Ciudadano:</span> John Doe</p>
                <p class="text-gray-800 font-semibold"><span class="font-bold">Cédula:</span> 123456789</p>
            </div>
        </div>



        <!-- Sección Derecha (Botón Cargar Archivo) -->
        <button class="bg-customPurple text-white p-4 rounded-lg shadow flex flex-col items-center">
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M27.5 0C20.24 0 13.88 5.16 12.5 12C5.9 12 0.5 17.4 0.5 24C0.5 26.22 1.16 28.26 2.18 30H15.5L27.5 18L39.5 30H47.96C48.32 29.04 48.5 28.08 48.5 27C48.5 23.1 45.98 19.26 42.5 18V15C42.5 6.72 35.78 0 27.5 0ZM27.5 27L12.5 42H24.5V45C24.5 45.7957 24.8161 46.5587 25.3787 47.1213C25.9413 47.6839 26.7044 48 27.5 48C28.2956 48 29.0587 47.6839 29.6213 47.1213C30.1839 46.5587 30.5 45.7957 30.5 45V42H42.5L27.5 27Z"
                    fill="white" />
            </svg>

            <span class="mt-2">Crear Ticket</span>
        </button>


    </div>

    <!-- Contenedor de Lista -->
    <div class="mt-4 bg-white rounded-lg shadow p-4">
        <ul class="list-decimal pl-5 ">
            <li class="flex items-center pb-2">
                <span
                    class="bg-customPurple  text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                Ingrese un nombre en la casilla de <span class="font-bold pl-1">Título.</span>
            </li>
            <li class="flex items-center pb-2">
                <span
                    class="bg-customPurple text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                Registre la actividad o información otorgada al ciudadano en la Sección de <span
                    class="font-bold pl-1">Descripción.</span>
            </li>
            <li class="flex items-center pb-2">
                <span
                    class="bg-customPurple text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                Una vez completa la información , presiona <span class="font-bold pl-1">Enviar.</span>
            </li>
            <!-- Agregar más actividades aquí -->
        </ul>
    </div>
    <div class="mt-4 bg-white rounded-lg h-3/6 shadow p-4">
        <input type="text" class="w-full bg-gray-100 h-10 border-none text-black placeholder-gray-700 rounded-sm p-2 mb-2"
            placeholder="Título:" />
        <textarea name="Descripcion"
            class="w-full bg-gray-100 h-32 border-none text-black placeholder-gray-700 rounded-sm p-2 mb-3"
            id="descripcion" placeholder="Descripción:"></textarea>
         <button
            class="bg-amarillo border-none w-full text-customPurple mb-2 h-9 font-bold p-2 rounded-sm shadow flex justify-center items-center">
            Cargar Archivo
        </button>

        <button
            class="bg-customPurple border-none h-19 w-full text-amarillo font-bold p-2 rounded-sm shadow flex justify-center items-center">
            Enviar
        </button>
        <a href="#" class="text-blue-500 text-xs no-underline mt-2 hover:underline flex justify-center items-center focus:outline-none">¿Necesitas Ayuda?</a>


    </div>

</template>
<script setup>
import Chart from "@/assets/images/Chart.svg"

</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
