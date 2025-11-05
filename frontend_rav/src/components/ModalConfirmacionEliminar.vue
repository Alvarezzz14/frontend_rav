<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur"
  >
    <div class="bg-white shadow-lg rounded-lg w-4/12 max-w-lg p-6 relative">
      <!-- Encabezado del modal -->

      <!-- Contenido del modal -->
      <div class="p-6 text-center">
        <img
          :src="deleteConfirm"
          alt="Ilustración"
          class="mx-auto mb-3 w-10/12 h-64"
        />
        <p class="text-lg font-bold mb-4">¡Usuario eliminado correctamente!</p>
        <button
          @click="closeModal"
          class="bg-amarillo cursor-pointer text-customPurple border-none font-bold py-2 px-4 rounded"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import deleteConfirm from "@/assets/images/delete-confirm.png";
const emit = defineEmits(["close"]);
const closeModal = () => {
  // Emitir un evento para cerrar el modal en el padre
  emit("close");
};
</script>

<style scoped>
/* Opcional: Puedes agregar estilos personalizados si no usas Tailwind */
</style>
