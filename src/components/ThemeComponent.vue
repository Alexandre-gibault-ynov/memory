<script setup lang="ts">
  import type { Card } from '@/models/Card'
  import LevelComponent from '@/components/LevelComponent.vue'
  import type { Level } from '@/models/Level'

  const props = defineProps<{ themeName: string; levels: Level[] }>();
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
    <div v-for="(level, index) in levels" :key="index">
      <level-component :level="index" :cards="level.cards" @updateCard="handleUpdateCard" />
    </div>
  </div>

</template>

<style scoped>

</style>