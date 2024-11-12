import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEventStore = defineStore('eventStore', () => {
  const userInfo = ref({});
  const setUserInfo = (newUserInfo) => { userInfo.value = newUserInfo }

  return { userInfo, setUserInfo };

});
