<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'py-3 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5',
      BUTTON_STYLES[variant || 'neutral'],
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      'text-center'
    ]"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4" />
    <slot>{{ label }}</slot>
  </NuxtLink>
  
  <button
    v-else
    :disabled="disabled"
    @click="handleClick"
    :class="[
      'py-3 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5',
      BUTTON_STYLES[variant || 'neutral'],
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4" />
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { BUTTON_STYLES, type ButtonVariant } from '../utils/constants';

defineProps<{
  label?: string;
  icon?: string;
  variant?: ButtonVariant;
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
