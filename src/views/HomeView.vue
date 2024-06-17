<script setup lang="ts">
  import { useMemoryStore } from '@/stores/memoryStore'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  const memoryStore = useMemoryStore();
  const themes = computed(() => memoryStore.themes);
  const router = useRouter();

  const navigateToTheme = (themeId: number) => {
    router.push({name: 'theme', params: {id: themeId}});
  };
</script>

<template>
  <div>
    <h1>Memory</h1>
  </div>
  <div class="home">
    <h1>{{ themes.length > 0 ? 'Thèmes' : 'Thème' }}</h1>
    <div class="themes-grid" v-if="themes.length > 0">
      <div
        v-for="theme in themes"
        :key="theme.id"
        class="theme-card"
        @click="navigateToTheme(theme.id)"
      >
        {{ theme.name }}
      </div>
    </div>
    <p v-else>Aucun thème disponible</p>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}
.themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
.theme-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  background-color: #f9f9f9;
}
.theme-card:hover {
  background-color: #eaeaea;
}
</style>