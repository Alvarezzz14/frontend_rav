<template>
  <div
    ref="root"
    class="relative"
    :class="{ 'rav-open': dropdownOpen, 'no-shadow': !withShadow }"
    :style="{ '--rav-select-overlay-w': overlayWidth, '--rav-select-bg': bgColor, '--rav-select-h': height, '--rav-select-overlay-overlap': overlayOverlap, '--rav-select-overlay-z': overlayZIndex, '--rav-select-overlay-br': overlayBorderRadius }"
  >
    <Select
      v-model="model"
      :options="options"
      :placeholder="placeholder"
      class="!border-0 !rounded-[30px] !shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
      :class="inputClass"
      @change="onChange"
      @show="onShow"
      @hide="onHide"
    >
      <!-- Valor seleccionado -->
      <template #value="slotProps">
        <div
          v-if="slotProps.value"
          class="flex gap-2 items-center font-work-sans font-bold text-[18px] leading-[18px] tracking-normal text-azulApe"
        >
          <img
            v-if="showImage && imageOf(slotProps.value)"
            :src="imageOf(slotProps.value)"
            :alt="labelOf(slotProps.value)"
            class="w-6 h-6 rounded-full object-cover"
          />
          <div>{{ labelOf(slotProps.value) }}</div>
        </div>
        <span v-else class="font-work-sans font-normal text-[18px] leading-[21px] text-black">
          {{ slotProps.placeholder }}
        </span>
      </template>

      <!-- Icono del dropdown -->
      <template #dropdownicon>
        <span v-if="dropdownOpen">
          <IconDropdownArrowUp class="ml-2 mr-[20px]" />
        </span>
        <span v-else>
          <IconDropdownArrow class="ml-2 mr-[20px]" />
        </span>
      </template>

      <!-- Opción -->
      <template #option="slotProps">
        <div class="flex items-center gap-2 font-work-sans font-normal text-[18px] text-black">
          <img
            v-if="showImage && imageOf(slotProps.option)"
            :src="imageOf(slotProps.option)"
            :alt="labelOf(slotProps.option)"
            class="w-6 h-6 rounded-full object-cover"
          />
          <p class="m-[0px]">{{ labelOf(slotProps.option) }}</p>
        </div>
      </template>
    </Select>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import Select from 'primevue/select'
import IconDropdownArrow from '@/components/Icons/IconDropdownArrow.vue'
import IconDropdownArrowUp from '@/components/Icons/IconDropdownArrowUp.vue'

const props = defineProps({
  modelValue: { type: [String, Number, Object, Array, Boolean, null], default: null },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Seleccione' },
  optionLabel: { type: String, default: 'name' },
  optionImage: { type: String, default: 'flagUrl' },
  showImage: { type: Boolean, default: true },
  // Clases para ancho/alto del input (ej: 'w-[520px] h-10' o 'w-[750px] h-10')
  inputClass: { type: String, default: 'w-[520px] h-10' },
  // Ancho del overlay:
  // - 'trigger' (por defecto): iguala el ancho al del select visible
  // - cualquier valor CSS (ej. '520px', '36rem', '100%'): forza ese ancho
  overlayWidth: { type: String, default: 'trigger' },
  // Controla si el select muestra sombra. Útil para pantallas como BusquedaCiudadano.
  withShadow: { type: Boolean, default: true },
  // Color de fondo del select (por defecto blanco para BusquedaDepartamento)
  bgColor: { type: String, default: '#FFFFFF' },
  // Altura del Select (por defecto 40px). Ejemplo: '50px'
  height: { type: String, default: '40px' },
  // Solapamiento del overlay por detrás del Select (visible ~20px). Ej: '20px'
  overlayOverlap: { type: String, default: '30px' },
  // Z-index del overlay (override del inline style de PrimeVue)
  overlayZIndex: { type: [String, Number], default: 10 },
  // Padding top específico del overlay cuando está abierto (para variantes de diseño)
  // Por defecto se calcula como (16px + overlap)
  overlayPaddingTop: { type: String, default: '' },
  // Padding bottom opcional del overlay
  overlayPaddingBottom: { type: String, default: '20px' },
  overlayBorderRadius: { type: String, default: '25px' }
})

