<script setup>
const props = defineProps({
  songs: {
    type: Array,
    default: [],
  },
});

const { width } = screenWidth();
const route = useRoute();
const isActive = ref(true);
const hiddenState = ref("active");

const changeState = () => {
  isActive.value = !isActive.value;
  hiddenState.value = isActive.value ? "active" : "hidden";
};

const isMobile = computed(() => {
  if (width.value >= 800) {
    hiddenState.value = "active";
  }
  return width.value <= 800;
});
</script>

<template>
  <div
    class="playlist h-full pb-20 bg-secondary md:max-w-[30rem] fixed z-10 overflow-y-auto overflow-x-hidden scale-x-[-1] left-[-17px]"
    :id="hiddenState"
  >
    <div class="scale-x-[-1] pt-4 flex flex-col pl-6 pr-2 overflow-x-hidden">
      <button
        v-show="isMobile"
        class="absolute h-[70%] text-txt right-1"
        @click="changeState"
      >
        <icon
          v-if="isActive"
          name="streamline:interface-arrows-button-to-left-arrow-line-to-left"
        />
        <icon
          v-else
          name="streamline:interface-arrows-button-to-right-arrow-line-to-right"
        />
      </button>
      <NuxtLink
        :to="`/rooms/room-${route.params.id}/search`"
        class="text-txt ml-4 mb-2 p-2 bg-third w-fit whitespace-nowrap rounded-full hover:text-btn border-[1px] border-third hover:border-btn font-semibold"
        ><icon class="w-6 h-auto" name="mdi:music-note-plus"
      /></NuxtLink>
      <div
        v-for="song in songs"
        :id="song.id"
        class="song flex p-4 w-full rounded-xl hover:bg-third"
      >
        <div class="flex items-center justify-start gap-4">
          <div
            class="rounded-xl overflow-hidden flex min-w-[4rem] max-w-[4rem]"
          >
            <img :src="song.img" class="bg-cover" />
          </div>
          <div class="flex flex-col min-w-[150px]">
            <h1 class="text-txt lg:text-md text-sm">
              {{ song.title }}
            </h1>
            <h2 class="text-txtLight text-sm">
              {{ song.channel }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.song {
  transition: all 200ms;
  cursor: pointer;
}

#hidden {
  width: 2.4rem;
  overflow-y: hidden;
  transition: width 500ms;
}
#active {
  width: 20rem;
  overflow-y: scroll;
  transition: width 500ms;
}
a {
  transition: all 200ms;
}
</style>
