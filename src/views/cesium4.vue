<template>
  <div id="cesiumContainer"></div>
  <div class="cotrols">
    <button @click="cameraRoaming">运动</button>
    <button @click="PauseOrContinue(false)">暂停</button>
    <button @click="PauseOrContinue(true)">继续</button>
    <button @click="EndRoaming">取消</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import Roaming from './Roaming';
import obj from './obj.json';

// 定义变量来存储 viewer 和 roaming 实例
let viewer: Cesium.Viewer;
let roaming: Roaming;

onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMTQ0NzI2Zi05MjI3LTQzNzktYWRkNi04MzUzMjQ5MTA3MmEiLCJpZCI6Mjc0OTU5LCJpYXQiOjE3MzkyMzQ1NzB9.Qr2bGnNvjAHuXUtr0plDfNXirXapXVwRC2p-NFzM8yU';
  viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate: true // 开启场景动画
  });

  // 开启帧率
  viewer.scene.debugShowFramesPerSecond = true;

  roaming = new Roaming(viewer, { time: 30 });
  console.log('roaming', roaming);
});

const cameraRoaming = () => {
  if (roaming) {
    console.log('cameraRoaming ');
    const arr = obj.features[0].geometry.coordinates;
    const a111 = [];
    arr.forEach((k) => {
      a111.push(Cesium.Cartesian3.fromDegrees(k[0], k[1], 1000));
    });
    roaming.modelRoaming({
      model: {
        uri: '/data/feiji.glb',
        scale: 30,
        silhouetteSize: 5, // 边框大小
        silhouetteColor: Cesium.Color.fromCssColorString("#001aff"), // 边框
      },
      Lines: a111,
      path: {
        show: true,
      },
      polyline: {
        show: true,
        material: Cesium.Color.RED
      }
    });
  }
};

const PauseOrContinue = (state: boolean) => {
  if (roaming) {
    roaming.PauseOrContinue(state);
  }
};

const EndRoaming = () => {
  if (roaming) {
    roaming.EndRoaming();
  }
};
</script>
<style lang="less" scoped>
.cotrols {
  margin: 20px auto 20px;
  font-size: 16px;
  text-align: center;
}
</style>
