<script setup lang="ts">
  import type { Theme } from '@/models/Theme';
  import type { Card } from '@/models/Card';
  import { ref } from 'vue';
  import { useMemoryStore } from '@/stores/memoryStore'

  const memoryStore = useMemoryStore();

  const showModal = ref(false);
  const step = ref(1);
  const newTheme = ref({
    name: '',
    levelCount: 0,
    cardsToAdd: 0,
    cards: [{ question: '', answer: '' }]
  });

  /**
   * Go to step 2 of the modal.
   */
  const nextStep = () => {
    step.value = 2;
  };

  /**
   * Go to step 1 of the modal.
   */
  const previousStep = () => {
    step.value = 1;
  }

</script>

<template>

</template>

<style scoped>

</style>