const emit = defineEmits(['update:modelValue', 'change', 'open', 'close'])

const root = ref(null)
const dropdownOpen = ref(false)

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function labelOf(item) {
  if (item == null) return ''
  return typeof item === 'string' ? item : item?.[props.optionLabel] ?? ''
}
function imageOf(item) {
  if (item == null) return null
  return typeof item === 'object' ? item?.[props.optionImage] ?? null : null
}

function onChange(e) {
  emit('change', e)
  // Al seleccionar una opción, el overlay se cierra; sincronizamos el icono
  dropdownOpen.value = false
}

function positionOverlay() {
  try {
    const overlay = document.querySelector('.p-select-overlay')
    const selectEl = root.value?.querySelector('.p-select')
    if (!overlay || !selectEl) return

    const cs = getComputedStyle(root.value)
    const overlap = parseInt(String(cs.getPropertyValue('--rav-select-overlay-overlap')).replace('px', '')) || 20
    const rect = selectEl.getBoundingClientRect()

    overlay.style.position = 'absolute'
    overlay.style.marginTop = '0px'
    // Calcular paddingTop: usar prop si viene, si no => 16px + overlap
    const overlapPx = Math.max(0, overlap)
    const autoPadTop = `${16 + overlapPx}px`
    const padTop = props.overlayPaddingTop && String(props.overlayPaddingTop).trim().length > 0
      ? String(props.overlayPaddingTop)
      : autoPadTop
    overlay.style.paddingTop = padTop
    if (props.overlayPaddingBottom) overlay.style.paddingBottom = String(props.overlayPaddingBottom)
    overlay.style.zIndex = String(props.overlayZIndex ?? 1)
    overlay.style.top = `${window.scrollY + rect.top + rect.height - overlap}px`
  // Forzar el borde redondeado del overlay para evitar que otros estilos lo reduzcan a 6px
  overlay.style.borderRadius = String(props.overlayBorderRadius || '25px')
    // Ajustar el ancho del overlay para que coincida con el ancho visual del trigger
    // 1) Por defecto igualamos el ancho al del select (rect.width)
    overlay.style.width = `${rect.width}px`
    overlay.style.minWidth = `${rect.width}px`
    // 2) Si el consumidor especifica overlayWidth:
    //    - 'trigger': mantener el ancho calculado
    //    - otro valor CSS: forzar ese ancho explícito
    if (props.overlayWidth && props.overlayWidth !== 'trigger') {
      overlay.style.width = String(props.overlayWidth)
      overlay.style.minWidth = String(props.overlayWidth)
    }
  } catch (e) {
    // noop
  }
}

function onShow() {
  dropdownOpen.value = true
  nextTick(() => {
    positionOverlay()
    window.addEventListener('scroll', positionOverlay, { passive: true })
    window.addEventListener('resize', positionOverlay)
  })
  emit('open')
}

function onHide() {
  dropdownOpen.value = false
  window.removeEventListener('scroll', positionOverlay)
  window.removeEventListener('resize', positionOverlay)
  emit('close')
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdownOnClickOutside(e) {
  const select = root.value?.querySelector('.p-select')
  const overlay = document.querySelector('.p-select-overlay')
  if (
    dropdownOpen.value &&
    select &&
    !select.contains(e.target) &&
    (!overlay || !overlay.contains(e.target))
  ) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  const selectEl = root.value?.querySelector('.p-select')
  if (selectEl) selectEl.addEventListener('click', toggleDropdown)
  document.addEventListener('click', closeDropdownOnClickOutside)
})

