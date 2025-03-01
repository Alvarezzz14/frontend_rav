import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModuleStore = defineStore('module', () => {
    // Los items del menu de SidebarLeft
    const menuItems = ref([]);

    const setMenuItems = newMenuItems=> menuItems.value = newMenuItems;
    const getMenuItems = ()=> menuItems.value;


    return {
        setMenuItems,
        getMenuItems
    }

    
});