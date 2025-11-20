<template>
  <div class="md:pt-8 md:pl-6 flex flex-col">
    <!-- Sección Superior -->
    <div class="flex flex-col md:mb-6">
      <!-- Título con icono -->
      <div class="flex items-center gap-[12px] mb-4">
        <div
          class="bg-azul-gradian rounded-full p-2 flex items-center justify-center"
          style="width: 30px; height: 30px"
        >
          <img
            :src="ListaUsuarios"
            alt="Icono Lista"
            class="w-[18px] h-[18px]"
          />
        </div>
        <h1
          class="text-azul2pae font-bold"
          style="
            font-size: 30px;
            line-height: 35px;
            font-family: 'Work Sans', sans-serif;
          "
        >
          Lista de usuarios
        </h1>
      </div>

      <!-- Botón de Registrar Usuario -->
      <button
        @click="showRegisterModal = true"
        class="text-white cursor-pointer shadow-md border-none transition duration-300 flex items-center justify-center"
        style="
          width: 219px;
          height: 38.25px;
          border-radius: 30px;
          padding: 6px 12px;
          gap: 7px;
          background: #00aa00;
        "
        @mouseenter="$event.target.style.background = '#009900'"
        @mouseleave="$event.target.style.background = '#00AA00'"
      >
        <div
          class="bg-white flex items-center justify-center"
          style="width: 22px; height: 22px; border-radius: 30px; padding: 3px"
        >
          <AddUserIcon :width="14" :height="15" color="#00AA00" />
        </div>
        <span
          style="
            font-family: 'Work Sans', sans-serif;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            color: #ffffff;
          "
          >Registrar usuario</span
        >
      </button>
    </div>

    <!-- Contenedor de la Tabla -->
    <div class="bg-white shadow-md rounded-2xl overflow-hidden">
      <!-- Tabla -->
      <table class="min-w-full table-auto">
        <!-- Cabecera de la tabla -->
        <thead>
          <tr class="text-white">
            <th class="p-1 pt-2 pl-2 w-[394px]">
              <div
                class="bg-azul-gradian rounded-lg flex items-center gap-2 px-4"
                style="
                  height: 48.6px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                <div
                  class="bg-white rounded-full flex items-center justify-center"
                  style="width: 24px; height: 24px"
                >
                  <UserIcon :size="12" color="#005DCA" />
                </div>
                <span class="font-bold">Nombre</span>
              </div>
            </th>
            <th class="p-1 pt-2 w-[264px]">
              <div
                class="bg-azul-gradian rounded-lg flex items-center gap-2 px-4"
                style="
                  height: 48.6px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                <div
                  class="bg-white rounded-full flex items-center justify-center"
                  style="width: 24px; height: 24px"
                >
                  <RoleIcon :width="14" :height="12" color="#005DCA" />
                </div>
                <span class="font-bold">Rol</span>
              </div>
            </th>
            <th class="p-1 pt-2 w-[394px]">
              <div
                class="bg-azul-gradian rounded-lg flex items-center gap-2 px-4"
                style="
                  height: 48.6px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                <div
                  class="bg-white rounded-full flex items-center justify-center"
                  style="width: 24px; height: 24px"
                >
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.8057 0.0125833L15.0921 0C16.1003 0.0754996 16.9088 0.863527 17 1.86862V10.6549C16.9009 11.5216 16.2765 12.2168 15.4381 12.4338C10.9364 12.5581 6.41432 12.4496 1.90479 12.4889C0.918579 12.4103 0.13527 11.6694 0 10.6895V1.79941C0.130551 0.858809 0.863527 0.125833 1.80885 0.0125833H1.8057ZM14.455 1.56347H3.08447L8.58808 5.76157L14.455 1.56347ZM15.435 2.86899L8.55033 7.72298L1.55875 2.47104V10.5118C1.55875 10.7257 1.90637 10.9585 2.12028 10.9301H14.8372C15.0606 10.9695 15.435 10.7398 15.435 10.5118V2.86899Z"
                      fill="#005DCA"
                    />
                  </svg>
                </div>
                <span class="font-bold">Correo</span>
              </div>
            </th>
            <th class="p-1 pt-2 w-[264px]">
              <div
                class="bg-azul-gradian rounded-lg flex items-center gap-2 px-4"
                style="
                  height: 48.6px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                <div
                  class="bg-white rounded-full flex items-center justify-center"
                  style="width: 24px; height: 24px"
                >
                  <DocumentIcon :width="16" :height="12" color="#005DCA" />
                </div>
                <span class="font-bold">Documento</span>
              </div>
            </th>
            <th class="p-1 pt-2 pr-2 w-[131px]">
              <div
                class="bg-azul-gradian rounded-lg flex items-center gap-2 px-4"
                style="
                  height: 48.6px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                <div
                  class="bg-white rounded-full flex items-center justify-center"
                  style="width: 24px; height: 24px"
                >
                  <PermissionsIcon :width="16" :height="16" color="#005DCA" />
                </div>
                <span class="font-bold">Permisos</span>
              </div>
            </th>
          </tr>
        </thead>
        <!-- Cuerpo de la tabla -->
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td class="p-1 pl-2">
              <div
                class="bg-white rounded-lg px-4 flex items-center"
                style="
                  height: 50px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                {{ user.nombre }}
              </div>
            </td>
            <td class="p-1">
              <div
                class="bg-white rounded-lg px-4 flex items-center"
                style="
                  height: 50px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                {{ user.rol || "Desconocida" }}
              </div>
            </td>
            <td class="p-1">
              <div
                class="bg-white rounded-lg px-4 flex items-center"
                style="
                  height: 50px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                {{ user.correo }}
              </div>
            </td>
            <td class="p-1">
              <div
                class="bg-white rounded-lg px-4 flex items-center"
                style="
                  height: 50px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                {{ user.numero_documento }}
              </div>
            </td>
            <td class="p-1">
              <div
                class="bg-white justify-center rounded-lg flex items-center gap-3"
                style="
                  width:147px;
                  height: 50px;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                "
              >
                <!-- Botón Ver -->
                <button
                  @click="viewUser(user)"
                  class="bg-azul-gradian cursor-pointer border-none shadow-md rounded-full hover:bg-purple-800 transition-colors flex items-center justify-center"
                  style="width: 26px; height: 25px"
                >
                  <ViewIcon :width="20" :height="11" color="white" />
                </button>
                <!-- Botón Editar -->
                <button
                  @click="updateUser(user)"
                  class="bg-azul-gradian cursor-pointer border-none shadow-md rounded-full hover:bg-purple-800 transition-colors flex items-center justify-center"
                  style="width: 26px; height: 25px"
                >
                  <EditIcon :width="15.6" :height="15.04" color="white" />
                </button>
                <!-- Botón Eliminar -->
                <button
                  v-if="user.correo !== superAdminEmail"
                  @click="confirmDeleteUser(user)"
                  class="bg-azul-gradian border-none cursor-pointer shadow-md rounded-full hover:bg-purple-800 transition-colors flex items-center justify-center"
                  style="width: 26px; height: 25px"
                >
                  <DeleteIcon :width="15.6" :height="16.15" color="white" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Registrar Usuario -->

    <div
      v-if="showRegisterModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur"
    >
      <!-- Modal -->
      <div
        class="relative bg-white shadow-lg rounded-lg w-full max-w-5xl flex flex-col lg:flex-row"
      >
        <!-- Botón de Cerrar -->
        <button
          @click="closeRegisterModal"
          class="absolute -top-2 -right-2 bg-rojo-gradian rounded-full border-none cursor-pointer flex items-center justify-center hover:opacity-90 z-20"
          style="width: 20px; height: 20px"
        >
          <CloseXIcon :width="7" :height="8" color="white" />
        </button>

        <!-- Formulario -->
        <div
          class="relative z-10 bg-white p-8 lg:p-16 w-full lg:w-1/2 mx-auto rounded-lg lg:rounded-none"
        >
          <!-- Logo de RAV -->
          <div class="text-center mb-4">
            <img
              :src="logoRav"
              alt="Logo RAV"
              class="w-36 h-auto mx-auto mb-4 lg:w-48"
            />
          </div>

          <!-- Título del Formulario -->
          <h2
            class="text-2xl lg:text-3xl font-semibold text-black mb-6 text-center"
          >
            Registrar Usuario
          </h2>

          <!-- Campos del Formulario -->
          <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Selección de Rols -->
            <div class="flex justify-between mb-6">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="admin"
                  name="rol"
                  value="Administrador"
                  v-model="formData.rol"
                  class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple"
                />
                <span
                  :class="{
                    'text-black font-semibold':
                      formData.rol === 'Administrador',
                    'text-gray-700': formData.rol !== 'Administrador',
                  }"
                  class="text-sm lg:text-lg"
                >
                  Administrador
                </span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="funcionario"
                  name="rol"
                  value="Funcionario"
                  v-model="formData.rol"
                  class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple"
                />
                <span
                  :class="{
                    'text-black font-semibold': formData.rol === 'Funcionario',
                    'text-gray-700': formData.rol !== 'Funcionario',
                  }"
                  class="text-sm lg:text-lg"
                >
                  Funcionario
                </span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="funcionario"
                  name="rol"
                  value="Funcionario"
                  v-model="formData.rol"
                  class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple"
                />
                <span
                  :class="{
                    'text-black font-semibold': formData.rol === 'Funcionario',
                    'text-gray-700': formData.rol !== 'Funcionario',
                  }"
                  class="text-sm lg:text-lg"
                >
                  Operario
                </span>
              </label>
            </div>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Nombre"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
              required
            />

            <input
              v-model="formData.email"
              type="email"
              placeholder="Correo SENA"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
              required
            />

            <!-- Contraseña -->
            <div class="relative">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Crear Contraseña"
                id="password"
                class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
                required
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute top-1/4 bg-gray-100 border-none right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  v-if="showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8a10.05 10.05 0 01.875-3.825M16.625 4.575A10.05 10.05 0 0112 5c4.418 0 8 3.582 8 8a10.05 10.05 0 01-.875 3.825M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.273.98-.674 1.887-1.175 2.688M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <!-- Confirmar Contraseña -->
            <div class="relative">
              <input
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirmar Contraseña"
                id="confirmPassword"
                class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
                required
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute top-1/4 bg-gray-100 border-none right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  v-if="showConfirmPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8a10.05 10.05 0 01.875-3.825M16.625 4.575A10.05 10.05 0 0112 5c4.418 0 8 3.582 8 8a10.05 10.05 0 01-.875 3.825M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.273.98-.674 1.887-1.175 2.688M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <button
              type="submit"
              class="w-full bg-azul-gradian border-none cursor-pointer hover:bg-moradoSecundario text-amarillo font-bold py-3 rounded-full transition duration-300"
            >
              Registrar
            </button>
          </form>

          <!-- Logos Inferiores -->
          <div class="flex justify-center items-center space-x-6 mt-6">
            <img :src="logoSena" alt="Logo SENA" class="w-12 h-auto" />
            <img :src="logoApe" alt="Logo APE" class="w-12 h-auto" />
          </div>
        </div>

        <!-- Imagen de Fondo -->
        <div class="relative hidden lg:block w-1/2 overflow-hidden z-0">
          <img
            :src="imagenRegistro"
            alt="Cultura Colombiana"
            class="w-full h-full object-cover lg:rounded-r-lg"
          />
        </div>
      </div>
      <confirmacion-registro
        v-if="showConfirmation"
        @close="closeConfirmationModal"
      />
    </div>

    <!-- Modal para Ver Usuario -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur"
    >
      <!-- Modal Content (Figma: 1326x395, radius 10px) -->
      <div
        class="relative bg-white shadow-lg rounded-[10px] w-[1326px] h-[395px] px-4 py-1 bg-no-repeat bg-center"
        :style="{
          backgroundImage: `url(${FondoImagen})`,
          backgroundSize: '306px 339px',
          backgroundPosition: 'center',
        }"
      >
        <!-- Header: Icono + Título + Cerrar -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div
              class="bg-azul-gradian rounded-full flex items-center justify-center mr-2"
              style="width: 20px; height: 20px"
            >
              <UserIcon :width="9.89" :height="13.38" color="white" />
            </div>
            <h2 class="text-[16px] leading-[19px] font-bold text-black">
              DATOS DE USUARIO
            </h2>
          </div>
          <button
            @click="closeViewModal"
            class="absolute -top-2 -right-2 bg-rojo-gradian rounded-full border-none cursor-pointer flex items-center justify-center hover:opacity-90"
            style="width: 20px; height: 20px"
          >
            <CloseXIcon :width="7" :height="8" color="white" />
          </button>
        </div>

        <!-- Cuerpo con secciones y línea separadora -->
        <div class="mt-4">
          <!-- Sección: Datos base -->
          <h3 class="text-[16px] leading-[19px] font-bold text-black mb-2">
            Datos base
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <!-- Nombre completo (izquierda) -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Nombre completo:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black"
              >
                {{ selectedUser.nombre }}
              </div>
            </div>
            <!-- Cédula (derecha) -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Cédula:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black"
              >
                {{ selectedUser.numero_documento }}
              </div>
            </div>
          </div>

          <!-- Línea separadora (Vector 157) -->
          <div class="w-full h-px bg-[#D9D9D9] my-4"></div>

          <!-- Sección: Datos laborales -->
          <h3 class="text-[16px] leading-[19px] font-bold text-black mb-2">
            Datos laborales
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <!-- Ubicación / Sede -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Ubicación / Sede:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black"
              >
                {{ selectedUser.sed_nombre }}
              </div>
            </div>
            <!-- Regional -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Regional:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black"
              >
                {{ selectedUser.regional }}
              </div>
            </div>
            <!-- Rol -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Rol:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black"
              >
                {{ selectedUser.rol }}
              </div>
            </div>
            <!-- Correo SENA -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Correo SENA:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black truncate"
              >
                {{ selectedUser.correo }}
              </div>
            </div>
            <!-- Teléfono -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Teléfono:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black"
              >
                {{ selectedUser.telefono }}
              </div>
            </div>
            <!-- Celular -->
            <div class="flex flex-col w-[634px]">
              <div
                class="text-[16px] leading-[19px] font-medium text-black mb-1"
              >
                Celular:
              </div>
              <div
                class="h-[30px] bg-[#EEF5FF] rounded-[30px] px-4 flex items-center text-[16px] text-black"
              >
                {{ selectedUser.celular }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Editar Usuario -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur"
    >
      <div
        class="relative bg-white rounded-[10px] shadow-lg bg-no-repeat bg-center"
        :style="{
          width: '1326px',
          height: '519px',
          backgroundImage: `url(${FondoImagen})`,
          backgroundSize: '306px 339px',
          backgroundPosition: 'center',
        }"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pt-4">
          <div class="flex items-center gap-2">
            <div
              class="w-5 h-5 rounded-full bg-azul-gradian flex items-center justify-center"
            >
              <UserIcon :width="9.89" :height="13.38" color="white" />
            </div>
            <h2 class="text-[16px] leading-[19px] font-bold text-black">
              DATOS DE USUARIO
            </h2>
          </div>
          <button
            @click="closeEditModal"
            class="absolute -top-2 -right-2 bg-rojo-gradian rounded-full border-none cursor-pointer flex items-center justify-center hover:opacity-90"
            style="width: 20px; height: 20px"
          >
            <CloseXIcon :width="7" :height="8" color="white" />
          </button>
        </div>

        <!-- Body -->
        <form @submit.prevent="saveUser" class="px-6">
          <!-- Separador superior -->
          <div class="w-[1293px] h-px bg-[#D9D9D9] mt-2"></div>

          <!-- DATOS BASE -->
          <h3 class="mt-3 text-[16px] leading-[19px] font-bold text-black">
            DATOS BASE
          </h3>
          <div class="grid grid-cols-2 gap-x-6 gap-y-3 mt-1 w-[1288px]">
            <!-- Nombre completo -->
            <div class="flex flex-col">
              <label
                for="Nombre"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Nombre completo:</label
              >
              <input
                id="Nombre"
                v-model="selectedUser.nombre"
                type="text"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              />
            </div>
            <!-- Cédula -->
            <div class="flex flex-col">
              <label
                for="Cedula"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Cedula:</label
              >
              <input
                id="Cedula"
                v-model="selectedUser.numero_documento"
                type="text"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              />
            </div>
          </div>

          <!-- Línea separadora entre DATOS BASE y DATOS LABORALES (Vector 157) -->
          <div class="w-[1293px] h-px bg-[#D9D9D9] my-3"></div>

          <!-- DATOS LABORALES -->
          <h3 class="mt-4 text-[16px] leading-[19px] font-bold text-black">
            DATOS LABORALES
          </h3>
          <div class="grid grid-cols-2 gap-x-6 gap-y-3 mt-1 w-[1288px]">
            <!-- Ubicación / Sede -->
            <div class="flex flex-col">
              <label
                for="sed_nombre"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Ubicación / Sede:</label
              >
              <input
                id="sed_nombre"
                v-model="selectedUser.sed_nombre"
                type="text"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              />
            </div>
            <!-- Regional -->
            <div class="flex flex-col">
              <label
                for="regional"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Regional:</label
              >
              <input
                id="regional"
                v-model="selectedUser.regional"
                type="text"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              />
            </div>

            <!-- Rol -->
            <div class="flex flex-col">
              <label
                for="rol"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Rol:</label
              >
              <select
                v-model="selectedUser.rol"
                id="rol"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              >
                <option value="Administrador">Administrador</option>
                <option value="Funcionario">Funcionario</option>
                <option value="Operario">Operario</option>
              </select>
            </div>

            <!-- Correo SENA -->
            <div class="flex flex-col">
              <label
                for="correo"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Correo SENA:</label
              >
              <input
                id="correo"
                v-model="selectedUser.correo"
                type="email"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              />
            </div>

            <!-- Teléfono -->
            <div class="flex flex-col">
              <label
                for="telefono"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Telefono:</label
              >
              <input
                id="telefono"
                v-model="selectedUser.telefono"
                type="text"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              />
            </div>

            <!-- Celular -->
            <div class="flex flex-col">
              <label
                for="celular"
                class="text-[16px] leading-[19px] font-medium text-black"
                >Celular:</label
              >
              <input
                id="celular"
                v-model="selectedUser.celular"
                type="text"
                class="w-full h-[30px] rounded-full bg-gray-100 px-4 border-none"
                required
              />
            </div>
          </div>

          <!-- Separador inferior -->
          <div class="w-[1293px] h-px bg-[#D9D9D9] mt-3 mb-4"></div>

          <!-- Botón Guardar -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="flex bg-azul-gradian flex-row font-work-sans items-center justify-center p-[10px] gap-[10px] rounded-[30px] text-[#FDC300] font-bold text-[16px] leading-[19px] hover:opacity-90 border-none w-[219px] h-[30px]"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para Confirmar Eliminación -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur"
    >
      <div
        class="bg-white shadow-lg rounded-[25px] p-6 relative"
        style="width: 538px; height: 454px"
      >
        <button
          @click="closeDeleteModal"
          class="absolute -top-2 -right-2 bg-rojo-gradian rounded-full border-none cursor-pointer flex items-center justify-center hover:opacity-90"
          style="width: 30px; height: 30px"
          aria-label="Cerrar"
          type="button"
        >
          <CloseXIcon :width="7" :height="8" color="white" />
        </button>
        <div class="text-center">
          <img :src="DeleteSucess" class="my-5" alt="" />
          <h2 class="text-xl font-bold m-0 text-black">¿Estás seguro que</h2>
          <h2 class="text-xl font-bold mb-5 mt-0 text-black">
            deseas eliminar este usuario?
          </h2>
          <div class="flex justify-center space-x-4">
            <button
              @click="deleteUser"
              class="cursor-pointer text-amarillo bg-azul-gradian border-none font-bold hover:opacity-90 flex items-center justify-center"
              style="
                width: 247px;
                height: 43px;
                border-radius: 30px;
                font-family: 'Work Sans', sans-serif;
                font-size: 20px;
                line-height: 23px;
              "
            >
              Aceptar
            </button>

            <button
              @click="closeDeleteModal"
              class="cursor-pointer text-azul2Ape border-none font-bold hover:opacity-90 flex items-center justify-center"
              style="
                width: 247px;
                height: 43px;
                background: #fdc300;
                border-radius: 30px;
                font-family: 'Work Sans', sans-serif;
                font-size: 20px;
                line-height: 23px;
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de confirmación de éxito independiente -->
    <ModalConfirmacionEliminar
      v-if="isModalOpen"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import ListaUsuarios from "@/assets/images/ListaUsuarios.svg";
