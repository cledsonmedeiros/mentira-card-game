<template>
  <div class="max-w-3xl mx-auto h-full flex flex-col">
    <!-- Empty State -->
    <EmptyState
      v-if="store.players.length === 0"
      icon="🎴"
      title="Nenhum jogador ainda"
      message="Adicione jogadores para começar o jogo"
    >
      <template #action>
        <NuxtLink 
          to="/setup" 
          class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
        >
          <Icon name="heroicons:user-plus" class="w-6 h-6" />
          Adicionar Jogadores
        </NuxtLink>
      </template>
    </EmptyState>

    <!-- Players List -->
    <div v-else class="flex flex-col h-full">
      <!-- Game Finisher -->
      <GameFinisher />

      <!-- All Players Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 overflow-y-auto pb-4 content-start">
        <PlayerCard
          v-for="(p, index) in store.players"
          :key="p.id"
          :player="p"
          :index="index"
          mode="game"
          @increment="inc(p.id)"
          @decrement="dec(p.id)"
        />
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-2.5 flex-shrink-0 pt-3">
        <ActionButton 
          variant="secondary"
          label="Zerar Placar"
          icon="heroicons:arrow-path"
          @click="resetScores"
        />
        <ActionButton 
          variant="danger"
          label="Novo Jogo"
          icon="heroicons:trash-20-solid"
          @click="clearAll"
        />
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
