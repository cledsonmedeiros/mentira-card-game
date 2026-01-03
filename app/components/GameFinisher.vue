<template>
  <!-- Game Finished - Winner Display -->
  <div v-if="store.gameFinished && store.winner" class="mb-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg flex-shrink-0 border-2 border-yellow-400">
    <div class="text-center">
      <div class="text-4xl mb-2">🏆</div>
      <h3 class="text-lg font-bold text-gray-800 mb-1">Vencedor!</h3>
      <div class="text-2xl font-bold text-purple-600 mb-3">{{ store.winner.name }}</div>
      
      <div v-if="store.hasMonetaryValue" class="bg-white rounded-lg p-4 mb-4">
        <div class="text-sm text-gray-600 mb-1">Recebe dos outros jogadores:</div>
        <div class="text-3xl font-bold text-green-600">
          {{ formatCurrency(store.winnerPayout) }}
        </div>
      </div>

      <button
        @click="store.startNewRound()"
        class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Icon name="heroicons:arrow-path" class="w-5 h-5" />
        Nova Rodada
      </button>
    </div>
  </div>

  <!-- Select Winner -->
  <div v-else-if="showWinnerSelection" class="mb-4 bg-white rounded-2xl p-4 shadow-lg flex-shrink-0">
    <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
      <Icon name="heroicons:trophy" class="w-5 h-5 text-yellow-500" />
      Quem ganhou?
    </h3>
    <div class="grid grid-cols-1 gap-2 mb-3">
      <button
        v-for="player in store.players"
        :key="player.id"
        @click="selectWinner(player.id)"
        class="bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-2 border-purple-200 hover:border-purple-400 rounded-lg p-3 transition-all flex items-center justify-between"
      >
        <span class="font-semibold text-gray-800">{{ player.name }}</span>
        <div class="text-right">
          <div class="text-sm text-purple-600 font-bold">{{ player.score }} pts</div>
          <div v-if="store.hasMonetaryValue" class="text-xs text-green-600">
            {{ formatCurrency(getMonetaryValue(player.score, store.pointValue)) }}
          </div>
        </div>
      </button>
    </div>
    <button
      @click="showWinnerSelection = false"
      class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
    >
      Cancelar
    </button>
  </div>

  <!-- Finish Game Button -->
  <div v-else class="mb-4 flex-shrink-0">
    <button
      @click="showWinnerSelection = true"
      :disabled="store.players.length === 0"
      class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
    >
      <Icon name="heroicons:trophy" class="w-6 h-6" />
      Finalizar Partida
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '../stores/game';
import { formatCurrency, getMonetaryValue } from '../utils/constants';

const store = useGameStore();
const showWinnerSelection = ref(false);

function selectWinner(playerId: string) {
  store.finishGame(playerId);
  showWinnerSelection.value = false;
}
</script>
