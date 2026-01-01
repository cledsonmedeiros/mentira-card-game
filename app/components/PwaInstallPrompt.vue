<template>
  <div
    v-if="showInstallPrompt"
    class="fixed bottom-24 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-4 z-50 animate-slide-up"
  >
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="font-bold text-gray-800 mb-1">Instalar Aplicativo</h3>
        <p class="text-sm text-gray-600 mb-3">Adicione à tela inicial para acesso rápido</p>
        <div class="flex gap-2">
          <button
            @click="install"
            class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Instalar
          </button>
          <button
            @click="dismiss"
            class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl transition-all active:scale-95"
          >
            Agora não
          </button>
        </div>
      </div>
      <button
        @click="dismiss"
        class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
let deferredPrompt: any = null

onMounted(() => {
  // Check if already dismissed
  const dismissed = localStorage.getItem('pwa-install-dismissed')
  if (dismissed) return

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallPrompt.value = true
  })
})

async function install() {
  if (!deferredPrompt) return
  
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  
  if (outcome === 'accepted') {
    console.log('PWA installed')
  }
  
  deferredPrompt = null
  showInstallPrompt.value = false
}

function dismiss() {
  showInstallPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', 'true')
}
</script>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
