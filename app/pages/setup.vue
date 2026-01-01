<template>
  <div class="max-w-3xl mx-auto h-full flex flex-col">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      Jogadores
    </h2>

    <!-- Add Player Form -->
    <form @submit.prevent="addPlayer" class="mb-6 flex-shrink-0">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md">
        <label class="block text-sm font-semibold text-gray-700 mb-3">Adicionar novo jogador</label>
        <div class="flex gap-3">
          <input
            v-model="name"
            placeholder="Nome do jogador"
            class="flex-1 px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
            autofocus
          />
          <button 
            type="submit" 
            :disabled="!name.trim()"
            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </form>

    <!-- Players List -->
    <div v-if="store.players.length > 0" class="flex-1 overflow-y-auto mb-4">
      <h3 class="text-lg font-bold text-gray-700 mb-4 sticky top-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-2">{{ store.players.length }} jogador{{ store.players.length !== 1 ? 'es' : '' }}</h3>
      <div class="space-y-3 pb-4">
        <div
          v-for="(p, index) in store.players"
          :key="p.id"
          class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div class="flex items-center gap-4 flex-1">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow">
              {{ index + 1 }}
            </div>
            <div>
              <div class="font-bold text-gray-800 text-lg">{{ p.name }}</div>
              <div class="text-sm text-gray-500">{{ p.score }} pontos</div>
            </div>
          </div>
          <button 
            @click="removePlayer(p.id)"
            class="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all active:scale-95 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center text-center">
      <div class="text-6xl mb-4">👥</div>
      <p class="text-gray-600">Nenhum jogador adicionado ainda</p>
    </div>

    <!-- Action Buttons -->
    <div class="grid grid-cols-2 gap-3 flex-shrink-0 pt-4">
      <NuxtLink 
        to="/" 
        class="py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 text-center flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar
      </NuxtLink>
      <button
        @click="done"
        :disabled="store.players.length === 0"
        class="py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Começar Jogo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGameStore } from "../stores/game";
import { useRouter } from "vue-router";

const store = useGameStore();
const name = ref("");
const router = useRouter();

onMounted(() => store.init());

function addPlayer() {
  const n = name.value.trim();
  if (!n) return;
  store.addPlayer(n);
  name.value = "";
}

function removePlayer(id: string) {
  if (!confirm("Remover este jogador?")) return;
  store.removePlayer(id);
}

function done() {
  if (store.players.length === 0) return;
  router.push("/");
}
</script>
