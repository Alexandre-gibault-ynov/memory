<script setup lang="ts">
  import type { Theme } from '@/models/Theme';
  import type { Card } from '@/models/Card';
  import { computed, ref } from 'vue'
  import { useMemoryStore } from '@/stores/memoryStore'

  const memoryStore = useMemoryStore();


  const storedThemes = computed(() => memoryStore.themes);
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

  /**
   * Convert the new theme to a {@link ../models/Theme} and
   * add it to the store themes
   */
  const submitTheme = () => {
    const themeId = storedThemes.value.length + 1;
    const theme: Theme = {
      id: themeId,
      name: '',
      levels: []
    };
    theme.id = themeId;
    theme.name = newTheme.value.name;

    for (let i = 0; i <= newTheme.value.levelCount; i++) {
      theme.levels[i] = []
    }
    let cardId: number = 1;
    const initializedCards: Card[] = newTheme.value.cards.map(card => ({
      id: cardId++,
      question: card.question,
      answer: card.answer,
      level: 1,
      nextReviewDate: new Date(),
      themeId: themeId
    }));

    theme.levels[1] = initializedCards.splice(0, newTheme.value.cardsToAdd);
    theme.levels[0] = initializedCards.splice(0, initializedCards.length);
    memoryStore.addTheme(theme);
    closeModal();
  }
</script>

<template>

</template>

<style scoped>

</style>