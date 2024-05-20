<script setup lang="ts">
  import type { Level } from '@/models/Level'
  import type { Theme } from '@/models/Theme'

  const props = defineProps<{ theme: Theme }>();
  const levels: Level[] = [];

</script>

<template>
    <h1>{{ theme.name }}</h1>
    <!-- TODO Display level to review -->
</template>

<style scoped>

</style>