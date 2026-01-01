<template>
  <div
    v-if="showInstallPrompt"
    class="fixed bottom-24 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-4 z-50 animate-slide-up"
  >
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
        <Icon name="heroicons:device-phone-mobile" class="w-6 h-6 text-white" />
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
        <Icon name="heroicons:x-mark" class="w-5 h-5" />
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
