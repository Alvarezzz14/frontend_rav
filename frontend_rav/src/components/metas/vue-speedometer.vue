<template>
	<div class="w-full h-32 bg-gray-200 rounded-lg relative">
		<div
			class="h-full bg-blue-500 rounded-lg"
			:style="{ width: `${progress}%` }"></div>
		<p
			class="absolute inset-0 flex items-center justify-center text-lg font-bold">
			{{ progress }}%
		</p>
	</div>
</template>

<script setup>
import { computed } from "vue";

defineProps(["ticketsCount", "goalLimit"]);

const progress = computed(() => {
	return Math.min((ticketsCount / goalLimit) * 100, 100);
});
</script>
