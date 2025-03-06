<template>
  <div class="three5">
    <div ref="threeContainer" class="three-container" style="height: 500px;"></div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';
import { } from 'vue'
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import logo from '../assets/logo.jpg'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// 使用ref来创建一个响应式引用
const threeContainer = ref<HTMLDivElement | null>(null);
const renderer: THREE.WebGLRenderer | null = null;

onMounted(() => {
  nextTick(() => {
    if (!threeContainer.value) return;
    // 初始化场景
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color('gray');

    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
    camera.position.set(2, 30, 20);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    threeContainer.value.appendChild(renderer.domElement);
    const gridHelper = new THREE.GridHelper(100);
    const geometry = new THREE.PlaneGeometry(15, 30);
    const loader = new THREE.TextureLoader()
    const textTure = loader.load('/texture/door/color.jpg')
    const material = new THREE.MeshStandardMaterial({
      // color: 0xff000,
      map: textTure,
      aoMap: loader.load('/texture/door/ao.jpg'),
      roughnessMap: loader.load('/texture/door/roughness.jpg'),
      displacementMap: loader.load('/texture/door/displacement.jpg'),
      normalMap: loader.load('/texture/door/normal.jpg'),
    });
    //  环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(3, 3, 3);
    scene.add(ambientLight, directionalLight);
    //  结构与材质结合生成物体
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const control = new OrbitControls(camera, renderer.domElement)
    control.enableDamping = true
    control.addEventListener('change', () => {
      renderer?.render(scene, camera)
    })
    function animate() {
      requestAnimationFrame(animate)
      renderer?.render(scene, camera)
      control.update()
    }
    animate();
  })


})

</script>
<style lang="less" scoped></style>
