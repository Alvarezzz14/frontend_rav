<template>
    <a :href="href" class="flex items-center text-lg no-underline text-black hover:text-white hover:bg-customPurple p-2 rounded">
      <span :class="`pi pi-${icon} mr-3`"></span>
      {{ text }}
    </a>
  </template>
  
  <script setup>
  defineProps({
    href: String,
    icon: String,
    text: String,
  });
  </script>
  
  <style scoped>
  /* Estilos específicos para NavItem, si son necesarios */
  </style>
  