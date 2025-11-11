<template>
  <div 
    class="sidebar-container bg-azul-gradian h-[833px] overflow-hidden flex flex-col transition-all duration-700 ease-in-out rounded-[29.3592px] relative"
    :class="isExpanded ? 'w-[266px]' : 'w-[100px]'"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <!-- Decorative degradedMenu image (cuando está expandido) -->
    <div
      v-if="isExpanded"
      class="absolute inset-0 pointer-events-none transition-opacity duration-700"
      style="
        mix-blend-mode: multiply;
        opacity: 0.26;
      "
    >
      <img 
        :src="degradedMenuImg" 
        alt="decorative gradient expanded"
        class="w-full h-full object-cover"
        style="border-radius: 29.3592px;"
      />
    </div>

    <!-- Decorative degradedMenu2 image (cuando está contraído) -->
    <div
      v-else
      class="absolute inset-0 pointer-events-none transition-opacity duration-700"
      style="
        mix-blend-mode: multiply;
        opacity: 0.26;
      "
    >
      <img 
        :src="degradedMenu2Img" 
        alt="decorative gradient collapsed"
        class="w-full h-full object-cover"
        style="border-radius: 29.3592px;"
      />
    </div>

    <!-- Logo -->
    <div
      class="hidden lg:flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-700 relative z-10"
      :class="isExpanded ? 'py-[46px] px-[50px]' : 'py-[46px] px-[12px]'"
    >
      <LogoRav 
        v-if="isExpanded" 
        :size="165" 
        class="w-auto h-auto max-h-full max-w-full transition-opacity duration-700" 
      />
      <!-- Logo contraído cuando está cerrado -->
      <img 
        v-else
        :src="logoRavImg"
        alt="Logo RAV"
        class="w-[76px] h-[26px] transition-opacity duration-700"
      />
    </div>
    
    <!-- Menu de navegación -->
    <nav class="flex-1 overflow-y-auto bg-transparent relative z-10">
      <div class="lg:hidden flex ml-6 pt-4">
        <span class="text-customPurple font-bold"> Menú Principal </span>
      </div>
      <ul
        class="list-none flex flex-col mb-0 transition-all duration-700 items-center"
        :class="[
          isExpanded ? 'gap-[20px] px-[11px]' : 'gap-[41px] px-[10px]'
        ]"
      >
          <li
            v-for="item in menuItems"
            :key="item.title"
            class="relative w-full"
            @click="item.submenu ? toggleSubmenu(item) : handleItemClick(item)"
          >
              <router-link
                v-if="item.to"
                :to="item.to"
                @click="setActive(item)"
                class="flex flex-row items-center transform text-white transition-all duration-700 rounded-[30px]"
                :class="[
                  isActive(item) && isExpanded ? 'bg-amarillo text-customPurple' : '',
                  isExpanded ? 'h-[44px] px-4 gap-5' : 'h-auto p-0 justify-center gap-0'
                ]"
                style="min-width:0; min-height:0;"
              >

              <!-- Icono con fondo amarillo redondo cuando está activo y el menú está cerrado -->
              <template v-if="item.iconComponent">
                <div v-if="isActive(item) && !isExpanded"
                  class="flex items-center justify-center bg-amarillo rounded-full w-[44px] h-[44px] mx-auto p-0 transition-all duration-700">
                  <component
                    :is="item.iconComponent"
                    :size="24"
                    :useGradient="true"
                    class="flex-none w-[24px] h-[24px] transition-colors duration-700"/>
                </div>
                <component
                  v-else
                  :is="item.iconComponent"
                  :size="24"
                  :useGradient="isActive(item)"
                  :color="isActive(item) ? null : 'white'"
                  class="flex-none w-[24px] h-[24px] transition-colors duration-700"/>
              </template>

              <span
                v-if="isExpanded"
                class="text-left text-[18px] leading-[21px] font-['Work_Sans'] transition-opacity duration-700 whitespace-nowrap"
                :class="{
                  'font-bold bg-azul-gradian bg-clip-text text-transparent': isActive(item),
                  'font-normal text-white': !isActive(item),
                }"
                >{{ item.title }}</span>
              <span v-if="item.submenu && isExpanded" class="ml-auto">
                <svg
                  :class="[
                    { 'rotate-180': item.submenuOpen },
                    isActive(item) ? 'text-customPurple' : 'text-white',
                  ]"
                  class="transform transition-transform"
                  width="13"
                  height="8"
                  viewBox="0 0 13 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 8.23077L0 0.230774L13 0.230774L6.75 8.23077Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </router-link>

            <!-- Submenú personalizado estilo Figma -->
            <div
              v-if="item.submenu && isExpanded && item.submenuOpen"
              class="submenu-busqueda absolute left-[0px] top-0 z-50"
              style="width:246px;height:161.02px;"
            >
              <!-- Header amarillo -->
              <div class="flex flex-row items-center gap-[20px] px-4 py-[10px] bg-amarillo rounded-t-[30px] text-[#005DCA]" style="width:244px;height:44px;">
                <component :is="item.iconComponent" :size="24" :color="'#005DCA'" class="w-[24px] h-[24px]" />
                <span class="font-bold text-[18px] leading-[21px] font-['Work_Sans'] bg-gradient-to-b from-[#005DCA] to-[#003B8A] bg-clip-text " style="width:130px;">{{ item.title }}</span>
                <svg width="13" height="8" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-auto">
                  <path d="M6.75 8.23077L0 0.230774L13 0.230774L6.75 8.23077Z" fill="url(#gradAzul)" />
                  <defs>
                    <linearGradient id="gradAzul" x1="0" y1="0" x2="0" y2="9" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#005DCA"/>
                      <stop offset="1" stop-color="#003B8A"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <!-- Fondo blanco y lista -->
              <div class="submenu-content-busqueda" style="position:absolute;top:44px;width:244px;height:117px;background:#fff;box-shadow:0px 5px 9.4px rgba(0,0,0,0.6);border-radius:0 0 20px 20px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px;">
                <div
                  v-for="submenuItem in item.submenu"
                  :key="submenuItem.title"
                  class="flex flex-row items-center gap-[9px] px-3 h-[28px] w-[200px] rounded-[30px] cursor-pointer transition-colors duration-300"
                  :class="canAccessSubmenu ? 'hover:bg-[#f3f3f3]' : 'cursor-not-allowed'"
                  @click="canAccessSubmenu ? handleSubmenuClick($event, submenuItem) : null"
                >
                  <span
                    class="flex items-center justify-center rounded-full"
                    style="width:18.53px;height:18.53px;background:linear-gradient(180deg,#005DCA 0%,#003B8A 100%);"
                  >
                    <component
                      v-if="submenuItem.iconComponent"
                      :is="submenuItem.iconComponent"
                      :size="11"
                      :color="'white'"
                      class="flex-none"
                    />
                  </span>
                  <router-link
                    v-if="submenuItem.to"
                    :to="submenuItem.to"
                    class="text-[14px] leading-[16px] font-['Work_Sans'] font-normal text-[#003B8A]"
                    style="width:168px;"
                    @click.stop="canAccessSubmenu ? null : $event.preventDefault()"
                  >
                    {{ submenuItem.title }}
                  </router-link>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div
              class="cursor-pointer flex lg:hidden mt-0 ml-6 mb-2 gap-1"
              @click="logout"
            >
              <img
                class="w-4 h-auto"
                :src="IconoLogout"
                alt="IconoLogoutResponsive"
              />
              <span
                class="text-left mt-1 ml-0.5 text-black text-sm md:text-base lg:text-lg font-semibold"
                >Cerrar Sesión</span
              >

              <div class="mt-1 ml-12">
                <svg
                  width="12"
                  height="10.5"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.49999 10.5L7.49999 9.00003L1.49997 9.00002L1.49997 1.5L7.49999 1.5L7.49999 -5.16178e-06L-3.81827e-05 -5.81745e-06L-3.91006e-05 10.5L7.49999 10.5ZM8.99999 7.50002L12 5.25001L8.99999 3.00001L8.99999 4.50001L2.99997 4.50001L2.99997 6.00001L8.99999 6.00001L8.99999 7.50002Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </li>
          <li class="lg:hidden">
            <Activity />
          </li>
        </ul>
      </nav>
      
      <!-- Sección inferior con el avatar, nombre y email -->
      <div class="hidden lg:flex flex-col items-center py-[20px] w-full flex-shrink-0 bg-transparent transition-all duration-700 relative z-10"
           :class="isExpanded ? 'px-[20px] gap-[8px]' : 'px-[10px] gap-2'">
          <!-- Contenedor de avatar y texto -->
          <div class="flex items-center w-full transition-all duration-700"
               :class="isExpanded ? 'flex-row gap-3' : 'flex-col justify-center'">
            <!-- Avatar SVG con fondo amarillo -->
            <svg
              :width="isExpanded ? '60' : '60'"
              :height="isExpanded ? '60' : '60'"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="flex-none filter drop-shadow-[0px_0px_6.4px_rgba(0,0,0,0.55)] transition-all duration-700"
            >
              <circle cx="30" cy="30" r="30" fill="#FDC300"/>
              <path
                d="M42.6237 48.3254C40.4036 49.2335 36.4265 50.3012 30.0001 50.3012C23.5737 50.3012 19.5966 49.2335 17.3765 48.3254C15.9006 47.7217 15.0067 46.2131 15.1807 44.6279C15.4719 41.9776 16.312 39.3394 18.232 38.1446C21.7702 35.9427 25.2824 35.0045 25.2824 35.0045C25.4061 34.6194 25.5452 33.3453 25.618 32.0408C25.1699 31.5753 24.7258 31.0896 24.2574 30.6293C23.3658 29.753 23.2655 28.5006 22.9472 26.885C22.3623 27.0512 22.1773 26.7728 22.022 26.536C21.9162 26.3741 21.8745 26.1801 21.8349 25.9907C21.6924 25.3099 21.5502 24.629 21.4079 23.9482C21.3009 23.4367 21.1934 22.9128 21.2659 22.3953C21.3006 22.1507 21.3876 21.8943 21.5886 21.7503C21.7895 21.6067 22.1252 21.6413 22.2258 21.8671C22.2258 21.8671 21.9 18.6626 21.9 18.9323C21.6279 18.6302 21.4125 17.9722 21.5027 17.4636C21.5926 16.9554 21.7543 16.4607 21.8349 15.951C21.9231 15.3913 21.9138 14.8136 22.0746 14.2701C22.3013 13.5039 22.843 12.876 23.3944 12.2981C23.785 11.8887 24.1889 11.4908 24.6295 11.1361C25.5119 10.4269 26.5637 9.89323 27.6889 9.76716C28.05 9.72698 28.4143 9.7287 28.7774 9.73045C29.1847 9.73248 29.5924 9.73448 30 9.73652C30.4076 9.73448 30.8153 9.73248 31.2226 9.73045C31.5858 9.7287 31.95 9.72698 32.3111 9.76716C33.4364 9.89323 34.4882 10.4269 35.3705 11.1361C35.8111 11.4909 36.215 11.8887 36.6056 12.2981C37.157 12.876 37.6988 13.5039 37.9254 14.2701C38.0862 14.8136 38.0769 15.3913 38.1651 15.951C38.2458 16.4607 38.4074 16.9554 38.4973 17.4636C38.5875 17.9722 38.3721 18.6302 38.1 18.9323C38.1 18.6626 37.7742 21.8671 37.7742 21.8671C37.8748 21.6413 38.2105 21.6066 38.4114 21.7503C38.6124 21.8943 38.6994 22.1508 38.7341 22.3953C38.8067 22.9128 38.6991 23.4367 38.5921 23.9482C38.4499 24.629 38.3076 25.3099 38.1651 25.9907C38.1255 26.1801 38.0838 26.3741 37.978 26.536C37.8228 26.7728 37.6377 27.0512 37.0528 26.885C36.7345 28.5006 36.6342 29.753 35.7426 30.6293C35.2742 31.0896 34.8302 31.5753 34.382 32.0408C34.4549 33.3453 34.5939 34.6194 34.7176 35.0045C34.7176 35.0045 38.2298 35.9427 41.768 38.1446C43.688 39.3394 44.5282 41.9776 44.8193 44.6279C44.9935 46.2131 44.0996 47.7217 42.6237 48.3254Z"
                fill="#005DCA"
              />
            </svg>

            <!-- Contenedor de nombre y correo -->
            <div v-if="isExpanded" class="flex flex-col flex-1 overflow-hidden transition-opacity duration-700">
              <!-- Nombre -->
              <p class="font-['Work_Sans'] font-bold text-[24px] leading-[28px] text-center text-white truncate m-0 py-[2px]">
                {{ authStore.authenticatedUser.nombre }} {{ authStore.authenticatedUser.apellidos }}
              </p>
              
              <!-- Correo -->
              <p class="font-['Work_Sans'] font-normal text-[12px] leading-[14px] text-white truncate m-0 py-[5px]">
                {{ authStore.authenticatedUser.correo }}
              </p>
            </div>
          </div>

          <!-- Botón de Cerrar Sesión (solo cuando está expandido) -->
          <!-- <button
            v-if="isExpanded"
            @click="logout"
            class="w-full bg-amarillo rounded-[10px] py-[10px] px-[10px] font-['Work_Sans'] font-bold text-[20px] leading-[23px] text-center text-customPurple hover:bg-yellow-500 transition-all duration-700 border-0 outline-none"
          >
            Cerrar Sesión
          </button> -->
      </div>
  </div>
