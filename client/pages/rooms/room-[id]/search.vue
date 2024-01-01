<script setup>
import { handleError } from "vue";

const { $api } = useNuxtApp();
const route = useRoute();
const alerts = useAlerts();
const searchQuery = ref();
const songs = ref([]);

const searchSongs = async () => {
  try {
    const response = await $api(`/api/v1/search?search=${searchQuery.value}`, {
      method: "GET",
    });
    songs.value.length = 0;
    songs.value.push(...response);
    console.log(response);
  } catch (error) {
    console.log(error, "CLIENT ERROR");
  }
};

const addToPlaylist = async (song) => {
  try {
    const response = await $api("/api/v1/rooms/search/add", {
      method: "POST",
      body: {
        id: song.id.videoId,
        img: song.snippet.thumbnails.high.url,
        title: song.snippet.title,
        channel: song.snippet.channelTitle,
        roomNumber: route.params.id,
      },
    });
    alerts.addAlert("success", response);
    navigateTo(`/rooms/room-${route.params.id}`);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
</script>

<template>
  <NuxtLink
    :to="`/rooms/room-${route.params.id}`"
    class="text-txt absolute top-32 left-12 cursor-pointer"
    ><Icon name="material-symbols:keyboard-backspace-rounded"
  /></NuxtLink>
  <main class="h-screen w-full flex flex-col items-center mt-40">
    <div
      class="flex flex-col gap-6 justify-center items-center max-w-[90%] mb-12"
    >
      <div
        class="bg-slate-200 w-[40rem] max-w-[90%] rounded-xl flex justify-between p-1.5 md:p-3"
      >
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by song name / artist.."
          class="w-[100%] h-7 md:h-8 p-1 rounded-lg bg-slate-200 text-black text-md"
        />
        <button @click="searchSongs" type="submit" class="mr-2 text-txt">
          <Icon name="eos-icons:loading" v-if="false" />
          <Icon name="material-symbols:search" v-else />
        </button>
      </div>
    </div>
    <div
      v-for="song in songs"
      :id="song.id.videoId"
      class="song flex p-4 md:w-[60%] ml-5 pr-5 w-full rounded-xl hover:bg-secondary"
      @click="addToPlaylist(song)"
    >
      <div class="flex items-center justify-start md:gap-8 gap-4">
        <div
          class="rounded-xl overflow-hidden flex md:max-w-[7rem] max-w-[5rem]"
        >
          <img :src="song.snippet.thumbnails.high.url" class="bg-cover" />
        </div>
        <div class="flex flex-col">
          <h1 class="text-txt md:text-lg text-sm">{{ song.snippet.title }}</h1>
          <h2 class="text-txtLight text-sm">
            {{ song.snippet.channelTitle }}
          </h2>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
svg {
  width: 2rem;
  height: auto;
}
a:hover {
  animation: hover-grow 0.2s forwards;
}
.song {
  transition: all 200ms;
  cursor: pointer;
}
</style>
