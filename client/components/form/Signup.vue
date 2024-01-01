<script setup lang="ts">
import suite from "~/validations/signup";

interface Response {
  id: string;
  name: string;
  email: string;
}

const { $api } = useNuxtApp();
const alerts = useAlerts();
const user = useUser();
const formData = reactive({
  fullName: "",
  email: "",
  password: "",
});
let res = reactive(suite.get());

const validate = (name: "password" | "email" | "fullName") => {
  res = suite(
    {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
    },
    name
  );
};

const signUp = async function () {
  try {
    const response: Response = await $api("/api/v1/signup", {
      method: "POST",
      body: {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      },
    });
    user.login(response.id, response.name, response.email);
    alerts.cleanAlerts();
    alerts.addAlert("success", `Welcome ${formData.fullName} !`);
    navigateTo("/rooms");
  } catch (error: any) {
    raiseError(error);
  }
};
</script>
<template>
  <h1 class="font-bold text-4xl mb-2 text-btn w-fit text-center">
    Create Account
  </h1>
  <form class="flex flex-col gap-10 items-center" @submit.prevent="signUp">
    <InputAuth
      label="Full Name"
      v-model="formData.fullName"
      :errors="res.getErrors('fullName')"
      @update:modelValue="validate('fullName')"
      class="w-72 max-w-[90%]"
    />
    <InputAuth
      v-model="formData.email"
      label="Email Address"
      :errors="res.getErrors('email')"
      @update:modelValue="validate('email')"
      class="w-72 max-w-[90%]"
    />
    <InputAuth
      v-model="formData.password"
      label="Password"
      :errors="res.getErrors('password')"
      @update:modelValue="validate('password')"
      class="w-72 max-w-[90%]"
    />
    <div class="flex flex-col items-center gap-2 mt-1">
      <ButtonSubmit
        :isValid="!res.isValid()"
        text="SIGN UP"
        class="w-72 h-11 text-lg max-w-[85%] bg-btn"
      />
    </div>
  </form>
</template>

<style scoped></style>