import IconoEditar from "@/assets/images/IconoEditar.svg";
import IconoEliminar from "@/assets/images/IconoEliminar.svg";
import IconoVisualizar from "@/assets/images/IconoVisualizar.svg";
import RegistroUsuario from "@/assets/images/RegistroUsuario.svg";
import DeleteSucess from "@/assets/images/delete-success.webp";
import imagenRegistro from "@/assets/images/imagenRegistro.jpg";
import logoRav from "@/assets/images/LogoPageRav.svg";
import logoSena from "@/assets/images/logosenaverde.svg";
import logoApe from "@/assets/images/logoape.svg";
import Usuario from "@/assets/images/Usuario.svg";
import FondoImagen from "@/assets/images/colombiaCollage1.webp";
import ConfirmacionRegistro from "@/components/ConfirmacionRegistro.vue";
import ModalConfirmacionEliminar from "@/components/ModalConfirmacionEliminar.vue"; // Importa tu componente
import AddUserIcon from "@/components/Icons/AddUserIcon.vue";
import UserIcon from "@/components/Icons/UserIcon.vue";
import RoleIcon from "@/components/Icons/RoleIcon.vue";
import DocumentIcon from "@/components/Icons/DocumentIcon.vue";
import PermissionsIcon from "@/components/Icons/PermissionsIcon.vue";
import ViewIcon from "@/components/Icons/ViewIcon.vue";
import EditIcon from "@/components/Icons/EditIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import CloseXIcon from "@/components/Icons/CloseXIcon.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

