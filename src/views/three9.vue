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
    camera.position.set(-10, 20, -20);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    // 允许投影
    renderer.shadowMap.enabled = true
    threeContainer.value.appendChild(renderer.domElement);
    const gridHelper = new THREE.GridHelper(100);
    scene.add(gridHelper)
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
    const raycaster = new THREE.Raycaster();
    const rayOrigin = new THREE.Vector3(-6, 0, 0);
    const rayDirection = new THREE.Vector3(1, 0, 0);
    rayDirection.normalize();
    raycaster.set(rayOrigin, rayDirection);
    const Clock = new THREE.Clock();
    function animate() {
      const elapseTime = Clock.getElapsedTime();
      const meshs = [sphere1, sphere2, sphere3];
      const intersects = raycaster.intersectObjects(meshs)
      sphere1.position.y = Math.sin(elapseTime * 0.5) * 8;
      sphere2.position.y = Math.sin(elapseTime * 0.8) * 8;
      sphere3.position.y = Math.sin(elapseTime) * 8;
      for (const mesh of meshs) {
        mesh.material.color.set(0x00ff33);
      }
      for (const intersectObject of intersects) {
        intersectObject.object.material.color.set(0xff0033);
      }

      requestAnimationFrame(animate)
      renderer?.render(scene, camera)
      control.update()
    }
    animate();
  })


})

</script>
<style lang="less" scoped></style>
