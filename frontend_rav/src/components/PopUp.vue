<template>
	<div v-if="isOpen" class="fixed inset-0 backdrop-blur-3xl bg-black bg-opacity-60 flex items-center justify-center">
		<div class="relative bg-white p-6 rounded shadow-lg w-1/2">
			<!-- Botón para cerrar -->
			<button
				@click="closeModal"
				class="absolute top-2 right-2 bg-white text-azulBarraApe font-bold rounded-full w-8 h-8 flex items-center justify-center">
				X
			</button>

			<div class="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50">
				<!-- Imagen seleccionada -->
				<div class="flex flex-grow space-x-3">
					<img v-if="image" :src="image" alt="Selected" class="h-8 mb-4 rounded-md" />
					<div class="w-px h-12 bg-gray-300"></div>
					<div class="w-full h-20 -space-y-5">
						<h3 v-if="sede">{{ sede }}</h3>
						<h3 v-if="departamento">({{ departamento }})</h3>
					</div>
				</div>
				<!-- Tabla de datos -->
				<table class="min-w-full text-xs">
					<thead class="rounded-t-lg dark:bg-gray-300">
						<tr class="text-left bg-slate-100 w-full">
							<th class="p-3">CIUDAD</th>
							<th class="p-3">CONTACTO</th>
							<th class="p-3">DIRECCIÓN</th>
							<th class="p-3">HORARIO</th>
							<th class="p-3">TELÉFONO</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in data"
							:key="index"
							class="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
							<td class="py-2">{{ item.ciudad }}</td>
							<td class="py-2">{{ item.contacto }}</td>
							<td class="py-2">{{ item.direccion }}</td>
							<td class="py-2">{{ item.horario }}</td>
							<td class="py-2">{{ item.telefono }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['isOpen', 'image', 'sede', 'departamento'],
	emits: ['close'],
	data() {
		return {
			data: [],
		};
	},
	watch: {
		isOpen(newVal) {
			if (newVal) {
				this.fetchData();
			}
		},
	},
	methods: {
		fetchData() {
			// Datos quemados para prueba
			this.data = [
				{
					ciudad: 'Ciudad 1',
					contacto: 'contacto1@example.com',
					direccion: 'Dirección 1',
					horario: '08:00 - 17:00',
					telefono: '123-456-7890',
				},
				{
					ciudad: 'Ciudad 2',
					contacto: 'contacto2@example.com',
					direccion: 'Dirección 2',
					horario: '09:00 - 18:00',
					telefono: '098-765-4321',
				},
				{
					ciudad: 'Ciudad 3',
					contacto: 'contacto3@example.com',
					direccion: 'Dirección 3',
					horario: '07:30 - 16:30',
					telefono: '456-789-0123',
				},
			];
		},
		closeModal() {
			this.$emit('close');
		},
	},
};
</script>

