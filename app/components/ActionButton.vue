<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :disabled="disabled"
    @click="handleClick"
    :class="[
      'py-3 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5',
      BUTTON_STYLES[variant || 'neutral'],
      disabled && 'opacity-50 cursor-not-allowed',
      to && 'text-center'
    ]"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4" />
    <slot>{{ label }}</slot>
  </component>
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
