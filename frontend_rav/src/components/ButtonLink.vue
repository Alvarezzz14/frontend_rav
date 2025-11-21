<template>
    <router-link :to="{ name: link }"
        class="bg-azulApe h-9 rounded-menu no-underline px-3  flex items-center gap-2 max-xl:w-full">
        <component :is="icon" />
        <span class="text-white font-bold text-sm text-center items-center justify-center">{{ textContent }}</span>
    </router-link>
</template>

<script setup>
const props = defineProps({
    link: {
        type: String,
        default: ""
    },
    textContent: {
        type: String,
        default: "Regresar a perfil del ciudadano"
    },
    icon: {
        type: [Object, Function],
        required: false
    }
})
</script>