</template>
<script setup>
import degradedMenuImg from '@/assets/images/degradedMenu.svg';
import degradedMenu2Img from '@/assets/images/DegradedMenu2.svg';
import logoRavImg from '@/assets/images/Group (1).svg';
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import Avatar from "@/components/Buttons/Avatar.vue";
import LogoutButton from "@/components/Buttons/LogoutButton.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import IconoLogout from "@/assets/iconosDash/malecostume-512.svg";
import Activity from "./Activity.vue";
import { useEventStore } from "@/stores/storedataOff";
import { 
  LogoRav,
  IconDashboard,
  IconMap,
  IconSearch,
  IconProfile,
  IconRoute,
  IconTimeline,
  IconActivity,
  IconUpload,
  IconReports,
  IconUsers,
  IconAttention
} from '@/components/Icons';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();
const eventStore = useEventStore();

const user = computed(() => authStore.authenticatedUser.user);

// Estado para controlar si el sidebar está expandido
const isExpanded = ref(false);

/* const user = ref({
	name: "Amy Elsner",
	email: "amy.elsner@example.com",
	avatar: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
}); */

const menuItems = ref([
  {
    title: "Inicio",
    to: { name: "HomePage" },
    iconComponent: IconDashboard,
  },
  {
    title: "Mapa",
    to: { name: "DepartamentosPage" },
    iconComponent: IconMap,
  },
  {
    title: "Búsqueda",
    to: { name: "BusquedaCiudadanoPage" },
    iconComponent: IconSearch,
    submenuOpen: false,
    submenu: [
      {
        title: "Perfil de la Víctima",
        to: { name: "PerfilCiudadanoPage" },
        iconComponent: IconProfile,
      },
      {
        title: "Ruta de Atención",
        to: { name: "RutaAtencionPage" },
        iconComponent: IconRoute,
      },
      // {
      //   title: "Linea de Tiempo",
      //   to: { name: "LineaTiempoNuevaPage" },
      //   iconComponent: IconTimeline,
      // },
      {
        title: "Registro de Actividad",
        to: { name: "RegistroActividadPage" },
        iconComponent: IconActivity,
      },
    ],
  },

  {
    title: "Cargar Archivo",
    to: { name: "SubirFicheroPage" },
    iconComponent: IconUpload,
  },
  {
    title: "Generar Reportes",
    to: { name: "FormatodeReportesPage" },
    iconComponent: IconReports,
  },
  {
    title: "Lista de Usuarios",
    to: { name: "ListaUsuariosPage" },
    iconComponent: IconUsers,
  },

  {
    title: "Lineas de Atención",
    to: { name: "LineasAtencionPage" },
    iconComponent: IconAttention,
  },
]);

