<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :disabled="disabled"
    @click="handleClick"
    :class="[
      'py-3 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5',
      variant === 'primary' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' :
      variant === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
      variant === 'danger' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
      variant === 'secondary' ? 'bg-white/80 backdrop-blur-sm text-purple-700' :
      'bg-white/80 backdrop-blur-sm text-gray-700',
      disabled && 'opacity-50 cursor-not-allowed',
      to && 'text-center'
    ]"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4" />
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  to?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();

function handleClick() {
  emit('click');
}
</script>
