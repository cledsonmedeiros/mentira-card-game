<template>
  <div class="bg-white/80 backdrop-blur-sm rounded-xl p-2 px-3 shadow-md hover:shadow-lg transition-all">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow flex-shrink-0">
          {{ index + 1 }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-gray-800 text-sm truncate">{{ player.name }}</div>
          <div class="text-xl font-bold text-purple-600">{{ player.score }}</div>
          <div v-if="store.hasMonetaryValue" class="text-xs text-green-600 font-semibold">
            {{ formatCurrency(getMonetaryValue(player.score, store.pointValue)) }}
          </div>
        </div>
      </div>
      
      <!-- Score Controls (for game page) -->
      <div v-if="mode === 'game'" class="flex gap-1.5 flex-shrink-0">
        <button 
          @click="$emit('decrement')"
          class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-bold text-xl shadow-md active:scale-95 flex items-center justify-center transition-transform"
        >
          −
        </button>
        <button 
          @click="$emit('increment')"
          class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl font-bold text-xl shadow-md active:scale-95 flex items-center justify-center transition-transform"
        >
          +
        </button>
      </div>
      
      <!-- Remove Button (for setup page) -->
      <button 
        v-else-if="mode === 'setup'"
        @click="$emit('remove')"
        class="w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all active:scale-95 flex items-center justify-center flex-shrink-0"
      >
        <Icon name="heroicons:trash-20-solid" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from '../stores/game';
import { useGameStore } from '../stores/game';
import { formatCurrency, getMonetaryValue } from '../utils/constants';

const store = useGameStore();

defineProps<{
  player: Player;
  index: number;
  mode: 'game' | 'setup';
}>();

defineEmits<{
  increment: [];
  decrement: [];
  remove: [];
}>();
</script>
