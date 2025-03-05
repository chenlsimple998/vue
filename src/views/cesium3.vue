<template>
  <div id="cesiumContainer"></div>
</template>

<style></style>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMTQ0NzI2Zi05MjI3LTQzNzktYWRkNi04MzUzMjQ5MTA3MmEiLCJpZCI6Mjc0OTU5LCJpYXQiOjE3MzkyMzQ1NzB9.Qr2bGnNvjAHuXUtr0plDfNXirXapXVwRC2p-NFzM8yU'
  const viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate: true // 开启场景动画
  })

  // 开启帧率
  viewer.scene.debugShowFramesPerSecond = true;

  const tileset = new Cesium.Cesium3DTileset({
    url: "../../public/data/tileset.json",
  });

  tileset.readyPromise
    .then(function (tileset) {
      viewer.scene.primitives.add(tileset);
      viewer.zoomTo(tileset)
    })
    .catch(function (error) {
      console.log(error);
    });


})
</script>
