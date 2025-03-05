<template>
  <div class="three6">
    <div ref="threeContainer" class="three-container" style="height: 500px;"></div>
    <div class="tips">点我进入啊</div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import logo from '../assets/logo.jpg'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { pointShadow } from 'three/src/nodes/lighting/PointShadowNode.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

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
    camera.position.set(0, 10, 50);
    camera.lookAt(0, 0, 0);
    // 光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    // 添加点光源，照亮特定区域
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
    // 允许投影
    renderer.shadowMap.enabled = true
    threeContainer.value.appendChild(renderer.domElement);
    // const gridHelper = new THREE.GridHelper(100);
    // scene.add(gridHelper)
    const control = new OrbitControls(camera, renderer.domElement)
    control.enableDamping = true
    control.addEventListener('change', () => {
      renderer?.render(scene, camera)
    })
    const axisHelper = new THREE.AxesHelper(100);
    scene.add(axisHelper);
    // begin
    // const textureLoader = new THREE.TextureLoader();
    // // const texture = textureLoader.load("../../public/image/house/front.png");
    // const images = [
    //   '../../public/image/house/right.png',
    //   '../../public/image/house/left.png',
    //   '../../public/image/house/top.png',
    //   '../../public/image/house/bottom.png',
    //   '../../public/image/house/back.png',
    //   '../../public/image/house/front.png',
    // ]
    // let matierals: any[] = [];
    // images.forEach((imgUrl) => {
    //   const texture = textureLoader.load(imgUrl);
    //   const material = new THREE.MeshBasicMaterial({ map: texture })
    //   matierals.push(material)
    // })
    // console.log('matierals', matierals)
    // //创建立方体盒子
    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(10, 10, 10),
    //   matierals
    // );
    // cube.position.y = 30
    // cube.geometry.scale(12, 12, -12);
    // scene.add(cube);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../public/image/house/livingRoom.jpg');
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(16, 32, 32),
      new THREE.MeshBasicMaterial({ map: texture })
    )
    sphere.geometry.scale(12, 12, -12);
    scene.add(sphere);

    const spriteTexturelogo = textureLoader.load('../../src/assets/logo.jpg');
    // 点精灵
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: spriteTexturelogo }));
    // const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0xffffff }));
    sprite.scale.set(20, 20, 20);
    sprite.position.set(-100, -10, -80);

    sprite.position.set(-150, 5, -100);
    scene.add(sprite);


    //
    const wInfo = {
      width: threeContainer.value.offsetWidth,
      height: threeContainer.value.offsetHeight
    }
    const oTips = document.querySelector(".tips");
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const rect = threeContainer.value.getBoundingClientRect();

    renderer.domElement.addEventListener("mousemove", (event) => {
      // 计算鼠标相对于渲染区域的位置
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log('mouse:', x, y)
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
      console.log('event:', mouse)
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(sprite);
      console.log(intersects.length);
      if (intersects.length) {
        const worldVector = new THREE.Vector3(intersects[0].object.position.x, intersects[0].object.position.y, intersects[0].object.position.z);
        const dncPostion = worldVector.project(camera);
        const halfw = rect.width / 2;
        const halfH = rect.height / 2;
        const left = halfw * dncPostion.x + halfw;
        const top = -halfH * dncPostion.y + halfH - oTips.clientHeight / 230;
        oTips.style.display = "block";
        oTips.style.left = left - 30 + "px"
        oTips.style.top = top - 40 + "px";
      } else {
        oTips.style.display = "none";
        oTips.style.left = 0;
        oTips.style.top = 0;
      }
    }




    )

    renderer.domElement.addEventListener("mousedown", (event) => {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log('mouse:', x, y)
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
      console.log('event:', mouse)
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(sprite);
      if (intersects.length) {
        const changeTexture = textureLoader.load('../../public/image/house/kitchen.jpg');
        const changeMaterial = new THREE.MeshBasicMaterial({ map: changeTexture });
        const changeSpriteMaterial = new THREE.SpriteMaterial({ map: spriteTexturelogo });
        sprite.material = changeSpriteMaterial;
        sprite.position.set(-150, 40, 40);
        sphere.material = changeMaterial;
      }
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
.three6 {
  position: relative;
}

.tips {
  position: absolute;
  z-index: 999;
  display: none;
}
</style>
