<template>
    <div class="h-screen flex flex-col">
      <!-- Contenedor que coloca el sidebar y el contenido principal -->
      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="w-64 bg-white text-customPurple p-8 z-20">
          <!-- Logo centrado -->
          <div class="flex justify-center items-center mb-10">
            <LogoPage />
          </div>
  
          <!-- Menú de navegación -->
          <nav class="space-y-4">
            <NavItems href="#" icon="objects-column" text="Inicio" />
            <NavItems href="#" icon="users" text="Sobre nosotros" />
            <NavItems href="#" icon="services" text="Servicios" />
            <NavItems href="#" icon="envelope" text="Contacto" />
          </nav>
  
          <!-- Perfil de usuario -->
          <ProfileUser />
          <button class="bg-customPurple text-sm md:text-base text-center text-white px-4 py-2 rounded-md hover:bg-purple-600 transition">Cerrar Sesion</button>
        </aside>
        
        <!-- Contenido principal -->
        <main class="flex-1 p-6">
          <!-- Aquí va el contenido principal -->
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import LogoPage from './LogoPage.vue';
  import ProfileUser from './ProfileUser.vue';
  import NavItems from './NavItems.vue'; // Componente NavItem reutilizable
  </script>
  
  <style scoped>
  /* Puedes añadir estilos adicionales aquí si es necesario */
  </style>