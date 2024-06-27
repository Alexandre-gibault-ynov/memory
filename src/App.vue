<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import ThemeModalComponent from '@/components/ThemeModalComponent.vue'
</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
    <theme-modal-component></theme-modal-component>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
