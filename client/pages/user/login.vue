<script setup lang="ts">
import { animate } from "motion";
const formSide = ref();
const headerSide = ref();
const headers = ref();
const isLogin = ref(true);
const { width } = screenWidth();

const isMobile = computed(() => {
  return width.value <= 740;
});
const subText = computed(() => {
  return isLogin.value
    ? {
        header: "Don't have an account ?",
        sub: "Start listening in one click",
        btn: "SIGN UP",
      }
    : {
        header: "Already have an account ?",
        sub: "Sign in with your email & password",
        btn: "SIGN IN",
      };
});

const switchSides = (): void => {
  if (!isMobile.value) {
    if (isLogin.value) {
      animate(formSide.value, { x: [0, "100%"] }, { duration: 1.2 });
      animate(headerSide.value, { x: [0, "-100%"] }, { duration: 1.2 });
    } else {
      animate(formSide.value, { x: ["100%", 0] }, { duration: 1.2 });
      animate(headerSide.value, { x: ["-100%", 0] }, { duration: 1.2 });
    }
  }
  animate(
    [headers.value, formSide.value],
    { opacity: [1, 0, 0, 1] },
    { duration: 1.2 }
  );
  setTimeout(() => {
    isLogin.value = !isLogin.value;
  }, 455);
};
</script>

<template>
  <main
    class="w-full h-[90%] flex items-center justify-center relative top-32 md:top-60"
  >
    <div
      class="w-[60rem] h-[32rem] border-borderColor sm:border-[1px] border-b-[1px] rounded-2xl max-w-[90%] flex flex-col sm:flex-row gap-6 sm:gap-0 bg-third"
    >
      <div
        ref="formSide"
        class="w-[100%] sm:w-[50%] min-h-full flex flex-col pt-16 items-center gap-10 bg-third rounded-2xl"
      >
        <FormLogin v-if="isLogin" />
        <FormSignup v-else />
      </div>
      <div
        ref="headerSide"
        class="sm:radial-grad w-[100%] sm:w-[50%] rounded-2xl flex flex-col items-center justify-center sm:pt-40 sm:justify-normal sm:text-white ml-auto p-1 text-txt"
      >
        <div ref="headers" class="flex flex-col items-center sm:gap-3">
          <h1
            class="text-lg sm:text-5xl font-semibold text-center mt-2 sm:mt-0"
          >
            {{ subText.header }}
          </h1>
          <h2 class="text-sm sm:text-xl text-center">
            {{ subText.sub }}
            <icon v-if="isLogin" name="solar:headphones-round-sound-bold" />
          </h2>
          <button
            @click="switchSides"
            class="btn-primary border-white sm:border-[2px] mt-3 sm:bg-transparent hover:bg-transparent hover:border-zinc-800"
          >
            {{ subText.btn }}
          </button>
          <icon
            v-if="!isLogin"
            name="game-icons:sound-waves"
            class="sm:w-20 w-10 h-auto"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
button {
  transition: all 300ms;
}
</style>
