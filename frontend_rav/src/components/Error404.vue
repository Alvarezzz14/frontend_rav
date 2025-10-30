<template>
  <div
    class="min-h-screen flex flex-col bg-[#F5F5F5] relative bg-no-repeat bg-bottom bg-contain"
    style="background-image: url('src/assets/images/plantas.png')"
  >
    <!-- Contenido centrado -->
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center rounded-md mb-12">
        <!-- Mensaje de error -->
        <h1 class="text-negro font-bold text-6xl m-0">Oops...</h1>
        <!-- Imágenes de los personajes -->
        <div>
          <img :src="characterImage" alt="404 con personajes" class="w-full" />
        </div>
        <!-- Mensaje de texto -->
        <h2 class="text-[60px] font-bold text-negro mt-1 mb-6">
          Página no encontrada
        </h2>
        <!-- Botón -->
        <button
          @click="goHome"
          class="bg-amarillo text-customPurple w-[400px] h-[50px] text-[24px] font-semibold shadow -mt-10 border-none rounded-[50px] cursor-pointer"
        >
          Regresar a la página de inicio
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="w-full h-12">
      <Footer />
    </footer>
  </div>
  
</template>

<script setup>
import { useRouter } from "vue-router";
import characterImage from "@/assets/images/error.webp";
import Footer from "@/components/Footer.vue";

const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
/* No additional CSS needed as everything is styled with Tailwind CSS */
</style>
