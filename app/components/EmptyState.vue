<template>
  <div class="flex flex-col items-center justify-center flex-1 px-6 text-center">
    <div class="text-6xl mb-4">{{ icon }}</div>
    <h2 v-if="title" class="text-2xl font-bold text-gray-800 mb-2">{{ title }}</h2>
    <p class="text-gray-600 mb-8">{{ message }}</p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title?: string;
  message: string;
}>();
</script>
