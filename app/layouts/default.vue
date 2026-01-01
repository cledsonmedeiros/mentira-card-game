<template>
  <div class="h-dvh grid grid-rows-[auto_1fr_auto] bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-hidden">
    <header class="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-center">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Contador de Pontos
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6 overflow-y-auto">
      <slot />
    </main>

    <!-- PWA Install Prompt -->
    <PwaInstallPrompt />

    <!-- Bottom Navigation -->
    <nav class="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-around items-center h-20">
          <NuxtLink 
            to="/" 
            class="flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all active:scale-95"
            :class="$route.path === '/' ? 'text-purple-600' : 'text-gray-500'"
          >
            <Icon name="heroicons:chart-bar" class="w-7 h-7" />
            <span class="text-xs font-medium">Placar</span>
          </NuxtLink>

          <NuxtLink 
            to="/setup" 
            class="flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all active:scale-95"
            :class="$route.path === '/setup' ? 'text-purple-600' : 'text-gray-500'"
          >
            <Icon name="heroicons:users" class="w-7 h-7" />
            <span class="text-xs font-medium">Jogadores</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>
