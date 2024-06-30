<script setup lang="ts">
import LevelComponent from '@/components/LevelComponent.vue'
import type { Theme } from '@/models/Theme'
import { computed, onBeforeMount } from 'vue'
import { useMemoryStore } from '@/stores/memoryStore'

  const props = defineProps<{ theme: Theme; }>();
  const memoryStore = useMemoryStore();
  /**
   * Return an array of levels available to review from the theme.
   * The array is descending sorted by the review date.
   *
   * @param theme Theme to get the available levels to review
   */
  const getAvailableLevelsToReview = (theme: Theme) => {
    const now = new Date();
    return theme.levels
      .filter(level => level.nextReviewDate <= now)
      .sort((a, b) => b.nextReviewDate.getTime() - a.nextReviewDate.getTime());
  };

  const availableLevelsToReview = computed(() => getAvailableLevelsToReview(props.theme));

  onBeforeMount(() => {
    memoryStore.initializeThemeFromStorage(props.theme);
    memoryStore.initializeReviewSession(props.theme);
  });
</script>

<template>
  <div>
    <h1>{{ theme.name }}</h1>
    <div v-for="(level, index) in availableLevelsToReview" :key="index">
      <level-component :level-index="index" :cards="level.cards" />
    </div>
  </div>

</template>

<style scoped>

</style>