<template>
  <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, width: '100%', height: '100%' }">
    <slot></slot>
  </a-layout-content>
</template>
<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, computed, watch } from 'vue';
// 定义一个接口来描述 pageConfig 中对象的结构
interface PageConfigItem {
  name: string;
  router: string;
  children?: PageConfigItem[]; // 使用 ? 表示 children 属性是可选的
}
const pageConfig: PageConfigItem[] = [
  {
    name: 'three',
    router: '/three',
    children: [
      { name: 'three1', router: '/three/three1' },
      { name: 'three2', router: '/three/three2' },
      { name: 'three3', router: '/three/three3' },
      { name: 'three4', router: '/three/three4' },
      { name: 'three5', router: '/three/three5' },
      { name: 'three6', router: '/three/three6' },
      { name: 'three7', router: '/three/three7' },
      { name: 'three8', router: '/three/three8' },
      { name: 'house', router: '/three/house' },
    ]
  },
  {
    name: 'cesium',
    router: '/cesium',
    children: [
      { name: 'cesium1', router: '/cesium/cesium1' },
      { name: 'cesium2', router: '/cesium/cesium2' },
      { name: 'cesium3', router: '/cesium/cesium3' },
      { name: 'cesium4', router: '/cesium/cesium4' },
      { name: 'cesium5', router: '/cesium/cesium5' }
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
const watchE = watch(selectedKeys1, (newVal, oldVal) => {
  console.log(newVal, oldVal)
  if (newVal[0] === 0) {
    openKeys.value = ['sub1']
  } else {
    openKeys.value = ['sub' + newVal[0]]
    selectedKeys2.value[0] = 'sub0'
  }
})
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
