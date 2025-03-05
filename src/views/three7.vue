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
import { pointShadow } from 'three/src/nodes/lighting/PointShadowNode.js';
// 使用ref来创建一个响应式引用
let threeContainer = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer | null = null;

onMounted(() => {
  nextTick(() => {
    if (!threeContainer.value) return;
    // 初始化场景
    let scene = new THREE.Scene();
    // scene.background = new THREE.Color('gray');

    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
    camera.position.set(-10, 20, -50);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    // 允许投影
    renderer.shadowMap.enabled = true
    threeContainer.value.appendChild(renderer.domElement);
    const gridHelper = new THREE.GridHelper(100);
    scene.add(gridHelper)
    // 光源
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(ambientLight);
    // const directionalLight = new THREE.DirectionalLight(0xffffff);
    // directionalLight.position.set(-30, 30, 0);
    // //
    // directionalLight.castShadow = true;
    // // 可以让阴影不毛躁mapSize.width mapSize.height
    // directionalLight.shadow.mapSize.width = 2048;
    // directionalLight.shadow.mapSize.height = 2048;
    // scene.add(directionalLight);
    // const directionalHelper = new THREE.DirectionalLightHelper(directionalLight);
    // scene.add(directionalHelper);

    const pointLight = new THREE.PointLight(0xfffffff, 200, 100);
    pointLight.position.set(20, 30, 0)
    pointLight.castShadow = true;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
    scene.add(pointLight, pointLightHelper);
    //  阴影投射  光源  物体 渲染器
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    plane.rotation.x = -Math.PI / 2;
    // 设置接受阴影
    plane.receiveShadow = true
    scene.add(plane);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xff000 })
    );
    cube.position.set(0, 10, 0);
    cube.castShadow = true
    scene.add(cube);
    const control = new OrbitControls(camera, renderer.domElement)
    control.enableDamping = true
    control.addEventListener('change', () => {
      renderer?.render(scene, camera)
    })
    let angele = 0;

    function animate() {
      angele += 0.01;
      pointLight.position.x = 30 * Math.cos(angele)
      pointLight.position.z = 30 * Math.sin(angele)
      requestAnimationFrame(animate)
      renderer?.render(scene, camera)
      control.update()
    }
    animate();
  })


})

</script>
<style lang="less" scoped></style>