onUnmounted(() => {
  const selectEl = root.value?.querySelector('.p-select')
  if (selectEl) selectEl.removeEventListener('click', toggleDropdown)
  document.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>

<style scoped>
:deep(.p-select) {
  border: none !important;
  border-radius: 30px !important;
  background: var(--rav-select-bg, #FFFFFF) !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  height: var(--rav-select-h, 40px) !important;
}

/* Borde morado SOLO cuando el dropdown está abierto */
.rav-open :deep(.p-select) {
  border: 1.4px solid #005DCA !important;
  position: relative !important;
  z-index: 2000 !important; /* Asegura que el select quede por encima del overlay en el borde superior */
}

/* Sin sombra cuando se usa withShadow=false */
.no-shadow :deep(.p-select) {
  box-shadow: none !important;
}

:deep(.p-select:not(.p-disabled):hover) {
  border-color: transparent !important;
}

:deep(.p-select:not(.p-disabled).p-focus) {
  border-color: transparent !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  outline: none !important;
}

:deep(.p-select .p-select-label) {
  /* Centrado vertical del texto seleccionado */
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
  padding: 0 2% !important; /* sin padding vertical para no desplazar el contenido */
  font-family: 'Work Sans', sans-serif !important;
  font-weight: 400 !important;
  font-size: 18px !important;
  line-height: 1 !important; /* evita desalineación vertical */
  color: #000000 !important;
}

:deep(.p-select .p-select-dropdown) {
  color: #005DCA !important;
}

/* Panel desplegable */
:deep(.p-select-overlay) {
  /* Desplazar el overlay hacia arriba para que se "meta"  por detrás del Select */
  margin-top: calc(var(--rav-select-overlay-overlap, 20px) * -1) !important;
  /* Agregar padding superior extra para que las opciones no queden tapadas por el Select */
  padding-top: calc(16px + var(--rav-select-overlay-overlap, 20px)) !important;
  border-radius: var(--rav-select-overlay-br, 25px) !important; /* bordes más redondos del contenedor */
  background: #F1F1F1 !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14) !important;
  border: none !important;
  border-top: 1.6px solid #005DCA !important; /* línea superior azul como en diseño */
  width: var(--rav-select-overlay-w, 520px) !important;
  padding: 16px 0 16px 0 !important;
  z-index: var(--rav-select-overlay-z, 10) !important;
}

/* Opciones */
:deep(.p-select-option) {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  background: #fff !important;
  border: 1.4px solid #005DCA !important;
  border-radius: 30px !important;
  height: 40px !important;
  margin: 8px 12px !important;
  padding: 0 20px !important;
  font-family: 'Work Sans', sans-serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  color: #000 !important;
  box-sizing: border-box !important;
  transition: background 0.2s, color 0.2s;
}

:deep(.p-select-option.p-select-option-selected) {
  background: #fff !important;
  color: #005DCA !important;
  font-weight: 700 !important;
  border: 2px solid #005DCA !important;
}

:deep(.p-select-option:hover),
:deep(.p-select-option.p-focus) {
  background: #f1f1f1 !important;
  color: #005DCA !important;
}

:deep(.p-select-option img) {
  width: 24px !important;
  height: 24px !important;
  border-radius: 50% !important;
  object-fit: cover !important;
}

:deep(.p-select-items-wrapper) {
  max-height: 220px !important;
  overflow-y: auto !important;
  padding-right: 4px !important;
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* IE 10+ */
}

:deep(.p-select-items-wrapper::-webkit-scrollbar) {
  width: 0px !important;
  background: transparent !important;
}

/* Ajustes de color para estados */
:deep(.p-select-option) {
  font-family: 'Work Sans', sans-serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  color: #000000 !important;
  padding: 0.5rem 1rem !important;
}

:deep(.p-select-option:hover) {
  background-color: rgba(0, 93, 202, 0.1) !important;
}

:deep(.p-select-option.p-focus) {
  background-color: rgba(0, 93, 202, 0.1) !important;
}

:deep(.p-select-option.p-select-option-selected) {
  background-color: rgba(0, 93, 202, 0.2) !important;
  color: #005DCA !important;
}
</style>

<!-- Global: ocultar scrollbars del overlay -->
<style>
.p-select-overlay,
.p-select-overlay * {
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* IE 10+ */
}
.p-select-overlay::-webkit-scrollbar,
.p-select-overlay *::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
  display: none !important;
}
</style>
