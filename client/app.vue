<script setup>
const user = useUser();
const { $api } = useNuxtApp();

const logout = async () => {
  await $api("/api/v1/logout", {
    method: "GET",
  });
  user.logout();
  navigateTo("/user/login");
};

onMounted(() => {
  document.documentElement.classList.add("bg-primary");
});

const alerts = useAlerts();
watch(alerts.getAlerts, () => {
  if (alerts.getAlerts.length > 0)
    setTimeout(() => {
      alerts.cleanAlerts();
    }, 7000);
});
</script>
<template>
  <main class="h-full w-full flex flex-col">
    <div
      class="absolute bottom-2 w-[100%] ml-auto mr-auto flex flex-col h-fit overflow-hidden gap-2"
    >
      <Alert
        v-if="alerts.getAlerts"
        v-for="alert in alerts.getAlerts"
        :text="alert.text"
        :type="alert.type"
      />
    </div>
    <nav
      class="fixed flex items-center text-txt top-0 h-[4.5rem] w-full text-center bg-third z-10"
    >
      <ButtonDarkMode class="mb-0 mr-3 ml-5" />
      <NuxtLink to="/" class="w-24 p-2 hover:text-btn rounded-md"
        >Home
      </NuxtLink>
      <NuxtLink
        v-if="user.getUser.isLoggedIn"
        to="/rooms"
        class="w-24 p-2 hover:text-btn rounded-md"
        >Rooms
      </NuxtLink>
      <div class="w-fit absolute top-4 right-5 flex items-center pr-5 gap-5">
        <button
          v-if="user.getUser.isLoggedIn"
          @click="logout"
          class="btn-primary h-10 order-1"
        >
          Logout
        </button>
        <button
          v-else-if="useRoute().fullPath === '/'"
          @click="navigateTo('/user/login')"
          class="btn-primary h-10"
        >
          Login/Signup
        </button>
      </div>
    </nav>
    <NuxtPage />
  </main>
</template>

<style scoped>
svg {
  animation: hover-shrink 0.2s forwards;
}
svg:hover {
  animation: hover-grow 0.2s forwards;
  color: var(--color-btn);
}
a:hover {
  background-color: #5680e927;
  transition: background-color 300ms;
}
</style>
