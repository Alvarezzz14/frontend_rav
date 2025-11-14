<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Galería de Iconos SVG</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
      <div
        v-for="icon in icons"
        :key="icon.name"
        class="flex flex-col items-center gap-2"
      >
        <component :is="icon.component" :size="40" />
        <span class="text-xs text-center break-all">{{ icon.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Cargar automáticamente todos los .vue dentro de Icons y mostrarlos.
// Esto evita editar este archivo cada vez que se agregan nuevos iconos.
const modules = import.meta.glob('@/components/Icons/*.vue', { eager: true });

const normalizeName = (path) => {
  const file = path.split('/').pop() || '';
  return file.replace(/\.vue/gi, '');
};

const icons = Object.entries(modules)
  .map(([path, mod]) => ({ name: normalizeName(path), component: mod.default }))
  // Opcional: ordenar alfabéticamente
  .sort((a, b) => a.name.localeCompare(b.name));
</script>

<style scoped>
.grid { justify-items: center; }
</style>
