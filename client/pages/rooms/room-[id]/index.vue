<script setup>
import { handleError } from "vue";

const route = useRoute();
const { $api } = useNuxtApp();
const songs = ref([]);
const songsID = ref("");
let room = reactive({
  name: "",
  number: "",
  admin: "",
});
console.log(room);
const getRoomContent = async () => {
  try {
    const response = await $api(`/api/v1/rooms/${route.params.id}`, {
      method: "GET",
    });
    songs.value.length = 0;
    songs.value.push(...response.playlist);
    songsID.value = songs.value.map((song) => song.id);
    songsID.value = songsID.value.join(",");
    room = response;
    console.log(room.users);
  } catch (error) {
    handleError(error);
  }
};

getRoomContent();
</script>

<template>
  <RoomPlaylist :songs="songs" class="mt-[4.5rem]" />
  <main
    class="flex flex-col items-center pt-[4.5rem] h-screen absolute right-0 md:w-[calc(100%-18.5rem)] w-[97%]"
  >
    <div
      class="flex justify-around gap-2 bg-secondary p-5 ml-auto w-full text-sm md:text-[1rem]"
    >
      <p class="text-txt w-fit h-fit"><b>Room Name:</b> {{ room.name }}</p>
      <p class="text-txt w-fit h-fit"><b>Room Number:</b> {{ room.number }}</p>
    </div>
    <div
      class="flex flex-col max-h-[15rem] h-[20rem] w-[10rem] bg-secondary border-2 border-btn absolute right-3 top-[9rem] items-start p-2 rounded-xl text-txt gap-1"
    >
      <h1 class="font-bold mb-2 w-full text-center">Users</h1>
      <div v-for="user in room.users" class="flex gap-1.5 items-center">
        <icon name="material-symbols:account-circle" />
        <p>{{ user.user.name }}</p>
      </div>
    </div>
    <div class="flex flex-col mt-24 p-4 w-full items-center">
      <lite-youtube
        :videoId="null"
        :params="`autoplay=1&color=white&controls=0&enablejsapi=1&fs=0&disablekb=1&loop=1&playlist=${songsID}`"
        style="background-image: url()"
        playlabel="Play: Keynote (Google I/O '18)"
        class="rounded-2xl h-auto w-[60%] shadow-xl shadow-black"
      />
    </div>
  </main>
</template>

<style scoped></style>
