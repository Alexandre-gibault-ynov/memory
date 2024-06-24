<script setup lang="ts">
import type {Card} from '@/models/Card';
import CardComponent from '@/components/CardComponent.vue';
import { computed } from 'vue'

const props = defineProps<{ cards: Card[] }>();

const shuffleCards = computed(() => {
  return [...props.cards].sort(() => Math.random() - 0.5);
});

</script>

<template>
  <div>
    <card-component v-for="card in shuffleCards"
              :key="card.id"
              :card="card"
    />
  </div>
</template>

<style scoped>

</style>