<script setup>
import { handleError } from "vue";

const user = useUser();
const { $api } = useNuxtApp();
const { loading } = loadMore();

const id = ref();
const page = ref(0);
const rooms = ref([]);
const openModal = ref(false);
const loader = ref(false);
const getRooms = async () => {
  console.log("get rooms");
  try {
    loader.value = true;
    const response = await $api(`/api/v1/rooms/?page=${page.value}`, {
      method: "GET",
    });
    rooms.value.push(...response);
    loader.value = false;
    //take all avialable rooms in reactive way and orginize it in the UI
  } catch (error) {
    handleError(error);
  }
};

const addRoom = async (name, password) => {
  try {
    const response = await $api("/api/v1/rooms/add", {
      method: "POST",
      body: {
        name: name,
        admin: user.getUser.id,
        password: password,
      },
    });
    rooms.value.unshift(response);
  } catch (error) {
    handleError(error);
  }
};

onMounted(() => {
  getRooms();
});

watch(loading, (newValue) => {
  if (page && newValue) {
    page.value++;
    getRooms();
  }
});
</script>

<template>
  <section class="mt-28 mb-5 flex gap-5 ml-[2%]">
    <RoomAdd v-if="openModal" @close="openModal = false" @newRoom="addRoom" />
    <div class="bg-slate-200 w-72 rounded-lg flex justify-between">
      <input
        type="text"
        v-model="id"
        placeholder="Search rooms by number"
        class="w-[100%] h-7 md:h-8 p-1 rounded-lg bg-slate-200 text-black text-sm"
      />
      <button type="submit" class="mr-2 text-black">
        <Icon name="eos-icons:loading" v-if="false" />
        <Icon name="material-symbols:search" v-else />
      </button>
    </div>
    <button
      @click="openModal = true"
      class="rounded-lg border-[1px] border-btn p-1 items-center flex gap-1 mr-[5%] text-txt hover:bg-btn hover:text-white text-sm"
    >
      <icon
        name="material-symbols:add-box-outline-rounded"
        class="h-auto w-5"
      />
      NEW
    </button>
  </section>
  <section class="w-full h-full bottom-0 relative flex flex-col gap-2 pt-4">
    <div
      class="w-full h-fit grid grid-cols-5 p-2 pl-0 pr-0 text-[0.8rem] md:text-sm"
    >
      <h2 class="text-center text-txt font-semibold md:text-sm">Number</h2>
      <h2 class="text-center text-txt font-semibold md:text-sm">Name</h2>
      <h2 class="text-center text-txt font-semibold md:text-sm">Creator</h2>
      <h2 class="text-center text-txt font-semibold md:text-sm">Password</h2>
    </div>
    <icon
      v-show="loader"
      name="svg-spinners:gooey-balls-2"
      class="w-8 h-auto text-txt relative m-auto mt-32"
    />
    <RoomBlock v-for="room in rooms" :room="room" />
  </section>
</template>
