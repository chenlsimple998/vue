<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CodeBgWall from './components/CodeBgWall.vue'
import DefaultLayout from './components/layout/default.vue'
import FullScreenLayout from './components/layout/fullScreen.vue'
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
const route = useRoute();
const currentLayout = ref(DefaultLayout);
watch(() => route.meta.layout, (newLayout) => {
  if (newLayout === 'default') {
    currentLayout.value = DefaultLayout;
  } else if (newLayout === 'fullScreen') {
    currentLayout.value = FullScreenLayout;
  }
});
</script>

<template>
  <header>
    <div class="wrapper">
      <CodeBgWall style="position:absolute;width: 100%;height: 100%;top:0;left: 0;">
      </CodeBgWall>

    </div>
  </header>
  <div style="position:absolute;top:0;left: 0;width: 1920px;height: 100%;">
    <currentLayout style="width: 1280px;height: 100%;margin: 0 auto;">
      <RouterView />
    </currentLayout>
  </div>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
