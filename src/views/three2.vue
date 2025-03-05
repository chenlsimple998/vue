<template>
  <div class="three2">
    <div ref="threeContainer" class="three-container" style="height: 500px;"></div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import logo from '../assets/logo.jpg'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// 使用ref来创建一个响应式引用
let threeContainer = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer | null = null;
const cleanupScene = () => {
  threeContainer.value = null
};
onBeforeUnmount(() => {
  cleanupScene();
});
onMounted(() => {
  nextTick(() => {
    if (!threeContainer.value) return;
    // 初始化场景
    let scene = new THREE.Scene();

    // const loader = new THREE.TextureLoader()
    // loader.load('', (texture) => {
    //   scene.background = texture
    // })
    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
    // camera.position.z = 5;
    // camera.position.y = 2;
    camera.position.set(2, 200, 20);
    camera.lookAt(0, 0, 0);
    //{canvas: document.querySelector('.cvs1') as HTMLCanvasElement}
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    threeContainer.value.appendChild(renderer.domElement);
    const gridHelper = new THREE.GridHelper(100);

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(25, 25, 25),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    scene.add(cube, gridHelper);
    const control = new OrbitControls(camera, renderer.domElement)
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

    // let isDown = false;
    // let startx = 0;
    // let currentX = 0;
    // renderer.domElement.addEventListener('mousedown', (e: MouseEvent) => {
    //   isDown = true;
    //   startx = e.clientX;

    //   console.log('mounseDown', e)
    // })
    // renderer.domElement.addEventListener('mousemove', (e: MouseEvent) => {
    //   if (isDown) {
    //     const distanceX = e.clientX - startx;
    //     currentX += distanceX * 0.01
    //     startx = e.clientX;
    //     camera.position.x = 40 * Math.cos(currentX)
    //     camera.position.z = 40 * Math.sin(currentX)
    //     camera.lookAt(0, 0, 0)
    //   }
    //   console.log('mounseMove', e)
    // })
    // renderer.domElement.addEventListener('mouseup', (e: MouseEvent) => {
    //   isDown = false
    //   console.log('mounseUp', e)
    // })
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
