<template>
  <div class="three6">
    <div ref="threeContainer" class="three-container" style="height: 800px;"></div>
    <div class="left">
      <Panel>
        <div>be careful</div>

      </Panel>
    </div>
    <div class="right">
      <Panel>
        <PieChart></PieChart>
      </Panel>
    </div>

    <div class="posColorPicker">
      <color-picker v-model:pureColor="pureColor" v-model:gradientColor="gradientColor"
        @pureColorChange="updateColor"></color-picker> <br>
      点击色块更换战甲
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three';
import { version } from 'vue'
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { ColorInputWithoutInstance } from "tinycolor2";
import logo from '../assets/logo.jpg'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { pointShadow } from 'three/src/nodes/lighting/PointShadowNode.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import Panel from '@/components/Panel/index.vue';
import PieChart from '@/components/Charts/PieChart.vue';
// 使用ref来创建一个响应式引用
const threeContainer = ref<HTMLDivElement | null>(null);
const renderer: THREE.WebGLRenderer | null = null;
const pureColor = ref<ColorInputWithoutInstance>("yellow");
const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");
const isShowColorPicker = ref(false);
const showColor = () => {
  pureColor.value = "yellow";
  // isShowColorPicker.value = !isShowColorPicker.value;
}
const duckObj = ref(null);
const updateColor = (color: ColorInputWithoutInstance) => {
  pureColor.value = color;
  if (duckObj.value) {
    // duckObj.material.color = new THREE.Color(color);
    duckObj.value.children[0].children[0].material.color.set(color);
    console.log(duckObj.value);
  }

}


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
    // 光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
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

    // const pointLight = new THREE.PointLight(0xfffffff, 800, 80);
    // pointLight.position.set(20, 30, 0)
    // pointLight.castShadow = true;
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
    // scene.add(pointLight, pointLightHelper);
    // //  阴影投射  光源  物体 渲染器
    // const plane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(100, 100),
    //   new THREE.MeshStandardMaterial({ color: 0xffffff })
    // );
    // plane.rotation.x = -Math.PI / 2;
    // // 设置接受阴影
    // plane.receiveShadow = true
    // scene.add(plane);
    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(10, 10, 10),
    //   new THREE.MeshStandardMaterial({ color: 0xff000 })
    // );
    // cube.position.set(0, 10, 0);
    // cube.castShadow = true
    // scene.add(cube);

    // 加载模型
    // 创建 DRACOLoader 实例
    const dracoLoader = new DRACOLoader();
    // 设置 Draco 解码库的路径
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load('/model/city.glb', (gltf) => {
      console.log('gltf', gltf)
      scene.add(gltf.scene);
    }, (xhr) => {
      // console.log(xhr);
    })
    gltfLoader.load('/model/Duck.glb', (gltf) => {
      console.log('Duck', gltf)
      gltf.scene.scale.set(5, 5, 5);
      scene.add(gltf.scene);
      duckObj.value = gltf.scene
      console.log('duckObj:add.value', duckObj.value)
    }, (xhr) => {
      // console.log(xhr);
    })

    const control = new OrbitControls(camera, renderer.domElement)
    control.enableDamping = true
    control.addEventListener('change', () => {
      renderer?.render(scene, camera)
    })
    const angele = 0;

    function animate() {
      // angele += 0.01;
      // pointLight.position.x = 30 * Math.cos(angele)
      // pointLight.position.z = 30 * Math.sin(angele)
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

.left {
  position: absolute;
  left: 10px;
  top: 70px;
  width: 200px;
}

.right {
  position: absolute;
  right: 10px;
  top: 70px;
  width: 200px;
}

.posColorPicker {
  position: absolute;
  bottom: 100px;
  text-align: center;
  color: #ffff;
  left: 50%;
  margin-left: -30px;
}
</style>
