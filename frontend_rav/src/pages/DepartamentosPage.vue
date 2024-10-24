<template>
    <div class="flex">
        <div class="w-1/2 p-4">
            <div class="mb-4">
                <Titulo></Titulo>
            </div>
            <div>
                <SearchApartament></SearchApartament>
            </div>
        </div>
        <div class="w-1/2 p-4">
            <MapaColombia></MapaColombia>
        </div>
    </div>
</template>

<script setup>

import MapaColombia from '../components/MapaColombia.vue';
import SearchApartament from '../components/SearchApartament.vue';
import Titulo from '../components/Titulo.vue';

</script>