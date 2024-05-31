<script setup lang="ts">
  import CardList from '@/components/CardListComponent.vue'
  import type { Card } from '@/models/Card'

  const props = defineProps<{ level: number; cards: Card[] }>();
  const emit = defineEmits(['updateCard']);

  const handleUpdateCard = (updatedCard: Card) => {
    emit('updateCard', updatedCard);
  }
</script>

<template>
  <div>
    <h2>Niveau {{ level }}</h2>
    <CardList :cards="cards" @updateCard="handleUpdateCard" />
  </div>
</template>

<style scoped>

</style>