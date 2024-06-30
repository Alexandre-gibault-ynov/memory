<script setup lang="ts">

  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  import { useMemoryStore } from '@/stores/memoryStore'
  import ThemeComponent from '@/components/ThemeComponent.vue'

  const route = useRoute();
  const memoryStore = useMemoryStore();

  const themeId = computed(() => Number(route.params.id));
  const theme = computed(() => memoryStore.themes.find(theme => theme.id === themeId.value));

</script>

<template>
  <div>
    <theme-component v-if="theme" :theme="theme" />
    <p v-else>Thème non trouvé</p>
  </div>
</template>

<style scoped>

</style>