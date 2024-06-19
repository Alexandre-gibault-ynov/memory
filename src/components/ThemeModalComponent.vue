<script setup lang="ts">
  import type { Theme } from '@/models/Theme';
  import type { Card } from '@/models/Card';
  import { computed, ref } from 'vue'
  import { useMemoryStore } from '@/stores/memoryStore'

  const memoryStore = useMemoryStore();


  const storedThemes = computed(() => memoryStore.themes);
  const showModal = ref(false);
  const step = ref(1);
  const newTheme = ref({
    name: '',
    levelCount: 0,
    cardsToAdd: 0,
    cards: [{ question: '', answer: '' }]
  });

  /**
   * Go to step 2 of the modal.
   */
  const nextStep = () => {
    step.value = 2;
  };

  /**
   * Go to step 1 of the modal.
   */
  const previousStep = () => {
    step.value = 1;
  }


  /**
   * Add a  card to a newTheme object
   */
  const addCard = ():void => {
    newTheme.value.cards.push({ question: '', answer: '' });
  };

  /**
   * Close the new theme modal
   */
  const closeModal = () => {
    showModal.value = false;
    step.value = 1;
    newTheme.value = {
      name: '',
      levelCount: 0,
      cardsToAdd: 0,
      cards: [{ question: '', answer: '' }]
    };
  };

  /**
   * Convert the new theme to a {@link ../models/Theme} and
   * add it to the store themes
   */
  const submitTheme = () => {
    const themeId = storedThemes.value.length + 1;
    const theme: Theme = {
      id: themeId,
      name: '',
      levels: []
    };
    theme.id = themeId;
    theme.name = newTheme.value.name;

    for (let i = 0; i <= newTheme.value.levelCount; i++) {
      theme.levels[i] = []
    }
    let cardId: number = 1;
    const initializedCards: Card[] = newTheme.value.cards.map(card => ({
      id: cardId++,
      question: card.question,
      answer: card.answer,
      level: 1,
      nextReviewDate: new Date(),
      themeId: themeId
    }));

    theme.levels[1] = initializedCards.splice(0, newTheme.value.cardsToAdd);
    theme.levels[0] = initializedCards.splice(0, initializedCards.length);
    memoryStore.addTheme(theme);
    closeModal();
  }
</script>

<template>
  <button @click="showModal = true">Ajouter un thème</button>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>
      <div v-if="step === 1">
        <h2>Étape 1 : éditer les propriétés du theme</h2>
        <label for="themeName">Nom du thème</label>
        <input v-model.trim="newTheme.name" id="themeName" placeholder="Nom du Theme" />
        <label for="levelCount">Nombre de niveau</label>
        <input v-model.number="newTheme.levelCount" id="levelCount" type="number" min="0" placeholder="Nombre de niveaux" />
        <label for="cardNumber">Nombre de cartes à ajouter en fin de session de révision</label>
        <input v-model.number="newTheme.cardsToAdd" id="cardNumber" type="number" min="0" placeholder="Nombre de cartes à ajouter" />
        <button @click="nextStep">Suivant</button>
      </div>
      <div v-else-if="step === 2">
        <h2>Étape 2 : Ajout de cartes au thème</h2>
        <div v-for="(card, index) in newTheme.cards" :key="index">
          <label for="cardQuestion">Question</label>
          <input v-model.trim="card.question" id="cardQuestion" placeholder="Question" />
          <label for="cardAnswer">Réponse</label>
          <input v-model.trim="card.answer" id="cardAnswer" placeholder="Réponse" />
        </div>
        <button @click="previousStep">Précédent</button>
        <button @click="addCard">Ajouter une carte</button>
        <button @click="submitTheme">Ajouter le thème</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>