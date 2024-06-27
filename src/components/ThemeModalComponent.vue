<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useMemoryStore } from '@/stores/memoryStore'
  import { useFieldArray, useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';

  /**
   * The pinia store of the project
   */
  const memoryStore = useMemoryStore();

  /**
   * The stored themes in pinia store
   */
  const storedThemes = computed(() => memoryStore.themes);

  /**
   * Property used to show the add theme modal
   */
  const showThemeModal = ref(false);

  /**
   * The step of the add theme form
   */
  const step = ref(1);

  const validationSchema = toTypedSchema(
    yup.object({
      themeName: yup.string().trim().required('Renseignez un nom de thème'),
      levelCount: yup.number().min(1, 'Renseignez un nombre supérieur à 1').required('Ce champ est obligatoire'),
      cardsToAdd: yup.number().min(0, 'Renseignez un nombre positif').required('Ce champ est obligatoire'),
      cards: yup.array().of(
        yup.object({
          question: yup.string().trim().required('Ce champ est obligatoire'),
          answer: yup.string().trim().required('Ce champ est obligatoire'),
        })
      ).required('Un thème doit contenir au moins une carte'),
    }),
  );

  const { errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: validationSchema,
  });

  const [themeName, themeNameAttrs] = defineField('themeName');
  const [levelCount, levelCountAttrs] = defineField('levelCount');
  const [cardsToAdd, cardToAddAttrs] = defineField('cardsToAdd');
  const {fields: cards, push, remove} = useFieldArray<{question: yup.StringSchema, answer: yup.StringSchema}>('cards');

  /**
   * Set the step with newStep value
   * @param newStep The new step to set
   */
  const setStep = (newStep: number) => {
    step.value = newStep;
  };

  /**
   * Add a new card form to the step 2 of the add theme form
   */
  const addCard = ():void => {
    push({
      question: '',
      answer: '',
    });
  };

  /**
   * Open the add theme modal
   */
  const openThemeModal = () => {
    showThemeModal.value = true;
    addCard();
  };

  /**
   * Close the new theme modal
   */
  const closeAddThemeModal = () => {
    showThemeModal.value = false;
    step.value = 1;
    resetForm();
  };

  /**
   * Initialize a new theme and add it to the store
   */
  const onSubmit = handleSubmit((values) => {
    memoryStore.initializeNewTheme(values);
    closeAddThemeModal();
  });
</script>

<template>
  <button @click="openThemeModal">Ajouter un thème</button>
  <div v-if="showThemeModal" class="modal">
    <div class="modal-content">
      <form @submit="onSubmit">
        <button class="close-button" @click="closeAddThemeModal">X</button>
        <div v-if="step === 1">
          <h2>Étape 1 : éditer les propriétés du theme</h2>
          <label for="themeName">Nom du thème</label>
          <input v-model.trim="themeName" v-bind="themeNameAttrs" id="themeName" placeholder="Nom du Theme" />
          <span>{{ errors.themeName }}</span>
          <label for="levelCount">Nombre de niveau</label>
          <input v-model.number="levelCount" v-bind="levelCountAttrs" id="levelCount" type="number" min="0" placeholder="Nombre de niveaux" />
          <span>{{ errors.levelCount }}</span>
          <label for="cardNumber">Nombre de cartes à ajouter en fin de session de révision</label>
          <input v-model.number="cardsToAdd" v-bind="cardToAddAttrs" id="cardNumber" type="number" min="0" placeholder="Nombre de cartes à ajouter" />
          <span>{{ errors.cardsToAdd }}</span>
          <button @click="setStep(2)">Suivant</button>
        </div>
        <div v-else-if="step === 2">
          <h2>Étape 2 : Ajout de cartes au thème</h2>
          <div v-for="(card, index) in cards" :key="card.key">
            <label :for="'cardQuestion' + card.key">Question</label>
            <input :id="'cardQuestion' + card.key" v-model="card.value.question" placeholder="Question" />
            <span>{{ errors.cards }}</span>
            <label :for="'cardAnswer' + card.key">Réponse</label>
            <input :id="'cardAnswer' + card.key" v-model="card.value.answer" placeholder="Réponse" />
            <span>{{ errors.cards }}</span>
            <button type="button" @click="remove(index)">Supprimer</button>
          </div>
          <button @click="setStep(1)">Précédent</button>
          <button @click="addCard">Ajouter une carte</button>
          <button>Ajouter le thème</button>
        </div>
      </form>
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