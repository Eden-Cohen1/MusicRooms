<script setup>
import { animate } from "motion";

const darkMode = useDark();
const buttonSwitch = ref();

const toggleDarkMode = () => {
  darkMode.isDark = !darkMode.isDark;
  document.documentElement.classList.toggle("dark", darkMode.isDark);
  if (darkMode.isDark) {
    animate(buttonSwitch.value, { x: [0, "100%"], duration: 300 });
  } else {
    animate(buttonSwitch.value, { x: ["100%", 0], duration: 300 });
  }
};
</script>

<template>
  <div
    @click="toggleDarkMode"
    class="left-5 top-6 pr-[3.1rem] flex border-[1px] border-borderColor w-10 rounded-full bg-secondary cursor-pointer hover:border-slate-400"
  >
    <button
      class="text-txt pl-0.5 pr-0.5 rounded-[50%] border-[1px] border-borderColor bg-primary"
      ref="buttonSwitch"
    >
      <Icon
        v-if="darkMode.isDark"
        name="uil:moon"
        class="w-1 h-auto text-txt"
      />
      <Icon v-else name="uil:sun" class="text-txt" />
    </button>
  </div>
</template>

<style scoped>
svg {
  width: 1.2rem;
  height: auto;
}
html {
  -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
}
</style>
