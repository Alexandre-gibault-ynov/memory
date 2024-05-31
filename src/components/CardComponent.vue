<script setup lang="ts">
  import type { Card } from '@/models/Card';
  import { ref, watch } from 'vue'
  import { useMemoryStore } from '@/stores/memoryStore'

  const props = defineProps<{ card: Card }>();
  const emit = defineEmits<{
    (e: 'review', card: Card): void
  }>();

  const localCard = ref({ ...props.card });
  const showAnswer = ref(false);

  const memoryStore = useMemoryStore();

  const handleCorrect = () => {
    localCard.value.level++;
    localCard.value.nextReviewDate = calculateNexReviewDate(localCard.value.level);
    showAnswer.value = false;
    emit('review', localCard.value);
    memoryStore.updateCard(localCard.value.themeId, localCard.value);
  };

  const handleIncorrect = () => {
    localCard.value.level = 1;
    localCard.value.nextReviewDate = calculateNexReviewDate(localCard.value.level);
    showAnswer.value = false;
    emit('review', localCard.value);
    memoryStore.updateCard(localCard.value.themeId, localCard.value);
  }

  const calculateNexReviewDate = (level: number): Date => {
    const today = new Date();
    const daysToAdd = Math.pow(2, level - 1);
    today.setDate(today.getDate() + daysToAdd);
    return today;
  };

  // Watch for prop changes and update the local copy
  watch(() => props.card, (newCard) => {
    localCard.value = { ...newCard };
  });
</script>

<template>
  <div class="card">
    <p>{{ localCard.question }}</p>

    <button @click="showAnswer = !showAnswer">Afficher la réponse</button>

    <p v-if="showAnswer">{{ localCard.answer }}</p>

    <div v-if="showAnswer">
      <button @click="handleCorrect">Correct</button>
      <button @click="handleIncorrect">incorrect</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em;
}
</style>