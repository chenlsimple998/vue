<template>
  <div class="three6">
    <div ref="threeContainer" class="three-container" style="height: 800px;"></div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';
import { } from 'vue'
import { ref, onMounted, nextTick } from 'vue';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// 使用ref来创建一个响应式引用
const threeContainer = ref<HTMLDivElement | null>(null);
onMounted(() => {
  nextTick(() => {
    if (!threeContainer.value) return;
    // 初始化场景
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color('gray');

    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0, -20);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    // 允许投影
    renderer.shadowMap.enabled = true
    threeContainer.value.appendChild(renderer.domElement);
    const control = new OrbitControls(camera, renderer.domElement)
    control.enableDamping = true
    control.addEventListener('change', () => {
      renderer?.render(scene, camera)
    })
    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffff33 }))
    sphere1.position.x = -4
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffff33 }))
    const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffff33 }))
    sphere3.position.x = 4
    scene.add(sphere1, sphere2, sphere3);
    const meshs = [sphere1, sphere2, sphere3];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    window.addEventListener('mousedown', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      console.log('x:',mouse.x, 'y:',mouse.y)
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshs)
    console.log(intersects)
      // for (const mesh of meshs) {
      //   mesh.material.color.set(0x00ff33);
      // }
      // for (const intersectObject of intersects) {
      //   intersectObject.object.material.color.set(0xff0033);
      // }
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
