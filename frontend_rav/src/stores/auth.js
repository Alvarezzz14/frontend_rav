import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    // const authenticatedUser = ref({})

    const setAuthenticatedUser = newAuthenticatedUser=> {
        window.localStorage.setItem('auth',JSON.stringify(newAuthenticatedUser))
        // authenticatedUser.value = window.localStorage.getItem('auth');
    }

    const getAuthenticatedUser = ()=> JSON.parse(window.localStorage.getItem('auth'))

    const logout = ()=> window.localStorage.removeItem('auth');
    

    return {getAuthenticatedUser,setAuthenticatedUser,logout}
    
})


