import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const authenticatedUser = ref({})

    const setAuthenticatedUser = newAuthenticatedUser=> authenticatedUser.value =  newAuthenticatedUser;

    return {authenticatedUser,setAuthenticatedUser}
    
})