const activeItem = ref(null);
const isResponsive = ref(false);

const host = import.meta.env.VITE_HOST;

const emit = defineEmits(["item-click"]);

// Función para actualizar el estado responsive
const updateResponsive = () => {
  isResponsive.value = window.innerWidth < 1024; // Evaluar si es menor a 1024px
};

// Computed para verificar si hay un ciudadano
const canAccessSubmenu = computed(() => !!eventStore.getUserInfo());

// Mostrar mensaje de advertencia
const showToast = () => {
  toast.warning(
    "Por favor, ingrese un Numero de Documento Válido para acceder a esta funcionalidad."
  );
};

// Manejo del clic en el submenú
const handleSubmenuClick = (event, submenuItem) => {
  if (!canAccessSubmenu.value) {
    event.preventDefault(); // Evitar la navegación
    router.push({ name: "BusquedaCiudadanoPage" });
    showToast(); // Mostrar mensaje
  } else {
    setActive(submenuItem);
    // Mantener abierto el submenú relacionado
    menuItems.value.forEach((menuItem) => {
      if (menuItem.submenu) {
        menuItem.submenuOpen = menuItem.submenu.some(
          (submenu) => submenu.title === submenuItem.title
        );
      }
    });
  }
};

// Método para manejar clics
const handleItemClick = (item) => {
  if (item.to) {
    router.push(item.to);
  }
  activeItem.value = item.title;

  // Cerrar submenús sólo si el ítem seleccionado no pertenece a un submenú
  if (!item.submenu) {
    menuItems.value.forEach((menuItem) => {
      if (menuItem.submenu) {
        menuItem.submenuOpen = false;
      }
    });
  }
};

