<template>
  <div class="three3">
    <div ref="threeContainer" class="three-container" style="height: 500px;"></div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
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
    const loader = new THREE.TextureLoader()
    loader.load('', (texture) => {
      scene.background = texture
    })
    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
    // camera.position.z = 5;
    // camera.position.y = 2;
    camera.position.set(2, 20, 20);
    camera.lookAt(0, 0, 0);
    //{canvas: document.querySelector('.cvs1') as HTMLCanvasElement}
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    threeContainer.value.appendChild(renderer.domElement);
    const gridHelper = new THREE.GridHelper(100);

    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(25, 25, 25),
    //   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // );
    // scene.add(cube, gridHelper);
    const control = new OrbitControls(camera, renderer.domElement)


    // BufferGeometry
    const gemetry2 = new THREE.BufferGeometry();
    // Float32Array
    const vertices = new Float32Array([
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.8, 1.0, 1.0, -1.8, 1.0, 1.0, -1.0, -1.0, 1.0,
    ])
    const colors = new Float32Array([
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0
    ])
    gemetry2.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    gemetry2.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    // 创建结构 几何体
    // const gemetry = new THREE.ConeGeometry(5, 20, 32);
    const gemetry = new THREE.PlaneGeometry(5, 5, 50, 50);
    // 创建材质 外观
    const material = new THREE.MeshBasicMaterial(
      {
        // color: 0xff11ff,
        vertexColors: true,
        wireframe: true  //线框图
      }
    )
    // 结构与材质组合,生成一个物体
    const mesh = new THREE.Mesh(gemetry2, material);
    scene.add(mesh)
    control.enableDamping = true
    control.addEventListener('change', () => {
      renderer?.render(scene, camera)
      // console.log(control.target)
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
