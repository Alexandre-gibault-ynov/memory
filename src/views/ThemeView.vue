<script setup lang="ts">

  import { useRoute } from 'vue-router'
  import { computed, type Ref } from 'vue'

  const route = useRoute();

  const themeId = computed(() => route.params.id);
</script>

<template>

</template>

<style scoped>

</style>