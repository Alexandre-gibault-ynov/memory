<script setup lang="ts">
  import CardList from '@/components/CardListComponent.vue'
  import type { Card } from '@/models/Card'

  const props = defineProps<{ levelIndex: number; cards: Card[] }>();

</script>

<template>
  <div v-if="levelIndex > 0">
    <h2>Niveau {{ levelIndex }}</h2>
    <card-list :cards="cards" />
  </div>
</template>

<style scoped>

</style>