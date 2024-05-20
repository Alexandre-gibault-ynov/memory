<script setup lang="ts">
  import type { Level } from '@/models/Level'
  import CardList from '@/components/CardList.vue'
  import type { Card } from '@/models/Card'

  const props = defineProps<{ level: Level, themeId: number }>();
  const cards: Card[] = [];
</script>

<template>
  <CardList :cards="level.cards"
            :levelId="level.id"
            :themeId="themeId"
  ></CardList>
</template>

<style scoped>

</style>