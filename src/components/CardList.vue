<script setup lang="ts">
import type {Card} from '@/models/Card';
import CardItem from '@/components/CardItem.vue';

const cards: Card [] = [];

const addCard = (card: Card): void => {
  cards.push(card);
}

const deleteCard = (card: Card): void => {
  const index: number = cards.indexOf(card);
  if (index > -1) {
    cards.splice(index, 1);
  }
}

const getRandomCard = (): Card => {
  return cards[Math.floor(Math.random() * cards.length)];
}
</script>

<template>
  <CardItem v-if="cards && cards.length" v-bind:card="getRandomCard()"></CardItem>
</template>

<style scoped>

</style>