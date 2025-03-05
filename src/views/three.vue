<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

// 使用ref来创建一个响应式引用
const threeContainer = ref<HTMLDivElement | null>(null);

let renderer: THREE.WebGLRenderer | null = null;
let animationId: number | null = null;

onMounted(() => {
  if (!threeContainer.value) return;

  // 初始化场景
  const scene = new THREE.Scene();

  // 初始化相机
  const camera = new THREE.PerspectiveCamera(
    75,
    threeContainer.value.offsetWidth / threeContainer.value.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.lookAt(0, 0, 0)
  // 初始化渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // 创建立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 'red' });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 动画循环
  const animate = () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }

    animationId = requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer?.render(scene, camera);
  };

  animate();
});

onUnmounted(() => {
  // 清理动画帧和渲染器
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style>
.three-container {
  width: 100%;
  height: 100%;
}
</style>