// Método para alternar la apertura del submenú
const toggleSubmenu = (item) => {
  if (item.submenu) {
    item.submenuOpen = !item.submenuOpen;
  }
};

//Metodos par estabelecer el elemento activo del Dashboard
const setActive = (item) => {
  if (item.to) {
    router.push(item.to);
  }
  activeItem.value = item.title;
};
//Computed para verificar si un elemento esta activo
const isActive = (item) => {
  return activeItem.value === item.title || route.name === item.to?.name;
};
const hasShownNoSessionToast = ref(false);

const logout = async () => {
  authStore.logout();
  // Si no hay token y el mensaje azul no se ha mostrado, mostrarlo una vez
  if (!hasShownNoSessionToast.value) {
    toast.info("No hay sesión activa.");
    hasShownNoSessionToast.value = true;
  }
  router.push({ name: "LoginPage" });
  return;

  try {
    // Configurar la petición con el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Hacer la petición de logout
    await axios.post(`${host}:8080/api/auth/logout`, {}, config);
    // Limpiar el token
    localStorage.removeItem("token");
    hasShownNoSessionToast.value = false; // Resetear el flag después de cerrar sesión
    // Mostrar mensaje de éxito
    toast.success("Sesión cerrada con éxito.");
    // Redirigir al login
    router.push({ name: "LoginPage" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    // Si ocurre un error en el logout, solo limpiar el token y redirigir al login sin mostrar otro mensaje
    localStorage.removeItem("token");
    router.push({ name: "LoginPage" });
  }
};

// Configuración inicial
onMounted(() => {
  updateResponsive(); // Actualizar el estado al cargar la página
  window.addEventListener("resize", updateResponsive); // Escuchar cambios de tamaño
});

// Limpieza del event listener
onUnmounted(() => {
  window.removeEventListener("resize", updateResponsive);
});
</script>
<style scoped>
a {
  text-decoration: none; /* Elimina subrayado en enlaces */
}

.sidebar-container {
  position: relative;
  border-radius: 29.3592px;
  filter: drop-shadow(4px 0px 9.7px rgba(0, 93, 202, 0.45));
  z-index: 10;
}

.sidebar-container::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000000;
  border-radius: 30px;
  mix-blend-mode: multiply;
  opacity: 0.26;
  pointer-events: none;
  z-index: -1;
}

/* Ocultar scrollbar pero mantener funcionalidad */
nav::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

nav {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
