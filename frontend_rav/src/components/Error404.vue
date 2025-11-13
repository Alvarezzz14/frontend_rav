<template>
  <div
    class="min-h-screen flex flex-col bg-backgroundApp relative bg-no-repeat bg-bottom bg-contain error404-bg"
  >
    <!-- Contenido centrado -->
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center rounded-md mb-12">
        <!-- Logo RAV Mobile -->
        <div class="mx-auto sm:mb-6 mb-24 w-[128px] h-[54px]">
          <LogoRavMobile class="w-[128px] h-[54px] mx-auto" />
        </div>
        <!-- Mensaje de error -->
        <h1 class="text-azul2Ape font-bold text-[36px] sm:mb-0 mb-12 sm:text-6xl m-0">
          Oops...
        </h1>
        <!-- Imágenes de los personajes -->
        <div>
          <img
            :src="characterImage"
            alt="404 con personajes"
            class="mx-auto w-[368px] h-[198px] sm:mb-0 mb-14 object-contain sm:w-full sm:h-auto"
          />
        </div>
        <!-- Mensaje de texto -->
        <h2
          class="text-[32px] sm:text-[60px] font-bold text-azul2Ape mt-1 mb-6"
        >
          Página no encontrada
        </h2>
        <!-- Botón -->
        <button
          @click="goHome"
          class="bg-amarillo mt-2 text-azul2Ape w-[340px] h-[40px] text-[18px] sm:w-[400px] sm:h-[50px] sm:text-[24px] font-bold sm:font-semibold shadow border-none rounded-[50px] cursor-pointer"
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
import characterImage from "@/assets/images/404.webp";
import Footer from "@/components/Footer.vue";
import LogoRavMobile from "@/components/Icons/LogoRavMobile.vue";

const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
/* No additional CSS needed as everything is styled with Tailwind CSS */
/* Background responsive: mobile uses plantasMobile.svg, from sm uses plantas.svg */
.error404-bg {
  background-image: url("@/assets/images/plantasMobile.svg");
}
@media (min-width: 640px) {
  .error404-bg {
    background-image: url("@/assets/images/plantas.svg");
  }
}
</style>
