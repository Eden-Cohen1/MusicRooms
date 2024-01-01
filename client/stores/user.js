import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        isLoggedIn: false,
      },
    };
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
  actions: {
    logout() {
      this.user = { isLoggedIn: false };
    },
    login(id, name, email) {
      this.user.id = id;
      this.user.name = name;
      this.user.email = email;
      this.user.isLoggedIn = true;
    },
  },
});
