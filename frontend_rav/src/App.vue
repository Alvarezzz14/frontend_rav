<template>
	<div>
	  <router-view />
	  
	</div>
  <div>
		<button @click="isModalOpen = true" class="bg-blue-500 text-white px-4 py-2 rounded hidden">Abrir Modal</button>
		<PopUp :isOpen="isModalOpen" @close="isModalOpen = false" />
	  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import PopUp from './components/PopUp.vue';
  
  const isModalOpen = ref(false);
  </script>
  
  <style>
  body {
	font-family: Arial, sans-serif;
  }
  
  header {
	background-color: #282c34;
	padding: 20px;
	color: white;
	text-align: center;
  }
  
  main {
	padding: 20px;
  }
  </style>
  
  