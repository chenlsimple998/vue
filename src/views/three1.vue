<template>
  <div class="three1">
    <canvas class="cvs1" style="width:500px;height: 500px"></canvas>
    <canvas class="cvs2" style="width:500px;height: 500px"></canvas>
    <div ref="threeContainer" class="three-container" style="height: 500px;"></div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';
import { ref } from 'vue'
import { onMounted, nextTick } from 'vue';
import logo from '../assets/logo.jpg'
// 使用ref来创建一个响应式引用
let threeContainer = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer | null = null;

onMounted(() => {
  nextTick(() => {
    if (!threeContainer.value) return;
    // 初始化场景
    let scene = new THREE.Scene();

    const loader = new THREE.TextureLoader()
    loader.load('', (texture) => {
      scene.background = texture
    })
    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    // //camera.position.set(0, 4, 10);
    camera.lookAt(0, 0, 0);
    //{canvas: document.querySelector('.cvs1') as HTMLCanvasElement}
    let renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('.cvs1') as HTMLCanvasElement,
      antialias: true,
    })
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    // threeContainer.value.appendChild(renderer.domElement);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 'RED' })
    );
    cube2.position.x = 2
    scene.add(cube, cube2)
    function animate() {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.01;
      renderer?.render(scene, camera)
    }
    animate()
  })

})

</script>
<style lang="less" scoped>
.cvs1,
.cvs2 {
  width: 500px;
  height: 500px;
  margin: 0 20px;
  border: 1px solid #0000;
}
</style>
