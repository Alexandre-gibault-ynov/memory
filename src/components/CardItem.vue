<script setup lang="ts">
  import type { Card } from '@/models/Card';

  const cardProps = defineProps<{ card: Card }>();

  const cardEmits = defineEmits<{
    (e: 'update:verso', face: boolean): void
  }>();

  const changeFace = () => {
    cardEmits('update:verso', !cardProps.card.firstFace);
  };
</script>

<template>

    <template v-if="card.firstFace">
      <div @click="changeFace">
        <h1>{{ card.question }}</h1>
      </div>
    </template>
    <template v-else>
      <div>
        <h1>{{ card.answer }}</h1>
      </div>
    </template>

</template>

<style scoped>

</style>