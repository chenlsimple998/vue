<template>
  <div class="three4">
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
let threeContainer = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer | null = null;

onMounted(() => {
  nextTick(() => {
    if (!threeContainer.value) return;
    // 初始化场景
    let scene = new THREE.Scene();
    // scene.background = new THREE.Color('gray');

    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
    camera.position.set(2, 30, 20);
    camera.lookAt(0, 0, 0);
    //{canvas: document.querySelector('.cvs1') as HTMLCanvasElement}
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    threeContainer.value.appendChild(renderer.domElement);
    const gridHelper = new THREE.GridHelper(100);
    // 创建结构 几何体  BoxGeometry 正方体10, 10, 10  SphereGeometry球体10, 32, 32
    // const geometry = new THREE.SphereGeometry(10, 32, 32);
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const loader = new THREE.TextureLoader()
    const textTure = loader.load(logo)
    //MeshBasicMaterial  不收光的影响
    //MeshStandardMaterial 标准网格材质受光的影响
    const material = new THREE.MeshStandardMaterial({
      color: 0xff000,
      //粗糙材质
      roughness: 0.5,
      // 金属材质
      metalness: 0.5,
      ////贴图
      //// map: textTure,
      // 自发光
      // emissive: 0x000000
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
<style lang="less" scoped>
.cvs1,
.cvs2 {
  width: 500px;
  height: 500px;
  margin: 0 20px;
  border: 1px solid #0000;
}
</style>
