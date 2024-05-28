<script setup lang="ts">
import type {Card} from '@/models/Card';
import CardItem from '@/components/CardItem.vue';
import { computed } from 'vue'

const props = defineProps<{ cards: Card[] }>();
const emit = defineEmits(['updateCard']);

const shuffleCards = computed(() => {
  return [...props.cards].sort(() => Math.random() - 0.5);
});

const updateCard = (updatedCard: Card) => {
  emit('updateCard', updatedCard);
};
</script>

<template>
  <div>
    <CardItem v-for="card in shuffleCards"
              :key="card.id"
              :card="card"
              @review="updateCard"
    />
  </div>
</template>

<style scoped>

</style>