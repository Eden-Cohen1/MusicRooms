<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  errors: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 h-12">
    <input
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :class="[
        `input max-w-full bg-transparent`,
        { 'border-red-400': errors.length },
      ]"
    />
    <p
      class="relative text-[0.7rem] ml-auto w-fit h-fit text-red-500 mr-2"
      v-for="error in errors"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.error {
  border-color: red;
}
</style>
