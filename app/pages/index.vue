<template>
  <div class="max-w-3xl mx-auto h-full flex flex-col">
    <!-- Empty State -->
    <div
      v-if="store.players.length === 0"
      class="flex flex-col items-center justify-center flex-1 px-6 text-center"
    >
      <div class="text-6xl mb-4">🎴</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Nenhum jogador ainda</h2>
      <p class="text-gray-600 mb-8">Adicione jogadores para começar o jogo</p>
      <NuxtLink 
        to="/setup" 
        class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Adicionar Jogadores
      </NuxtLink>
    </div>

    <!-- Players List -->
    <div v-else class="flex flex-col h-full">
      <!-- Podium for top 3 -->
      <div v-if="topPlayers.length > 0" class="mb-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex-shrink-0">
        <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
          <span>🏆</span>
          <span>Top 3</span>
        </h3>
        <div class="flex justify-center items-end gap-3">
          <!-- Second Place -->
          <div v-if="topPlayers[1]" class="flex flex-col items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md mb-1">
              2
            </div>
            <div class="text-center">
              <div class="font-semibold text-xs truncate max-w-[60px]">{{ topPlayers[1].name }}</div>
              <div class="text-lg font-bold text-purple-600">{{ topPlayers[1].score }}</div>
            </div>
          </div>
          
          <!-- First Place -->
          <div v-if="topPlayers[0]" class="flex flex-col items-center -mt-2">
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg mb-1">
              1
            </div>
            <div class="text-center">
              <div class="font-bold text-xs truncate max-w-[70px]">{{ topPlayers[0].name }}</div>
              <div class="text-xl font-bold text-purple-600">{{ topPlayers[0].score }}</div>
            </div>
          </div>
          
          <!-- Third Place -->
          <div v-if="topPlayers[2]" class="flex flex-col items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md mb-1">
              3
            </div>
            <div class="text-center">
              <div class="font-semibold text-xs truncate max-w-[60px]">{{ topPlayers[2].name }}</div>
              <div class="text-lg font-bold text-purple-600">{{ topPlayers[2].score }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Players Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 overflow-y-auto pb-4 content-start">
        <div
          v-for="(p, index) in store.players"
          :key="p.id"
          class="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-all"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 flex-1 min-w-0">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow flex-shrink-0">
                {{ index + 1 }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-gray-800 text-sm truncate">{{ p.name }}</div>
                <div class="text-xl font-bold text-purple-600">{{ p.score }}</div>
              </div>
            </div>
            <div class="flex gap-1.5 flex-shrink-0">
              <button 
                @click="dec(p.id)" 
                class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-bold text-xl shadow-md active:scale-95 flex items-center justify-center transition-transform"
              >
                −
              </button>
              <button 
                @click="inc(p.id)" 
                class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl font-bold text-xl shadow-md active:scale-95 flex items-center justify-center transition-transform"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-3 flex-shrink-0 pt-4">
        <button 
          @click="resetScores" 
          class="py-4 bg-white/80 backdrop-blur-sm text-purple-700 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Zerar Placar
        </button>
        <button 
          @click="clearAll" 
          class="py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Novo Jogo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useGameStore } from "../stores/game";
import { useRouter } from "vue-router";

const store = useGameStore();
const router = useRouter();

onMounted(() => store.init());

const sortedPlayers = computed(() => {
  return [...store.players].sort((a, b) => b.score - a.score);
});

const topPlayers = computed(() => {
  return sortedPlayers.value.slice(0, 3);
});

function inc(id: string) {
  store.inc(id);
}

function dec(id: string) {
  store.dec(id);
}

function resetScores() {
  if (!confirm("Zerar todas as pontuações?")) return;
  store.resetScores();
}

function clearAll() {
  if (!confirm("Apagar todos os dados do jogo?")) return;
  store.clearAll();
  router.push("/setup");
}
</script>
