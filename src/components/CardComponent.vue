<script setup lang="ts">
  import type { Card } from '@/models/Card';
  import { ref, watch } from 'vue'
  import { useMemoryStore } from '@/stores/memoryStore'

  const props = defineProps<{ card: Card }>();

  const showAnswer = ref(false);

  const memoryStore = useMemoryStore();

  const handleCorrect = () => {
    memoryStore.moveCardToNextLevel(props.card);
    showAnswer.value = false;
  };

  const handleIncorrect = () => {
    memoryStore.resetCardToFirstLevel(props.card);
    showAnswer.value = false;
  };
</script>

<template>
  <div class="card">
    <p>{{ card.question }}</p>

    <button @click="showAnswer = !showAnswer">Afficher la réponse</button>

    <p v-if="showAnswer">{{ card.answer }}</p>

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