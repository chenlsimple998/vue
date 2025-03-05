<template>
  <DecorativeBox @click="sim1MeritsClick">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <div class="sim1Merits">
        <div class="num">{{ performanceData.lineCodeMonth5 }}</div>
        <ul>
          <li>
            <div>
              甲组 <span>{{ performanceData.lineCodeMonth1 }}</span>
            </div>
          </li>
          <li>
            <div>
              乙组 <span>{{ performanceData.lineCodeMonth2 }}</span>
            </div>
          </li>
          <li>
            <div>
              丙组 <span>{{ performanceData.lineCodeMonth3 }}</span>
            </div>
          </li>
          <li>
            <div>
              丁组 <span>{{ performanceData.lineCodeMonth4 }}</span>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </DecorativeBox>
</template>

<script lang="js" setup name="Merits">
import DecorativeBox from '@/components/bigScreen/DecorativeBox.vue';
import { defineProps, ref, defineEmits, onMounted, toRefs } from 'vue';

// 定义一个响应式对象来存储数据
const performanceData = ref({
  lineCodeMonth1: 0,
  lineCodeMonth2: 0,
  lineCodeMonth3: 0,
  lineCodeMonth4: 0,
  lineCodeMonth5: 0,
});

// 使用 toRefs 解构响应式对象

const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  title: {
    type: String,
    default: ''
  }
});

const getPerformanceFn = () => {

};

// 定义一个事件处理函数
const emit = defineEmits(['childMessage']);
const isShowMaritBox = ref(true);
const dialogRef = ref(null);

const sendMessageToParent = () => {
  // 触发自定义事件并传递数据
  emit('childMessage', '这是来自子组件的消息');
};

const sim1MeritsClick = () => {
  if (dialogRef.value) {
    dialogRef.value.open();
  }
};

onMounted(() => {
  // 组件挂载后执行的代码
  console.log('组件已挂载到 DOM');
  console.log('当前 message 的值:', props);
  getPerformanceFn();
});
</script>

<style scoped lang="less">
.sim1Merits {
  display: flex;
  height: 100%;
  padding-bottom: 5px;

  .num {
    width: 100px;
    font-size: 48px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #FFBA16;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    color: #BDD8FF;

    li {
      width: 50%;
      height: 50%;
      padding-left: 5px;
      padding-bottom: 5px;

      div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, rgba(32, 87, 255, 0.4) 0, rgba(36, 117, 254, 0.4) 100%);
        cursor: pointer;
      }

      span {
        font-size: 22px;
        font-family: DINAlternate-Bold, DINAlternate;
        color: #00FFC2;
        margin-left: 10px;
        font-weight: 600;
      }
    }
  }
}
</style>
