<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur"
  >
    <div class="bg-white w-[530px] h-[410px] shadow-lg rounded-lg relative">
      <button
        @click="closeModal"
        class="absolute -top-2 -right-2 bg-rojo-gradian rounded-full border-none cursor-pointer flex items-center justify-center hover:opacity-90"
        style="width: 20px; height: 20px"
        aria-label="Cerrar"
        type="button"
      >
        <CloseXIcon :width="7" :height="8" color="white" />
      </button>
      <!-- Encabezado del modal -->

      <!-- Contenido del modal -->
      <div class="text-center">
        <img
          :src="deleteConfirm"
          alt="Ilustración"
          class="mx-auto h-[305px]"
        />
        <p class="font-bold m-0 text-2xl text-azul2Ape">¡Usuario eliminado correctamente!</p>
        <div class="flex justify-center mt-2">
          <button
            @click="closeModal"
            class="bg-amarillo w-[247px] h-[43px] cursor-pointer text-azul2Ape border-none rounded-full font-work-sans font-bold text-[20px] leading-[100%] text-center flex items-center justify-center"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import deleteConfirm from "@/assets/images/delete-confirm.webp";
import CloseXIcon from "@/components/Icons/CloseXIcon.vue";
const emit = defineEmits(["close"]);
const closeModal = () => {
  // Emitir un evento para cerrar el modal en el padre
  emit("close");
};
</script>

<style scoped>
/* Opcional: Puedes agregar estilos personalizados si no usas Tailwind */
</style>
