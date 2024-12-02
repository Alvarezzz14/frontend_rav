import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEventStore = defineStore('eventStore', () => {
  // const userInfo = ref({});
  // const setUserInfo = (newUserInfo) => { userInfo.value = newUserInfo }
  const setUserInfo = (newUserInfo) => {
    window.localStorage.setItem('user_info',JSON.stringify(newUserInfo))
    // userInfo.value = JSON.parse(window.localStorage.getItem('user_info'))
  }

  const getUserInfo = ()=> JSON.parse(window.localStorage.getItem('user_info'))
  

  const deleteUserInfo = ()=> window.localStorage.removeItem('user_info')

  return { getUserInfo, setUserInfo,deleteUserInfo };

});
