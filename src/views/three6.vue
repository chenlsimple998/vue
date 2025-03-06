<template>
  <div class="three6">
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
    camera.position.set(30, 30, 0);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    threeContainer.value.appendChild(renderer.domElement);
    const gridHelper = new THREE.GridHelper(100);
    scene.add(gridHelper)
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const loader = new THREE.TextureLoader()
    // const textTure = loader.load('/texture/door/color.jpg')
    const material = new THREE.MeshStandardMaterial({
      // color: 0xff000,
      // map: textTure,
      // aoMap: loader.load('/texture/door/ao.jpg'),
      // roughnessMap: loader.load('/texture/door/roughness.jpg'),
      // displacementMap: loader.load('/texture/door/displacement.jpg'),
      // normalMap: loader.load('/texture/door/normal.jpg'),
    });
    // 环境光
    // const ambientLight = new THREE.AmbientLight(0xff0000, 1);//scene.add(ambientLight);
    // scene.add(ambientLight);
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff); directionalLight.position.set(5, 5, 8);// scene.add(directionalLight);
    scene.add(directionalLight);
    // // 平行光辅助器
    const directionalHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(directionalHelper);
    directionalLight.position.set(15, 15, 15);
    // 半球光
    // const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0000ff, 1);//scene.add(hemisphereLight);
    // scene.add(hemisphereLight);
    // 点光源
    // const pointLight = new THREE.PointLight(0xff000, 1, 100);
    // scene.add(pointLight);
    // pointLight.position.set(0, 5, 0)
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
    // scene.add(pointLightHelper);


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
