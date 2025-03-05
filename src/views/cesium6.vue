<template>
  <div id="cesiumContainer"></div>
</template>

<style></style>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMTQ0NzI2Zi05MjI3LTQzNzktYWRkNi04MzUzMjQ5MTA3MmEiLCJpZCI6Mjc0OTU5LCJpYXQiOjE3MzkyMzQ1NzB9.Qr2bGnNvjAHuXUtr0plDfNXirXapXVwRC2p-NFzM8yU'
  const viewer = new Cesium.Viewer('cesiumContainer', {})

  // topoJson
  const promise = Cesium.GeoJsonDataSource.load('../public/SampleData/ne_10m_us_states.topojson')
  viewer.dataSources.add(promise)
  viewer.zoomTo(promise)
})
</script>
