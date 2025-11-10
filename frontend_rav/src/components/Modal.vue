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
          class="bg-white rounded-menu shadow-xl max-w-sm w-full mx-4 relative"
        >
          <div class="flex items-center justify-center pt-2 border-b border-gray-200">
            <h2 class="text-sm font-bold text-blue-950">Listado de palabras clave</h2> 
            <button class="bg-red-600 border-0 rounded-full text-white font-bold absolute top-0 right-1 px-1 cursor-pointer">X</button>           
          </div>
            
          <div class="mx-4 mb-2 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-azulApe [&::-webkit-scrollbar-thumb]:rounded-full">
                <slot></slot>
            </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script setup>

const props = defineProps({
    showModal: Boolean,
    title: String
})


</script>