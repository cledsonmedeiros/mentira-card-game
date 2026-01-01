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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="text-xs font-medium">Placar</span>
          </NuxtLink>

          <NuxtLink 
            to="/setup" 
            class="flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all active:scale-95"
            :class="$route.path === '/setup' ? 'text-purple-600' : 'text-gray-500'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="text-xs font-medium">Jogadores</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>
