<script setup lang="ts">
  import type { Card } from '@/models/Card'
  import LevelComponent from '@/components/LevelComponent.vue'

  const props = defineProps<{ themeName: string; levels: { [key: number]: Card[] } }>();
  const emit = defineEmits<{
    (e: 'updateCard', card: Card): void
  }>();

  const handleUpdateCard = (updatedCard: Card) => {
    emit('updateCard', updatedCard);
  }
</script>

<template>
  <div>
    <h1>{{ themeName }}</h1>
    <div v-for="(cards, level) in levels" :key="level">
      <level-component :level="level" :cards="cards" @updateCard="handleUpdateCard" />
    </div>
  </div>

</template>

<style scoped>

</style>