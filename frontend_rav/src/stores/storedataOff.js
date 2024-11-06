// storedataOff.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';


export const useEventStore = defineStore('eventStore', () => {
  const userInfo = ref({});
  const setUserInfo = (newUserInfo) => {userInfo.value = newUserInfo}
  
  return { userInfo, setUserInfo };

});
