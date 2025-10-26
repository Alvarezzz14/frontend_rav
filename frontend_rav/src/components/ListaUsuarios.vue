<template>
	<div class="min-h-screen p-4 flex flex-col">
		<!-- Sección Superior -->
		<div class="flex flex-col mb-6 mx-8">
			<!-- Título con icono -->
			<div class="flex items-center gap-[12px] mb-4">
				<div class="bg-customPurple rounded-full p-2 flex items-center justify-center" style="width: 30px; height: 30px;">
					<img
						:src="ListaUsuarios"
						alt="Icono Lista"
						class="w-[18px] h-[18px]" />
				</div>
				<h1 class="text-customPurple font-bold" style="font-size: 30px; line-height: 35px; font-family: 'Work Sans', sans-serif;">Lista de usuarios</h1>
			</div>

			<!-- Botón de Registrar Usuario -->
			<button
				@click="showRegisterModal = true"
				class="text-white cursor-pointer shadow-md border-none transition duration-300 flex items-center justify-center"
				style="width: 219px; height: 38.25px; border-radius: 30px; padding: 6px 12px; gap: 7px; background: #00AA00;"
				@mouseenter="$event.target.style.background='#009900'"
				@mouseleave="$event.target.style.background='#00AA00'">
				<div class="bg-white flex items-center justify-center" style="width: 26px; height: 26px; border-radius: 30px; padding: 3px;">
					<AddUserIcon :width="14" :height="15" color="#00AA00" />
				</div>
				<span style="font-family: 'Work Sans', sans-serif; font-weight: 400; font-size: 18px; line-height: 21px; color: #FFFFFF;">Registrar usuario</span>
			</button>
		</div>

		<!-- Contenedor de la Tabla -->
		<div class="mx-8 bg-white shadow-md rounded-2xl overflow-hidden">
			<!-- Tabla -->
			<table class="min-w-full table-auto">
				<!-- Cabecera de la tabla -->
				<thead>
					<tr class="text-white">
						<th class="p-2">
							<div class="bg-customPurple rounded-lg flex items-center gap-2 px-4" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								<div class="bg-white rounded-full flex items-center justify-center" style="width: 24px; height: 24px;">
									<UserIcon :size="12" color="#71277A" />
								</div>
								<span class="font-bold">Nombre</span>
							</div>
						</th>
						<th class="p-2">
							<div class="bg-customPurple rounded-lg flex items-center gap-2 px-4" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								<div class="bg-white rounded-full flex items-center justify-center" style="width: 24px; height: 24px;">
									<RoleIcon :width="14" :height="12" color="#71277A" />
								</div>
								<span class="font-bold">Rol</span>
							</div>
						</th>
						<th class="p-2">
							<div class="bg-customPurple rounded-lg flex items-center gap-2 px-4" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								<div class="bg-white rounded-full flex items-center justify-center" style="width: 24px; height: 24px;">
									<svg
										width="12"
										height="10"
										viewBox="0 0 17 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M1.8057 0.0125833L15.0921 0C16.1003 0.0754996 16.9088 0.863527 17 1.86862V10.6549C16.9009 11.5216 16.2765 12.2168 15.4381 12.4338C10.9364 12.5581 6.41432 12.4496 1.90479 12.4889C0.918579 12.4103 0.13527 11.6694 0 10.6895V1.79941C0.130551 0.858809 0.863527 0.125833 1.80885 0.0125833H1.8057ZM14.455 1.56347H3.08447L8.58808 5.76157L14.455 1.56347ZM15.435 2.86899L8.55033 7.72298L1.55875 2.47104V10.5118C1.55875 10.7257 1.90637 10.9585 2.12028 10.9301H14.8372C15.0606 10.9695 15.435 10.7398 15.435 10.5118V2.86899Z"
											fill="#71277A" />
									</svg>
								</div>
								<span class="font-bold">Correo</span>
							</div>
						</th>
						<th class="p-2">
							<div class="bg-customPurple rounded-lg flex items-center gap-2 px-4" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								<div class="bg-white rounded-full flex items-center justify-center" style="width: 24px; height: 24px;">
									<DocumentIcon :width="16" :height="12" color="#71277A" />
								</div>
								<span class="font-bold">Documento</span>
							</div>
						</th>
						<th class="p-2">
							<div class="bg-customPurple rounded-lg flex items-center gap-2 px-4" style="width: 135px; height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								<div class="bg-white rounded-full flex items-center justify-center" style="width: 24px; height: 24px;">
									<PermissionsIcon :width="16" :height="16" color="#71277A" />
								</div>
								<span class="font-bold">Permisos</span>
							</div>
						</th>
					</tr>
				</thead>
				<!-- Cuerpo de la tabla -->
				<tbody>
					<tr
						v-for="(user, index) in users"
						:key="index">
						<td class="p-2">
							<div class="bg-white rounded-lg px-4 flex items-center" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								{{ user.nombre }}
							</div>
						</td>
						<td class="p-2">
							<div class="bg-white rounded-lg px-4 flex items-center" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								{{ user.rol || "Desconocida" }}
							</div>
						</td>
						<td class="p-2">
							<div class="bg-white rounded-lg px-4 flex items-center" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								{{ user.correo }}
							</div>
						</td>
						<td class="p-2">
							<div class="bg-white rounded-lg px-4 flex items-center" style="height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								{{ user.numero_documento }}
							</div>
						</td>
						<td class="p-2">
							<div class="bg-white rounded-lg px-4 flex items-center gap-2" style="width: 135px; height: 50px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);">
								<!-- Botón Ver -->
								<button
									@click="viewUser(user)"
									class="bg-customPurple cursor-pointer border-none shadow-md rounded-full hover:bg-purple-800 transition-colors flex items-center justify-center"
									style="width: 26px; height: 25px;">
									<ViewIcon :width="20" :height="11" color="white" />
								</button>
								<!-- Botón Editar -->
								<button
									@click="updateUser(user)"
									class="bg-customPurple cursor-pointer border-none shadow-md rounded-full hover:bg-purple-800 transition-colors flex items-center justify-center"
									style="width: 26px; height: 25px;">
									<EditIcon :width="15.6" :height="15.04" color="white" />
								</button>
								<!-- Botón Eliminar -->
								<button
									v-if="user.correo !== superAdminEmail"
									@click="confirmDeleteUser(user)"
									class="bg-customPurple border-none cursor-pointer shadow-md rounded-full hover:bg-purple-800 transition-colors flex items-center justify-center"
									style="width: 26px; height: 25px;">
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
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
			<!-- Modal -->
			<div
				class="relative bg-white shadow-lg rounded-lg w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">
				<!-- Botón de Cerrar -->
				<button
					@click="closeRegisterModal"
					class="absolute top-4 right-4 text-customPurple rounded-full hover:text-customPurple hover:bg-white cursor-pointer border-none text-xl z-10">
					✕
				</button>

				<!-- Formulario -->
				<div
					class="relative z-10 bg-white p-8 lg:p-16 w-full lg:w-1/2 mx-auto rounded-lg lg:rounded-none">
					<!-- Logo de RAV -->
					<div class="text-center mb-4">
						<img
							:src="logoRav"
							alt="Logo RAV"
							class="w-36 h-auto mx-auto mb-4 lg:w-48" />
					</div>

					<!-- Título del Formulario -->
					<h2
						class="text-2xl lg:text-3xl font-semibold text-black mb-6 text-center">
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
									class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple" />
								<span
									:class="{
										'text-black font-semibold':
											formData.rol === 'Administrador',
										'text-gray-700': formData.rol !== 'Administrador',
									}"
									class="text-sm lg:text-lg">
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
									class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple" />
								<span
									:class="{
										'text-black font-semibold': formData.rol === 'Funcionario',
										'text-gray-700': formData.rol !== 'Funcionario',
									}"
									class="text-sm lg:text-lg">
									Funcionario
								</span>
							</label>
						</div>
						<input
							v-model="formData.name"
							type="text"
							placeholder="Nombre"
							class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
							required />
						<input
							v-model="formData.documento"
							type="text"
							placeholder="Digite Documento Identidad"
							class="w-full px-3 h-11 py-2 bg-grisInput border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
							required />
						<input
							v-model="formData.email"
							type="email"
							placeholder="Correo SENA"
							class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
							required />

						<!-- Contraseña -->
						<div class="relative">
							<input
								v-model="formData.password"
								:type="showPassword ? 'text' : 'password'"
								placeholder="Crear Contraseña"
								id="password"
								class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
								required />
							<button
								type="button"
								@click="togglePassword"
								class="absolute top-1/4 bg-gray-100 border-none right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none">
								<svg
									v-if="showPassword"
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8a10.05 10.05 0 01.875-3.825M16.625 4.575A10.05 10.05 0 0112 5c4.418 0 8 3.582 8 8a10.05 10.05 0 01-.875 3.825M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
								</svg>
								<svg
									v-else
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.273.98-.674 1.887-1.175 2.688M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
								required />
							<button
								type="button"
								@click="toggleConfirmPassword"
								class="absolute top-1/4 bg-gray-100 border-none right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none">
								<svg
									v-if="showConfirmPassword"
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8a10.05 10.05 0 01.875-3.825M16.625 4.575A10.05 10.05 0 0112 5c4.418 0 8 3.582 8 8a10.05 10.05 0 01-.875 3.825M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
								</svg>
								<svg
									v-else
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.273.98-.674 1.887-1.175 2.688M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</button>
						</div>

						<button
							type="submit"
							class="w-full bg-customPurple cursor-pointer hover:bg-moradoSecundario text-amarillo font-bold py-3 rounded-lg transition duration-300">
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
						class="w-full h-full object-cover lg:rounded-r-lg" />
				</div>
			</div>
			<confirmacion-registro
				v-if="showConfirmation"
				@close="closeConfirmationModal" />
		</div>

		<!-- Modal para Ver Usuario -->
		<div
			v-if="showViewModal"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
			<!-- Modal Content -->
			<div
				class="bg-white shadow-lg rounded-lg w-10/12 max-w-xl p-6 relative bg-no-repeat bg-cover bg-center"
				:style="{
					backgroundImage: `url(${FondoImagen})`,
					backgroundSize: '80%',
					backgroundPosition: 'center',
				}">
				<!-- Contenedor para el título, imagen y botón de cerrar -->
				<div class="flex items-center justify-between mb-4">
					<!-- Título y Imagen de Usuario -->
					<div class="flex items-center">
						<!-- Imagen de Usuario -->
						<div class="bg-customPurple rounded-full p-2 mr-2">
							<img :src="Usuario" alt="Usuario" class="w-8 h-8" />
						</div>
						<!-- Título -->
						<h2 class="text-xl font-bold text-black">Datos del Usuario</h2>
					</div>

					<!-- Close Button -->
					<button
						@click="closeViewModal"
						class="text-customPurple hover:text-white cursor-pointer hover:bg-customPurple rounded-full border-none text-2xl">
						✕
					</button>
				</div>

				<!-- Datos Personales (con valores debajo de cada campo) -->
				<div class="mb-6">
					<h3 class="font-semibold text-black">Datos Personales</h3>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<!-- Nombre de Usuario -->
						<div class="flex flex-col">
							<span class="font-medium">Nombre de Usuario:</span>
							<span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{
								selectedUser.nombre
							}}</span>
						</div>
						<!-- Cédula -->
						<div class="flex flex-col">
							<span class="font-medium">Cédula:</span>
							<span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{
								selectedUser.numero_documento
							}}</span>
						</div>
						<!-- Nombres -->
						<div class="flex flex-col">
							<span class="font-medium">Nombres:</span>
							<span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{
								selectedUser.nombre
							}}</span>
						</div>
						<!-- Apellidos -->
						<div class="flex flex-col">
							<span class="font-medium">Apellidos:</span>
							<span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{
								selectedUser.apellido
							}}</span>
						</div>
						<!-- Correo -->
						<div class="flex flex-col sm:col-span-2">
							<span class="font-medium">Correo:</span>
							<span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{
								selectedUser.correo
							}}</span>
						</div>
					</div>
				</div>

				<!-- Datos Laborales (con valores debajo de cada campo) -->
				<div>
					<h3 class="font-semibold text-black">Datos Laborales</h3>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<!-- Ubicación / Sede -->
						<div class="flex flex-col">
							<span class="font-medium">Ubicación / Sede:</span>
							<span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{
								selectedUser.sed_nombre
							}}</span>
						</div>
						<!-- Regional -->
						<div class="flex flex-col">
							<span class="font-medium">Regional:</span>
							<span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{
								selectedUser.regional
							}}</span>
						</div>
						<!-- Rol -->
						<div class="flex flex-col">
							<span class="font-medium">Rol:</span>
							<span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{
								selectedUser.rol
							}}</span>
						</div>
						<!-- Teléfonos -->
						<div class="flex flex-col sm:col-span-2">
							<span class="font-medium">Teléfono:</span>
							<span class="text-black bg-gray-100/50 rounded-lg p-2 w-64">{{
								selectedUser.telefono
							}}</span>
						</div>
						<!-- Celular -->
						<div class="flex flex-col">
							<span class="font-medium">Celular:</span>
							<span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{
								selectedUser.celular
							}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal para Editar Usuario -->
		<div
			v-if="showEditModal"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
			<div
				class="bg-white shadow-lg rounded-lg w-10/12 max-w-4xl p-6 relative bg-no-repeat bg-cover bg-center"
				:style="{
					backgroundImage: `url(${FondoImagen})`,
					backgroundSize: '50%',
					backgroundPosition: 'center',
				}">
				<div>
					<div class="flex items-center">
						<!-- Imagen de Usuario -->
						<div class="bg-customPurple rounded-full p-2 mr-2">
							<img :src="Usuario" alt="Usuario" class="w-8 h-8" />
						</div>
						<!-- Título -->
						<h2 class="text-xl font-bold text-black">DATOS DE USUARIO</h2>
					</div>
					<button
						@click="closeEditModal"
						class="absolute top-4 right-4 text-customPurple cursor-pointer font-bold hover:text-white hover:bg-customPurple border-none rounded-full p-2">
						✕
					</button>
				</div>

				<div>
					<form @submit.prevent="saveUser" class="space-y-3">
						<h3 class="font-semibold text-black text-sm">DATOS BASE</h3>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="flex flex-col">
								<label for="Nombre" class="font-medium">Nombre Completo:</label>
								<input
									v-model="selectedUser.nombre"
									type="text"
									class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg"
									required />
							</div>
							<!--cedula-->
							<div class="flex flex-col">
								<label for="Nombre" class="font-medium">Cedula:</label>
								<input
									v-model="selectedUser.numero_documento"
									type="cedula"
									class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg"
									required />
							</div>
						</div>

						<h3 class="font-semibold text-black text-sm">DATOS LABORALES</h3>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<!--Ubicación / Sede-->
							<div class="flex flex-col">
								<label for="sed_nombre" class="font-medium"
									>Ubicación / Sede:</label
								>
								<input
									v-model="selectedUser.sed_nombre"
									type="text"
									class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg"
									required />
							</div>
							<!--regional-->
							<div class="flex flex-col">
								<label for="regional" class="font-medium">Regional:</label>
								<input
									v-model="selectedUser.regional"
									type="text"
									class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg"
									required />
							</div>
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<!--rol-->
							<div class="flex flex-col">
								<label for="rol" class="font-medium">Rol:</label>
								<select
									v-model="selectedUser.rol"
									id="rol"
									class="w-full bg-gray-100/50 border-none px-3 h-11 bg-gray-100 rounded-lg"
									required>
									<option value="Administrador">Administrador</option>
									<option value="Funcionario">Funcionario</option>
									<option value="Operario">Operario</option>
								</select>
							</div>

							<!--email-->
							<div class="flex flex-col">
								<label for="Correo" class="font-medium">Correo:</label>
								<input
									v-model="selectedUser.correo"
									type="email"
									class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg"
									required />
							</div>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<!--telefono-->
							<div class="flex flex-col">
								<label for="Telefono" class="font-medium">Telefono:</label>
								<input
									v-model="selectedUser.telefono"
									type="telefono"
									class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg"
									required />
							</div>
							<!--celular-->
							<div class="flex flex-col">
								<label for="Celular" class="font-medium">Celular:</label>
								<input
									v-model="selectedUser.celular"
									type="celular"
									class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg"
									required />
							</div>
						</div>

						<!--permisos de usuario-->
						<!-- <h3 class="font-semibold text-black text-sm">
							PERMISOS DE USUARIO
						</h3>
						<div class="flex flex-row">
							<input
								type="checkbox"
								id="inicio"
								name="inicio"
								v-model="permisos.inicio" />
							<svg
								class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1"
								width="14"
								height="15"
								viewBox="0 0 14 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7 0.314453C3.15 0.314453 0 3.43139 0 7.24099C0 11.0506 3.15 14.1675 7 14.1675C10.85 14.1675 14 11.0506 14 7.24099C14 3.43139 10.85 0.314453 7 0.314453ZM7 2.04609C9.905 2.04609 12.25 4.36648 12.25 7.24099C12.25 10.1155 9.905 12.4359 7 12.4359C4.095 12.4359 1.75 10.1155 1.75 7.24099C1.75 4.36648 4.095 2.04609 7 2.04609ZM7 3.77772C6.51 3.77772 6.125 4.15868 6.125 4.64354C6.125 5.1284 6.51 5.50936 7 5.50936C7.49 5.50936 7.875 5.1284 7.875 4.64354C7.875 4.15868 7.49 3.77772 7 3.77772ZM4.095 5.50936C3.9501 5.55539 3.81985 5.63802 3.71709 5.74909C3.61433 5.86017 3.54263 5.99583 3.50906 6.14271C3.47548 6.28958 3.4812 6.44258 3.52565 6.5866C3.57009 6.73061 3.65173 6.86067 3.7625 6.96393L5.355 8.53972C5.32 8.67825 5.25 8.81678 5.25 8.97262C5.25 9.92502 6.0375 10.7043 7 10.7043C7.9625 10.7043 8.75 9.92502 8.75 8.97262C8.75 8.02023 7.9625 7.24099 7 7.24099C6.8425 7.24099 6.7025 7.31026 6.5625 7.34489L4.97 5.7691C4.87425 5.66425 4.75402 5.58418 4.6198 5.53588C4.48558 5.48759 4.34145 5.47253 4.2 5.49204C4.16503 5.48996 4.12997 5.48996 4.095 5.49204V5.50936ZM9.625 5.50936C9.135 5.50936 8.75 5.89032 8.75 6.37517C8.75 6.86003 9.135 7.24099 9.625 7.24099C10.115 7.24099 10.5 6.86003 10.5 6.37517C10.5 5.89032 10.115 5.50936 9.625 5.50936Z"
									fill="white" />
							</svg>
							<label for="inicio">Inicio</label>

							<input
								type="checkbox"
								v-model="permisos.mapa"
								id="mapa"
								name="mapa"
								value="Bike" />
							<svg
								class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1"
								width="14"
								height="15"
								viewBox="0 0 14 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M10.7054 6.9634L12.3593 6.17551C12.9797 6.04795 12.9768 6.74392 13.0657 7.16882C13.408 8.81401 13.7106 10.478 14 12.1297C13.9962 12.2826 13.8827 12.3745 13.773 12.4636L9.59054 14.2317L9.28794 14.2139L4.54563 12.5584L0.564539 14.228C0.270449 14.2833 0.0775414 14.1726 0 13.8894C0.293144 11.9881 0.72435 10.0962 1.07612 8.20058C1.11584 8.08709 1.20756 7.99423 1.3078 7.92951L3.31726 6.9634C3.10165 6.53756 2.93428 6.06858 2.87565 5.59115C2.59291 3.2875 4.38298 1.13768 6.71584 0.988545C9.93002 0.78313 12.1759 4.11292 10.7073 6.9634H10.7054ZM6.96359 3.54545C5.26147 3.54545 5.35603 5.13999 5.82884 6.45315L7.05816 6.64074L8.09834 6.35935C8.47659 5.42138 9.14704 3.54545 6.96359 3.54545ZM11.7863 7.67251L9.77589 8.38067L9.28794 9.01661L9.70591 12.8313L9.9896 12.7375L12.5428 11.7058L11.7863 7.67251ZM1.28983 13.0189L3.93759 11.7996L4.31584 8.42288L3.7617 7.71284L1.87707 8.64236L1.28983 13.0189ZM8.77636 9.73041L7.39669 11.5557C7.22269 11.7977 6.91348 11.8408 6.68747 11.6401L5.26147 9.6413L5.1669 11.611L9.13853 12.9242L8.77636 9.72947V9.73041Z"
									fill="white" />
								<path
									d="M6.8123 3.28939C8.13996 3.15526 9.16597 4.38025 8.77732 5.65119C8.39434 6.90432 6.81892 7.35548 5.81183 6.50193C4.60143 5.47579 5.22649 3.45072 6.81136 3.29033L6.8123 3.28939ZM7.01089 3.85686C5.32767 3.86999 5.38535 6.39312 7.04115 6.37437C8.69694 6.35561 8.67613 3.84373 7.01089 3.85686Z"
									fill="white" />
							</svg>
							<label for="mapa">Mapa</label>

							<input
								type="checkbox"
								v-model="permisos.busqueda"
								id="busqueda"
								name="busqueda" />
							<svg
								class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1"
								width="12"
								height="13"
								viewBox="0 0 12 13"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M3.99583 0.607928C7.37491 0.407182 9.63438 4.10712 7.88405 7.00407C7.78188 7.1729 7.50325 7.47444 7.44583 7.60547C7.4357 7.62899 7.42219 7.64747 7.43401 7.67434L8.27667 8.51428C8.60934 8.32026 8.93948 8.31018 9.25104 8.54872C9.99238 9.41302 11.0909 10.2042 11.7934 11.0753C12.4494 11.8892 11.4041 12.9248 10.5986 12.2638C9.71459 11.5389 8.9209 10.4764 8.04278 9.72044C7.84521 9.44746 7.82748 9.08796 8.00732 8.80154L7.13933 7.90953C5.04873 9.90523 1.54638 9.20135 0.362612 6.5799C-0.821162 3.95845 1.02458 0.784316 3.99583 0.607928ZM4.02623 1.46131C1.43409 1.6293 -0.0570284 4.56405 1.41804 6.71765C2.89312 8.87126 5.92516 8.68227 7.17986 6.51691C8.52575 4.19531 6.70281 1.28828 4.02623 1.46131Z"
									fill="white" />
								<path
									d="M4.1088 2.20786C6.12839 2.08552 6.51769 4.99113 4.53342 5.37492C2.26333 5.81388 1.81654 2.34618 4.1088 2.20786Z"
									fill="white" />
								<path
									d="M5.49442 5.09277C5.87483 5.25713 6.22438 5.6479 6.38622 6.05091C6.47799 6.27995 6.55223 6.41021 6.39623 6.61128C5.46021 7.82119 3.68328 7.99341 2.49949 7.08073C2.3877 6.99506 1.9906 6.63138 1.95139 6.51686C1.90384 6.37786 2.19416 5.85596 2.28509 5.72658C2.38019 5.5902 2.76227 5.17582 2.90159 5.13386C2.98418 5.10938 3.21026 5.32794 3.30537 5.38039C4.0128 5.77553 4.90878 5.66363 5.49525 5.09277H5.49442Z"
									fill="white" />
							</svg>
							<label for="busqueda">Busqueda del Ciudadano</label>

							<input
								type="checkbox"
								v-model="permisos.cargarArchivo"
								id="cargarArchivo"
								name="cargarArchivo" />
							<svg
								class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1"
								width="14"
								height="11"
								viewBox="0 0 14 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.33334 5.5979C9.33334 5.53077 9.31146 5.47563 9.26771 5.43247L6.70104 2.9007C6.65729 2.85755 6.60139 2.83597 6.53334 2.83597C6.46528 2.83597 6.40937 2.85755 6.36562 2.9007L3.80625 5.42528C3.75764 5.48282 3.73334 5.54036 3.73334 5.5979C3.73334 5.66503 3.75521 5.72018 3.79896 5.76333C3.84271 5.80649 3.89861 5.82807 3.96666 5.82807H5.6V8.35983C5.6 8.42217 5.62309 8.47611 5.66927 8.52167C5.71545 8.56722 5.77014 8.59 5.83334 8.59H7.23334C7.29653 8.59 7.35122 8.56722 7.3974 8.52167C7.44358 8.47611 7.46666 8.42217 7.46666 8.35983V5.82807H9.1C9.16319 5.82807 9.21788 5.80529 9.26406 5.75973C9.31025 5.71418 9.33334 5.66023 9.33334 5.5979ZM14 7.66935C14 8.43176 13.7266 9.08268 13.1797 9.62212C12.6328 10.1616 11.9729 10.4313 11.2 10.4313H3.26666C2.36736 10.4313 1.59809 10.116 0.958852 9.48547C0.319617 8.85492 0 8.09611 0 7.20903C0 6.58567 0.170138 6.01027 0.510414 5.48282C0.850695 4.95537 1.30764 4.55978 1.88125 4.29606C1.87153 4.1522 1.86666 4.04911 1.86666 3.98677C1.86666 2.97023 2.23125 2.10233 2.96041 1.38308C3.68958 0.663826 4.56944 0.304199 5.6 0.304199C6.35833 0.304199 7.05226 0.512783 7.68177 0.92995C8.31128 1.34712 8.76944 1.90094 9.05625 2.59142C9.40139 2.29413 9.80486 2.14549 10.2667 2.14549C10.7819 2.14549 11.2219 2.3253 11.5865 2.68493C11.951 3.04455 12.1333 3.4785 12.1333 3.98677C12.1333 4.3512 12.0337 4.68205 11.8344 4.97934C12.4663 5.12799 12.9852 5.45285 13.3911 5.95393C13.797 6.45501 14 7.02682 14 7.66935Z"
									fill="white" />
							</svg>
							<label for="cargarArchivo">Cargar Archivo</label>

							<input
								type="checkbox"
								v-model="permisos.generarReporte"
								id="generarReporte"
								name="generarReporte" />
							<svg
								class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1"
								width="11"
								height="10"
								viewBox="0 0 11 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0.6875 0.290527C0.3025 0.290527 0 0.589853 0 0.970812C0 1.35177 0.3025 1.6511 0.6875 1.6511C1.0725 1.6511 1.375 1.35177 1.375 0.970812C1.375 0.589853 1.0725 0.290527 0.6875 0.290527ZM2.75 0.290527V1.6511H11V0.290527H2.75ZM0.6875 3.01167C0.3025 3.01167 0 3.31099 0 3.69195C0 4.07291 0.3025 4.37224 0.6875 4.37224C1.0725 4.37224 1.375 4.07291 1.375 3.69195C1.375 3.31099 1.0725 3.01167 0.6875 3.01167ZM2.75 3.01167V4.37224H11V3.01167H2.75ZM0.6875 5.73281C0.3025 5.73281 0 6.03213 0 6.41309C0 6.79405 0.3025 7.09338 0.6875 7.09338C1.0725 7.09338 1.375 6.79405 1.375 6.41309C1.375 6.03213 1.0725 5.73281 0.6875 5.73281ZM2.75 5.73281V7.09338H11V5.73281H2.75ZM0.6875 8.45395C0.3025 8.45395 0 8.75327 0 9.13423C0 9.51519 0.3025 9.81452 0.6875 9.81452C1.0725 9.81452 1.375 9.51519 1.375 9.13423C1.375 8.75327 1.0725 8.45395 0.6875 8.45395ZM2.75 8.45395V9.81452H11V8.45395H2.75Z"
									fill="white" />
							</svg>
							<label for="generarReporte">Generar Reportes</label>

							<input
								type="checkbox"
								v-model="permisos.listarUsuarios"
								id="listarUsuarios"
								name="listarUsuarios" />
							<svg
								class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1"
								width="11"
								height="12"
								viewBox="0 0 11 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.10993 9.72276C6.10585 9.71916 6.10559 9.71856 6.10559 9.71317C6.10559 9.65648 6.10789 9.59889 6.10814 9.54191C6.10865 9.41773 6.11197 9.31516 6.13393 9.19249C6.22072 8.7054 6.52679 8.2918 6.92502 8.12414C7.20047 8.2792 7.52339 8.2795 7.79858 8.12354C8.20319 8.2954 8.51105 8.7189 8.59299 9.21588C8.61903 9.37334 8.61061 9.50261 8.61469 9.65948C8.6152 9.67957 8.62669 9.70627 8.6129 9.72246H6.10993V9.72276Z"
									fill="white" />
								<path
									d="M7.32285 6.70192C7.88611 6.66974 8.26568 7.27414 7.98766 7.76213C7.73852 8.19895 7.11456 8.249 6.79998 7.85374C6.43914 7.40038 6.74356 6.73498 7.32285 6.70192Z"
									fill="white" />
								<path
									d="M5.88116 0.304199V1.25189H7.9014V3.14727H2.5141V1.25189H4.53434V0.304199H5.88116Z"
									fill="white" />
								<path
									d="M3.71009 4.74561H8.31884C8.38479 4.75881 8.41415 4.78619 8.42621 4.82557C8.44632 4.8892 8.44511 5.34351 8.41938 5.39634C8.40771 5.41963 8.38157 5.43716 8.34739 5.44941L3.71049 5.45637C3.6747 5.45013 3.63811 5.43332 3.62162 5.41339C3.58944 5.37401 3.58301 4.88872 3.60272 4.82557C3.61518 4.78619 3.64454 4.75881 3.71009 4.74561Z"
									fill="white" />
								<path
									d="M3.65302 6.88037H6.04274C6.07694 6.89358 6.09216 6.92095 6.09841 6.96033C6.10884 7.02397 6.10821 7.47828 6.09487 7.53111C6.08882 7.5544 6.07527 7.57193 6.05754 7.58418L3.65323 7.59114C3.63467 7.5849 3.61569 7.56809 3.60714 7.54816C3.59046 7.50878 3.58712 7.02349 3.59734 6.96033C3.60381 6.92095 3.61903 6.89358 3.65302 6.88037Z"
									fill="white" />
								<path
									d="M3.63546 9.01123H5.3424C5.36683 9.02444 5.3777 9.05181 5.38217 9.09119C5.38962 9.15482 5.38917 9.60914 5.37964 9.66197C5.37532 9.68526 5.36563 9.70279 5.35297 9.71504L3.63561 9.722C3.62235 9.71575 3.60879 9.69895 3.60269 9.67902C3.59077 9.63964 3.58839 9.15434 3.59569 9.09119C3.6003 9.05181 3.61118 9.02444 3.63546 9.01123Z"
									fill="white" />
								<path
									d="M2.30893 4.57167C3.00116 4.51969 3.09021 5.58472 2.38773 5.63416C1.66006 5.68557 1.56808 4.62729 2.30893 4.57167Z"
									fill="white" />
								<path
									d="M2.30823 6.70262C3.00908 6.64924 3.08357 7.71593 2.38711 7.76509C1.67248 7.81538 1.55753 6.75965 2.30823 6.70262Z"
									fill="white" />
								<path
									d="M2.30431 8.83664C2.87451 8.79321 3.11112 9.60687 2.564 9.84447C1.7864 10.1821 1.4347 8.90276 2.30431 8.83664Z"
									fill="white" />
								<path
									d="M2.04717 1.72705V2.57109H1.02359V11.0115H9.21228V2.57109H8.18869V1.72705H10.2359V11.8555H0V1.72705H2.04717Z"
									fill="white" />
							</svg>
							<label for="listarUsuarios">Lista de Usuarios</label>

							<input
								type="checkbox"
								v-model="permisos.lineaTiempo"
								id="lineaTiempo"
								name="lineaTiempo" />
							<svg
								class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1"
								width="12"
								height="13"
								viewBox="0 0 12 13"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.1463 4.75055C11.1601 4.76933 11.4405 4.92512 11.5214 5.00123C12.1654 5.6072 12.1589 6.75437 11.5055 7.34868C11.4241 7.42285 11.1886 7.55208 11.1551 7.61037C11.0728 7.75223 10.9567 8.30638 10.8703 8.52727C10.2604 10.0877 8.96916 11.3524 7.48745 11.8279C7.11092 11.9487 6.76438 11.9652 6.39961 12.0543C6.13331 12.1194 6.09833 12.2518 5.7609 12.1259C5.10102 11.8794 5.43992 11.0214 6.14977 11.1468C6.28292 11.1704 6.39373 11.2893 6.50895 11.3019C7.24055 11.3839 8.60616 10.5291 9.14052 9.98957C13.0101 6.08071 8.9092 -0.924093 4.0267 1.47227C1.88394 2.5239 0.80227 5.23506 1.46832 7.70559C0.208822 7.78753 -0.48515 6.08945 0.394293 5.08122C0.47777 4.98536 0.721145 4.84836 0.764059 4.77613C0.829018 4.66731 0.891038 4.29582 0.946591 4.13518C2.65522 -0.821748 8.96622 -1.01931 10.8703 3.84013C10.9297 3.99203 11.1193 4.71298 11.1463 4.75055Z"
									fill="white" />
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M8.43941 7.82438C9.58717 5.49342 7.90405 2.73463 5.53225 2.9563C3.49315 3.14692 2.2171 5.64088 3.14399 7.71394C4.20716 10.0919 7.29088 10.157 8.43941 7.82438ZM9.07315 8.19621C10.4912 5.31624 8.41277 1.89883 5.47088 2.17378C2.90581 2.41357 1.35883 5.51191 2.49741 8.05842C3.81818 11.0126 7.64754 11.0915 9.07315 8.19621Z"
									fill="white" />
								<path
									d="M7.41182 7.38031C7.11755 8.84019 4.50816 8.82744 4.23535 7.354C5.25888 7.72701 6.38384 7.75066 7.41182 7.38031Z"
									fill="white" />
							</svg>

							<label for="lineaTiempo">Linea de Tiempo</label>

							<input
								type="checkbox"
								v-model="permisos.lineaTiempo"
								id="rolespermisos"
								name="rolespermisos" />
							<label for="lineaTiempo">Roles y Permisos</label>
						</div>-->
						<button
							type="submit"
							class="w-full bg-customPurple cursor-pointer text-amarillo border-none font-bold py-2 rounded-lg">
							Guardar Cambios
						</button>
					</form>
				</div>
			</div>
		</div>

		<!-- Modal para Confirmar Eliminación -->
		<div
			v-if="showDeleteModal"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
			<div class="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 relative">
				<button
					@click="closeDeleteModal"
					class="absolute top-4 right-4 text-customPurple border-none rounded-full p-2 font-bold hover:bg-customPurple hover:text-white">
					✕
				</button>
				<div class="text-center">
					<img :src="DeleteSucess" class="" alt="" />
					<h2 class="text-xl font-bold mb-0 text-black">¿Estás seguro que</h2>
					<h2 class="text-xl font-bold mb-4 mt-0 text-black">
						deseas eliminar este usuario?
					</h2>
					<div class="flex justify-center space-x-4">
						<button
							@click="openModal"
							class="bg-amarillo text-customPurple cursor-pointer border-none font-bold py-2 px-6 rounded-lg hover:bg-yellow-600">
							Aceptar
						</button>
						<!-- Modal de confirmación -->

						<ModalConfirmacionEliminar v-if="isModalOpen" @click="deleteUser" />

						<button
							@click="closeDeleteModal"
							class="bg-customPurple text-amarillo cursor-pointer border-none font-bold py-2 px-6 rounded-lg hover:bg-gray-400">
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import ListaUsuarios from "@/assets/images/ListaUsuarios.svg";
import IconoEditar from "@/assets/images/IconoEditar.svg";
import IconoEliminar from "@/assets/images/IconoEliminar.svg";
import IconoVisualizar from "@/assets/images/IconoVisualizar.svg";
import RegistroUsuario from "@/assets/images/RegistroUsuario.svg";
import DeleteSucess from "@/assets/images/delete-success.png";
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
	background-color: #F2F3F3;
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
	background: #71277A;
	border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
	background: #5a1f62;
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
	outline: 2px solid #71277A;
	outline-offset: 2px;
	border-color: #71277A;
}

/* Radio buttons personalizados */
input[type="radio"]:checked {
	background-color: #71277A;
	border-color: #71277A;
}
</style>
