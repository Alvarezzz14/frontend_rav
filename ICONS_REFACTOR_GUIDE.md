# Guía de Refactorización de Iconos en SidebarLeft.vue

## ✅ Iconos convertidos a componentes Vue

Se han creado 12 componentes de iconos en `src/components/Icons/`:

1. **IconDashboard.vue** - Icono de inicio/dashboard
2. **IconMap.vue** - Icono de mapa
3. **IconSearch.vue** - Icono de búsqueda
4. **IconProfile.vue** - Icono de perfil (submenú)
5. **IconRoute.vue** - Icono de ruta de atención (submenú)
6. **IconTimeline.vue** - Icono de línea de tiempo (submenú)
7. **IconActivity.vue** - Icono de actividad (submenú)
8. **IconUpload.vue** - Icono de cargar archivo
9. **IconReports.vue** - Icono de reportes
10. **IconUsers.vue** - Icono de usuarios
11. **IconRoles.vue** - Icono de roles y permisos
12. **IconAttention.vue** - Icono de líneas de atención

## 📦 Exportación centralizada

Todos los iconos se exportan desde `src/components/Icons/index.js`:

\`\`\`js
import { IconDashboard, IconMap, IconSearch, ... } from '@/components/Icons'
\`\`\`

## 🎨 Props disponibles en cada icono

Todos los componentes de iconos aceptan las siguientes props:

- **size**: Tamaño del icono (String | Number, default: varía por icono)
- **color**: Color del icono (String, default: 'currentColor')
- **className**: Clases CSS adicionales (String, default: '')

## 📝 Cómo usarlos en SidebarLeft.vue

### Antes (String HTML inline):
\`\`\`vue
<template>
  <span v-html="item.icon" class="..."></span>
</template>

<script setup>
const menuItems = ref([
  {
    title: "Inicio",
    icon: \`<svg width="34"...>...</svg>\`
  }
])
</script>
\`\`\`

### Después (Componente Vue):
\`\`\`vue
<template>
  <component 
    :is="item.iconComponent" 
    :color="isActive(item) ? '#71277A' : 'white'"
    :size="34"
    class="transition-colors duration-200"
  />
</template>

<script setup>
import {
  IconDashboard,
  IconMap,
  IconSearch,
  IconProfile,
  IconRoute,
  IconTimeline,
  IconActivity,
  IconUpload,
  IconReports,
  IconUsers,
  IconRoles,
  IconAttention
} from '@/components/Icons'

const menuItems = ref([
  {
    title: "Inicio",
    to: { name: "HomePage" },
    iconComponent: IconDashboard  // ← Componente directo
  },
  {
    title: "Mapa",
    to: { name: "DepartamentosPage" },
    iconComponent: IconMap
  },
  {
    title: "Búsqueda del Ciudadano",
    to: { name: "BusquedaCiudadanoPage" },
    iconComponent: IconSearch,
    submenuOpen: false,
    submenu: [
      {
        title: "Perfil de la Víctima",
        to: { name: "PerfilCiudadanoPage" },
        iconComponent: IconProfile
      },
      {
        title: "Ruta de Atención",
        to: { name: "RutaAtencionPage" },
        iconComponent: IconRoute
      }
      // ... más items
    ]
  }
  // ... resto de items
])
</script>
\`\`\`

## 🚀 Beneficios de esta refactorización

1. **Performance**: Los componentes se cargan solo una vez, no se re-parsean strings HTML
2. **Mantenibilidad**: Modificar un icono afecta automáticamente todas sus instancias
3. **Type safety**: Validación de props en tiempo de desarrollo
4. **Reusabilidad**: Usar los iconos en cualquier otro componente fácilmente
5. **Control dinámico**: Cambiar color, tamaño vía props sin tocar el SVG
6. **Tree-shaking**: Solo se empaquetan los iconos que realmente uses

## ⚡ Optimización adicional

### Lazy loading (para iconos poco usados):
\`\`\`vue
<script setup>
import { defineAsyncComponent } from 'vue'

const IconRarelyUsed = defineAsyncComponent(() => 
  import('@/components/Icons/IconRarelyUsed.vue')
)
</script>
\`\`\`

## 📊 Comparación de tamaño

- **Antes**: ~15KB de strings HTML repetidas en menuItems
- **Después**: ~8KB de componentes Vue reutilizables + mejor compresión gzip

