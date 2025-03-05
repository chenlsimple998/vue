<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo"> <img src="../../assets/logo.jpg" alt=""></div>
      <div class="right" style="float: right; color: #fff; line-height: 15px;padding-top: 20px;">
        <span>Author:chen</span> <br>
        <span>QQ群:1007063235</span>
      </div>
      <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys1" :style="{ lineHeight: '64px' }"
        @select="handleMenuSelect">
        <a-menu-item :key="index" v-for="(item, index) in pageConfig">
          <router-link :to="item.router" :target="item.target"></router-link>
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys"
          :style="{ height: '100%', borderRight: 0 }" @select="handleMenuSubSelect">
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <LaptopOutlined />
                {{ pageConfig[selectedKeys1[0]].name }}
              </span>
            </template>
            <a-menu-item v-if="childrenComputed" :key="`sub` + (SubIndex)"
              v-for="(subItem, SubIndex) in childrenComputed">
              <router-link :to="subItem.router"></router-link>
              {{ subItem.name }}
            </a-menu-item>
          </a-sub-menu>

        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, computed, watch } from 'vue';
// 定义一个接口来描述 pageConfig 中对象的结构
interface PageConfigItem {
  name: string;
  router: string;
  target?: string;
  children?: PageConfigItem[]; // 使用 ? 表示 children 属性是可选的
}
const pageConfig: PageConfigItem[] = [
  {
    name: 'three',
    router: '/three/three1',
    children: [
      { name: '3d模型:three8', router: '/three/three8' },
      { name: '3d:house', router: '/three/house' },
      { name: '3d:几何体:three1', router: '/three/three1' },
      { name: '3d:轨道控制器:three2', router: '/three/three2' },
      { name: '3d:float32Array', router: '/three/three3' },
      { name: '3d:贴图:three4', router: '/three/three4' },
      { name: '3d:材质:three5', router: '/three/three5' },
      { name: '3d:光源:three6', router: '/three/three6' },
      { name: '3d:光源&阴影:three7', router: '/three/three7' },
      { name: '3d:raycaster:three9', router: '/three/three9' },
    ]
  },
  {
    name: 'cesium',
    router: '/cesium/cesium1',
    children: [
      { name: '点线面贴图标注:cesium1', router: '/cesium/cesium1' },
      { name: '3dtitle:瓦片:cesium2', router: '/cesium/cesium2' },
      { name: '模型加载:cesium3', router: '/cesium/cesium3' },
      { name: '随线运动', router: '/cesium/cesium4' },
      { name: '粒子:烟雾', router: '/cesium/cesium5' }
    ]
  },
  {
    name: '大屏',
    router: '/bigScreen',
    // 注意：bigScreen 没有 children 属性，这是允许的，因为 children 是可选的
  },
];

const selectedKeys1 = ref<number[]>([0]),
  selectedKeys2 = ref<number[]>([0]),
  collapsed = ref<boolean>(false),
  openKeys = ref<string[]>(['sub1']);
const childrenComputed = computed(() => {
  return pageConfig[selectedKeys1.value[0]]?.children;
})
const handleMenuSubSelect = (e) => {
  selectedKeys2.value = [e.key];
};
const handleMenuSelect = (e) => {
  selectedKeys1.value = [e.key];
};

</script>
<style lang="less" scoped>
.logo {
  float: left;
  width: 60px;
  height: 60px;
  margin: 0px 24px 0px 0;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}

.ant-row-rtl .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
