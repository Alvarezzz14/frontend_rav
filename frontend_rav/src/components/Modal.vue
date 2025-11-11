<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="showModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >        
        <div 
          v-if="showModal"
          class="bg-white rounded-menu shadow-xl w-full mx-4 relative"
          :class="maxWidthClass"
        >
          <div class="flex items-center justify-center pt-2 border-b border-gray-200">
            <h2 class="text-sm font-bold text-blue-950">{{ title }}</h2> 
            <button @click="closeModal" class="bg-rojo-gradian shadow-[-1px_0_4px_rgba(0,0,0,0.3)] border-0 rounded-full text-white font-bold absolute top-0 right-1 px-1 cursor-pointer">X</button>           
          </div>
            
          <div class="mx-4 mb-5 max-h-[450px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-azulApe [&::-webkit-scrollbar-thumb]:rounded-full">
                <slot></slot>
            </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  showModal: Boolean,
  title: String,
  maxWidth: {
    String,
    default: "sm"
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const maxWidthClass = computed(() => {
  return {
    'sm': 'sm:max-w-sm',
    'md': 'sm:max-w-md',
    'lg': 'sm:max-w-lg',
    'xl': 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[props.maxWidth];
});
</script>