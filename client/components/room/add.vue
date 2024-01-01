<script setup lang="ts">
import suite from "~/validations/room";
import { animate } from "motion";
import type { EmitsOptions } from "vue";

const modal = ref();
const room = reactive({
  name: "",
  password: "",
});
let res = reactive(suite.get());

const validate = (name: "name" | "password") => {
  res = suite({ name: room.name, password: room.password }, name);
};

const newRoom = (emit: any) => {
  console.log(room);
  emit("newRoom", room.name, room.password);
  emit("close");
};

onMounted(() => {
  animate(
    modal.value,
    { height: [0, "16rem"], width: [0, "23rem"] },
    { duration: 0.7 }
  );
});

const closeModal = (emit: any) => {
  animate(
    modal.value,
    { height: ["16rem", 0], width: ["23rem", 0] },
    { duration: 0.7 }
  );
  setTimeout(() => {
    emit("close");
  }, 650);
};

defineEmits(["newRoom", "close"]);
</script>

<template>
  <main
    ref="modal"
    class="max-w-[24rem] bg-secondary rounded-xl absolute z-10 lg:left-[20.8rem] md:[20.3rem] top-52 md:top-[7rem] border-[1px] border-btn overflow-hidden max-h-64"
  >
    <button @click="closeModal($emit)" class="absolute right-0 top-0 text-txt">
      <icon
        name="material-symbols-light:close-small-rounded"
        class="w-8 h-auto"
      />
    </button>
    <form @submit.prevent="newRoom($emit)" class="p-5 flex flex-col gap-5">
      <h1 class="text-txt text-md text-semibold">Create a room</h1>
      <InputAuth
        v-model="room.name"
        type="text"
        placeholder="Name"
        :errors="res.getErrors('name')"
        @update:modelValue="validate('name')"
      />
      <InputAuth
        v-model="room.password"
        :errors="res.getErrors('password')"
        @update:modelValue="validate('password')"
        placeholder="Password (optional)"
      />
      <ButtonSubmit text="Create" :isValid="!res.isValid()" />
    </form>
  </main>
</template>
