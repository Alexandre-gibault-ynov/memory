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


  /**
   * Add a  card to a newTheme object
   */
  const addCard = ():void => {
    newTheme.value.cards.push({ question: '', answer: '' });
  };

  /**
   * Close the new theme modal
   */
  const closeModal = () => {
    showModal.value = false;
    step.value = 1;
    newTheme.value = {
      name: '',
      levelCount: 0,
      cardsToAdd: 0,
      cards: [{ question: '', answer: '' }]
    };
  };
</script>

<template>

</template>

<style scoped>

</style>