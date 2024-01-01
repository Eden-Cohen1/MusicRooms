<script setup>
import { handleError } from "vue";

const { $api } = useNuxtApp();
const user = useUser();
const props = defineProps({
  room: {
    type: Object,
  },
});
const passIcon = props.room.password
  ? "heroicons:lock-closed-20-solid"
  : "heroicons:lock-open-20-solid";

const enterRoom = async (number) => {
  try {
    const response = await $api("/api/v1/rooms/add-user", {
      method: "POST",
      body: { userId: user.getUser.id, roomNumber: number },
    });

    navigateTo(`/rooms/room-${number}`);
    console.log(response);
  } catch (error) {
    console.log(error);
    handleError({ message: "Something went wrong.. please refresh" });
  }
};
</script>

<template>
  <main
    class="w-full min-h-[3rem] h-fit grid grid-cols-5 items-center border-b-[1px] border-btn gap-2 text-[0.8rem] md:text-sm"
  >
    <p class="text-txt text-center">{{ room.number }}</p>
    <p class="text-txt text-center">{{ room.name }}</p>
    <p class="text-txt text-center">{{ room.users.user?.name }}</p>
    <icon
      :name="passIcon"
      class="text-txt text-xs md:text-lg text-center w-full"
    />
    <NuxtLink
      @click="enterRoom(room.number)"
      class="text-txt text-xs md:text-lg text-center"
      ><icon class="text-txt" name="solar:play-line-duotone"
    /></NuxtLink>
  </main>
</template>

<style scoped>
svg {
  animation: hover-shrink 0.2s forwards;
}
svg:hover {
  animation: hover-grow 0.2s forwards;
  color: var(--color-btn);
  cursor: pointer;
}
</style>