// Estados para modales
const showRegisterModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);
const showViewModal = ref(false);
const showConfirmation = ref(false); // Estado del modal de confirmación
const toast = useToast();
const router = useRouter();
const superAdminEmail = "superadmin@example.com"; //Correo del SuperAdmin

// Usuario seleccionado para ver, editar o eliminar
const selectedUser = reactive({});
const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  rol: "",
});

const host = import.meta.env.VITE_HOST;

// Lista de usuarios Con datos Quemados
const users = reactive([
  {
    id: 1,
    nombre: "Carlos Andrés Martínez",
    apellido: "Martínez",
    correo: "carlos.martinez@sena.edu.co",
    numero_documento: "1054373590",
    rol: "Funcionario",
    sed_nombre: "Sede Central",
    regional: "Regional Risaralda",
    telefono: "312-456-7890",
    celular: "321-654-9870",
  },
  {
    id: 2,
    nombre: "María Fernanda López",
    apellido: "López",
    correo: "maria.lopez@sena.edu.co",
    numero_documento: "1098765432",
    rol: "Administrador",
    sed_nombre: "Sede Norte",
    regional: "Regional Cundinamarca",
    telefono: "310-123-4567",
    celular: "315-987-6543",
  },
  {
    id: 3,
    nombre: "Jorge Luis Ramírez",
    apellido: "Ramírez",
    correo: "jorge.ramirez@sena.edu.co",
    numero_documento: "1087654321",
    rol: "Funcionario",
    sed_nombre: "Sede Sur",
    regional: "Regional Antioquia",
    telefono: "316-789-0123",
    celular: "320-456-7890",
  },
  {
    id: 4,
    nombre: "Ana Patricia Gómez",
    apellido: "Gómez",
    correo: "ana.gomez@sena.edu.co",
    numero_documento: "1045678901",
    rol: "Funcionario",
    sed_nombre: "Sede Centro",
    regional: "Regional Valle del Cauca",
    telefono: "318-234-5678",
    celular: "319-876-5432",
  },
  {
    id: 5,
    nombre: "Luis Fernando Castro",
    apellido: "Castro",
    correo: "luis.castro@sena.edu.co",
    numero_documento: "1023456789",
    rol: "Administrador",
    sed_nombre: "Sede Occidente",
    regional: "Regional Caldas",
    telefono: "314-567-8901",
    celular: "317-234-5678",
  },
]);

