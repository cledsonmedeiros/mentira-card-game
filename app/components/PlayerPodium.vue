<template>
  <div v-if="store.topPlayers.length > 0" class="mb-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex-shrink-0">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-bold text-gray-800 flex items-center gap-1.5">
        <span>🏆</span>
        <span>Top 3</span>
      </h3>
      <div class="text-xs text-gray-600">
        <span class="font-semibold">Total:</span> {{ store.totalPoints }} pts
      </div>
    </div>
    <div class="flex justify-center items-end gap-3">
      <!-- Second Place -->
      <div v-if="store.topPlayers[1]" class="flex flex-col items-center">
        <div class="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md mb-1">
          2
        </div>
        <div class="text-center">
          <div class="font-semibold text-xs truncate max-w-[60px]">{{ store.topPlayers[1].name }}</div>
          <div class="text-lg font-bold text-purple-600">{{ store.topPlayers[1].score }}</div>
        </div>
      </div>
      
      <!-- First Place -->
      <div v-if="store.topPlayers[0]" class="flex flex-col items-center -mt-2">
        <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg mb-1">
          1
        </div>
        <div class="text-center">
          <div class="font-bold text-xs truncate max-w-[70px]">{{ store.topPlayers[0].name }}</div>
          <div class="text-xl font-bold text-purple-600">{{ store.topPlayers[0].score }}</div>
        </div>
      </div>
      
      <!-- Third Place -->
      <div v-if="store.topPlayers[2]" class="flex flex-col items-center">
        <div class="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md mb-1">
          3
        </div>
        <div class="text-center">
          <div class="font-semibold text-xs truncate max-w-[60px]">{{ store.topPlayers[2].name }}</div>
          <div class="text-lg font-bold text-purple-600">{{ store.topPlayers[2].score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/game';

const store = useGameStore();
</script>
