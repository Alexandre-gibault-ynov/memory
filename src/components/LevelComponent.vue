<script setup lang="ts">
  import CardList from '@/components/CardListComponent.vue'
  import type { Card } from '@/models/Card'
  import { useMemoryStore } from '@/stores/memoryStore'

  const props = defineProps<{ level: number; cards: Card[] }>();
  const memoryStore = useMemoryStore();


</script>

<template>
  <div v-if="level > 0">
    <h2>Niveau {{ level }}</h2>
    <card-list :cards="cards" />
  </div>
</template>

<style scoped>

</style>