/* const users = reactive([]); */
const loading = ref(false); // Indicador de carga

const permisos = ref({
  inicio: false,
  mapa: false,
  busqueda: false,
  cargarArchivo: false,
  generarReporte: false,
  listarUsuarios: false,
  lineaTiempo: false,
});

// Funciones para Registrar Usuario
async function submitForm() {
  if (formData.password !== formData.confirmPassword) {
    toast.error("Las contraseñas no coinciden");
    return;
  }

  try {
    // Obtener el token del localStorage
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    if (!token) {
      toast.error("Token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    // Cuerpo de la solicitud con datos predeterminados
    const payload = {
      nombre: formData.name,
      apellidos: "A", // Valor quemado
      tipo_documento: "CC", // Valor quemado
      numero_documento: formData.documento,
      sede: "A", // Valor quemado
      id_rol: roleReverseMap[formData.rol],
      regional: "A", // Valor quemado
      correo: formData.email,
      telefono: "1234", // Valor quemado
      contraseña: formData.password,
    };

    // Realizar la solicitud con el token en los headers
    await axios.post(`${host}:8080/users`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
    closeRegisterModal();
    router.push("/listausuarios");
    fetchUsers();
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    toast.error(error.response?.data?.error || "Error en el registro");
  }
}

// Función para listar usuarios
const fetchUsers = async () => {
  loading.value = true; // Activar indicador de carga
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    if (!token) {
      toast.error("Token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    const response = await axios.get(`${host}:8080/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Mapea los roles numéricos a etiquetas
    const mappedUsers = response.data.map((user) => ({
      ...user,
      rol: roleMap[user.id_rol] || "Desconocido",
    }));

    // Actualiza la lista local
    users.splice(0, users.length, ...mappedUsers);

    toast.success("Usuarios cargados correctamente.");
  } catch (error) {
    console.error(
      "Error al listar usuarios:",
      error.response?.data || error.message
    );
    toast.error("Error al listar usuarios.");
  } finally {
    loading.value = false; // Desactivar indicador de carga
  }
};
function closeRegisterModal() {
  // Limpiar los campos del formulario
  formData.name = "";
  formData.email = "";
  formData.document = "";
  formData.rol = "";
  showRegisterModal.value = false;
}

// Función para manejar el clic en "Registrar"
const handleRegister = () => {
  // Lógica para el registro (agregar los datos del formulario, etc.)
  // Después de eso, mostrar el modal de confirmación
  showConfirmation.value = true;
  showRegisterModal.value = false; // Opcionalmente cerrar el modal de registro
};

// Función para cerrar el modal de confirmación
const closeConfirmationModal = () => {
  showConfirmation.value = false;
  showRegisterModal.value = true; // Opcionalmente mostrar el modal de registro nuevamente
};

// Funciones para Ver Usuario
function viewUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showViewModal.value = true;
}

function closeViewModal() {
  showViewModal.value = false;
}

function updateUser(user) {
  Object.assign(selectedUser, user); // Asigna los datos del usuario seleccionado

  showEditModal.value = true; // Abre el modal de edición
}

function closeEditModal() {
  showEditModal.value = false;
}

const saveUser = async () => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    if (!token) {
      toast.error("Token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    if (!selectedUser.id) {
      toast.error("ID del usuario no encontrado. Verifica los datos.");
      return;
    }

    // Realiza la solicitud de actualización
    await axios.patch(
      `${host}:8080/users/${selectedUser.id}`,
      {
        nombre: selectedUser.nombre,
        apellidos: selectedUser.apellido,
        tipo_documento: "CC", // Reemplaza según sea necesario
        numero_documento: selectedUser.numero_documento,
        sede: selectedUser.sed_nombre,
        id_rol: roleReverseMap[selectedUser.rol], // Mapeo de roles
        regional: selectedUser.regional,
        correo: selectedUser.correo,
        telefono: selectedUser.telefono,
        celular: selectedUser.celular,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Actualizar la lista local
    const index = users.findIndex((u) => u.id === selectedUser.id);
    if (index !== -1) {
      users[index] = { ...selectedUser };
    }

    toast.success("Usuario actualizado correctamente.");
    closeEditModal(); // Cerrar el modal de edición
  } catch (error) {
    console.error(
      "Error al actualizar usuario:",
      error.response?.data || error.message
    );
    toast.error("Error al actualizar usuario.");
  }
};

// Funciones para Eliminar Usuario
function confirmDeleteUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}

const deleteUser = async () => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    if (!token) {
      toast.error("Token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    await axios.delete(`${host}:8080/users/${selectedUser.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Eliminar usuario de la lista local
    const index = users.findIndex((u) => u.id === selectedUser.id);
    if (index !== -1) users.splice(index, 1);

    toast.success("Usuario eliminado correctamente.");
    closeDeleteModal(); // Cerrar modal de eliminación
    // Abrir modal de confirmación de éxito
    isModalOpen.value = true;
  } catch (error) {
    console.error(
      "Error al eliminar usuario:",
      error.response?.data || error.message
    );
    toast.error("Error al eliminar usuario.");
  }
};

// Estado para controlar la visibilidad del modal
const isModalOpen = ref(false);

// Función para abrir el modal
const openModal = () => {
  isModalOpen.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  isModalOpen.value = false;
};

//Mapeo de Roles Bidireccionales
const roleMap = {
  1: "Administrador",
  2: "Funcionario",
};

const roleReverseMap = {
  Administrador: 1,
  Funcionario: 2,
};
// Mostrar/ocultar contraseñas
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Métodos para alternar las contraseñas
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

onMounted(() => {
  // fetchUsers(); // Comentado para usar datos dummy
});
</script>

<style scoped>
/* Estilos personalizados según Figma */
.bg-gray-100 {
  background-color: #eef5ff;
}

/* Transiciones suaves */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Fondo oscuro y desenfoque */
.fixed {
  backdrop-filter: blur(8px);
  z-index: 50;
}

.backdrop-blur {
  backdrop-filter: blur(8px);
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #005dca;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #003b8a;
}

/* Animación de botones */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

/* Sombreado de tabla */
table {
  border-collapse: separate;
  border-spacing: 0;
}

/* Estilos de inputs del formulario */
input[type="text"],
input[type="email"],
input[type="password"],
select {
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
select:focus {
  outline: 2px solid #005dca;
  outline-offset: 2px;
  border-color: #005dca;
}

/* Radio buttons personalizados */
input[type="radio"]:checked {
  background-color: #005dca;
  border-color: #005dca;
}
</style>
