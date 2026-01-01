<template>
  <form @submit.prevent="handleSubmit" class="mb-4 flex-shrink-0">
    <div class="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md">
      <label class="block text-xs font-semibold text-gray-700 mb-2">Adicionar novo jogador</label>
      <div class="flex gap-2">
        <input
          v-model="name"
          placeholder="Nome do jogador"
          class="flex-1 px-3 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
          autofocus
        />
        <button 
          type="submit" 
          :disabled="!name.trim()"
          class="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-transform"
        >
          <Icon name="heroicons:plus" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  add: [name: string];
}>();

const name = ref('');

function handleSubmit() {
  const trimmedName = name.value.trim();
  if (!trimmedName) return;
  emit('add', trimmedName);
  name.value = '';
}
</script>
