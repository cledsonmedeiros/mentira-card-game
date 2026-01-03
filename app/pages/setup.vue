<template>
  <div class="max-w-3xl mx-auto h-full flex flex-col">
    <h2
      class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 flex-shrink-0"
    >
      <Icon name="heroicons:user-group" class="w-6 h-6 text-purple-600" />
      Jogadores
    </h2>

    <!-- Point Value Configuration -->
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 flex-shrink-0"
    >
      <label
        class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
      >
        <Icon name="heroicons:currency-dollar" class="w-5 h-5 text-green-600" />
        Valor por ponto (opcional)
      </label>
      <div class="flex items-center gap-3">
        <div class="relative flex-1">
          <input
            v-model="pointValueInputMasked"
            v-maska:pointValueInput.unmasked="currencyMaskOptions"
            type="text"
            inputmode="numeric"
            placeholder="0,00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            @blur="updatePointValue"
          />
        </div>
        <button
          v-if="store.pointValue > 0"
          @click="clearPointValue"
          class="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Remover valor"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-2">
        <template v-if="store.hasMonetaryValue">
          Cada ponto vale {{ formatCurrency(store.pointValue) }}
        </template>
        <template v-else> Configure quanto vale cada ponto em reais </template>
      </p>
    </div>

    <!-- Add Player Form -->
    <AddPlayerForm @add="addPlayer" />

    <!-- Players List -->
    <div v-if="store.players.length > 0" class="flex-1 overflow-y-auto mb-4">
      <h3
        class="text-sm font-bold text-gray-700 mb-3 sticky top-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-2"
      >
        {{ store.players.length }} jogador{{
          store.players.length !== 1 ? "es" : ""
        }}
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-4">
        <PlayerCard
          v-for="(p, index) in store.players"
          :key="p.id"
          :player="p"
          :index="index"
          mode="setup"
          @remove="removePlayer(p.id)"
        />
      </div>
    </div>

    <!-- Empty State -->
    <EmptyState v-else icon="👥" message="Nenhum jogador adicionado ainda" />

    <!-- Action Buttons -->
    <div class="grid grid-cols-2 gap-2.5 flex-shrink-0 pt-3">
      <ActionButton
        variant="neutral"
        label="Voltar"
        icon="heroicons:arrow-left"
        to="/"
      />
      <ActionButton
        variant="success"
        label="Começar Jogo"
        icon="heroicons:play"
        :disabled="store.players.length === 0"
        @click="done"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { vMaska } from "maska/vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import { formatCurrency } from "../utils/constants";
import { currencyMaskOptions } from "~/config/maska";

const store = useGameStore();
const router = useRouter();
const pointValueInput = ref(0);
const pointValueInputMasked = ref("");

defineExpose({ pointValueInput });

onMounted(() => {
  store.init();
  pointValueInput.value = store.pointValue;
});

function addPlayer(name: string) {
  store.addPlayer(name);
}

function removePlayer(id: string) {
  if (!confirm("Remover este jogador?")) return;
  store.removePlayer(id);
}

function updatePointValue() {
  if (pointValueInput.value >= 0) {
    store.setPointValue(pointValueInput.value);
  }
}

function clearPointValue() {
  pointValueInput.value = 0;
  store.setPointValue(0);
}

function done() {
  if (store.players.length === 0) return;
  router.push("/");
}
</script>
