import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isActivityExpanded: false,
  }),
  actions: {
    setActivityExpanded(val) {
      this.isActivityExpanded = val;
    },
  },
});
