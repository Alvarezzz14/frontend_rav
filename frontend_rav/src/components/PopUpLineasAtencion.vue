<template>
	<div
		v-if="props.isOpen"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
		<div
			class="relative bg-white rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-hidden">
			<!-- Botón para cerrar -->
			<button
				@click="closeModal"
				aria-label="Cerrar"
				class="absolute top-2 cursor-pointer right-2 bg-white border-2 border-customPurple text-customPurple hover:bg-customPurple hover:text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple transition-all duration-200"
				tabindex="0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 h-5"
					viewBox="0 0 24 24"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M6.225 6.225a.75.75 0 011.06 0L12 10.94l4.715-4.715a.75.75 0 111.06 1.06L13.06 12l4.715 4.715a.75.75 0 01-1.06 1.06L12 13.06l-4.715 4.715a.75.75 0 01-1.06-1.06L10.94 12 6.225 7.285a.75.75 0 010-1.06z"
						clip-rule="evenodd" />
				</svg>
			</button>

			<div class="p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
				<!-- Imagen y título -->
				<div class="flex flex-col sm:flex-row items-center gap-4 mb-4">
					<img
						v-if="props.image"
						:src="props.image"
						alt="Selected"
						class="h-20 w-auto rounded-md" />
					<div class="text-center sm:text-left">
						<h3 v-if="props.sede" class="text-lg font-semibold">
							{{ props.sede }}
						</h3>
						<h3 v-if="props.departamento" class="text-sm text-gray-600">
							({{ props.departamento }})
						</h3>
					</div>
				</div>

				<!-- Tabla con datos -->
				<div class="overflow-x-auto">
					<table class="w-full text-sm text-left">
						<thead class="bg-gray-100">
							<tr>
								<th class="p-2">CIUDAD</th>
								<th class="p-2">CONTACTO</th>
								<th class="p-2">DIRECCIÓN</th>
								<th class="p-2">HORARIO</th>
								<th class="p-2">TELÉFONO</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(item, index) in props.data.data"
								:key="index"
								class="border-b">
								<td class="py-2 px-2">{{ item.Ciudad }}</td>
								<td class="py-2 px-2">{{ item.Contacto }}</td>
								<td class="py-2 px-2">{{ item.Direccion }}</td>
								<td class="py-2 px-2">{{ item.HorarioAtencion }}</td>
								<td class="py-2 px-2">{{ item.Telefono }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
	image: {
		type: String,
		default: null,
	},
	sede: {
		type: String,
		default: null,
	},
	departamento: {
		type: String,
		default: null,
	},
	data: {
		type: Object,
		required: true,
	},
});

const emits = defineEmits(["close"]);

const closeModal = () => {
	emits("close");
};
</script>
