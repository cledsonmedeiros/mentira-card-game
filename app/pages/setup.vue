<template>
  <div class="max-w-3xl mx-auto h-full flex flex-col">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 flex-shrink-0">
      <Icon name="heroicons:user-group" class="w-6 h-6 text-purple-600" />
      Jogadores
    </h2>

    <!-- Add Player Form -->
    <AddPlayerForm @add="addPlayer" />

    <!-- Players List -->
    <div v-if="store.players.length > 0" class="flex-1 overflow-y-auto mb-4">
      <h3 class="text-sm font-bold text-gray-700 mb-3 sticky top-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-2">{{ store.players.length }} jogador{{ store.players.length !== 1 ? 'es' : '' }}</h3>
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
    <EmptyState
      v-else
      icon="👥"
      message="Nenhum jogador adicionado ainda"
    />

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
import { onMounted } from "vue";
import { useGameStore } from "../stores/game";
import { useRouter } from "vue-router";

const store = useGameStore();
const router = useRouter();

onMounted(() => store.init());

function addPlayer(name: string) {
  store.addPlayer(name);
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
