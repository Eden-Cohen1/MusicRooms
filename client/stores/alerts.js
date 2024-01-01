import { defineStore } from "pinia";

export const useAlerts = defineStore("alerts", {
  state: () => {
    return {
      alerts: [],
    };
  },
  getters: {
    getAlerts: (state) => {
      return state.alerts;
    },
  },
  actions: {
    addAlert(type, text) {
      this.alerts.push({ type: type, text: text });
    },
    cleanAlerts() {
      this.alerts.length = 0;
    },
  },
});
