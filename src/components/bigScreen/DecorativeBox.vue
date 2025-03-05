<template>
  <div class="box topRItem" :style="{ width: `calc(${width} - 10px)`, height: `calc(${height} - 10px)` }">
    <span class="boxConerL"></span><span class="boxConerR"></span>
    <div class="boxTop default" v-if="$slots.default">
      <slot name="default">
      </slot>
    </div>
    <div class="boxTop" v-else-if="$slots.title">

      <div class="title">
        <slot name="title"></slot>
        <i v-if="enlarge" class="iconFullScreen fa fa-arrows-alt" @click="enLargeFn"></i>
      </div>

      <slot name="titleMid" v-if="$slots.titleMid">
        <div class="middle"></div>
      </slot>
      <div v-if="$slots.tool" class="topRight">
        <slot name="tool"></slot>
      </div>
    </div>
    <div v-if="$slots.content" class="boxContent" :class="{ contentCenter: props.contentCenter }"
      :style="{ height: isComptedContentH ? `calc(100% - 40px)` : `auto` }">
      <slot name="content"></slot>
    </div>
    <div class="tool" v-if='props.isEdit'>
      <div class="buttons">
        <div @click="editFn">编辑</div>|
        <div @click="deleteFn">删除</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['enLargeEmit']);
const enLargeFn = () => {
  // 触发自定义事件并传递数据
  console.log('decorativeBo发送事件')
  emit('enLargeEmit', true);
};
const props = defineProps({
  enlarge: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  isComptedContentH: {
    type: Boolean,
    default: true
  },
  contentCenter: {
    type: Boolean,
    default: false
  },
  isEdit: {
    type: Boolean,
    default: false
  },
});
const StatisticsItemEditRef = ref(null)
const editFn = () => {
  StatisticsItemEditRef?.value.open()
}
const deleteFn = () => {

}
</script>
<style lang="less" scoped>
.iconFullScreen {
  font-size: 14px;
  color: #007AFF;
  margin-left: 10px;
  cursor: pointer;
}

.box {
  position: relative;
  margin-bottom: 10px;
  margin-right: 10px;
  background: linear-gradient(135deg, #026 0, #003a94 100%);
  padding: 0 10px;
  overflow: hidden;

  &:hover .tool {
    display: block;
  }

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-top: 1px solid #2475fe;
    border-left: 1px solid #2475fe;
    position: absolute;
    top: 0;
    left: 0;
  }

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-top: 1px solid #2475fe;
    border-right: 1px solid #2475fe;
    position: absolute;
    top: 0;
    right: 0;
  }

  .boxConerL {
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 1px solid #2475fe;
    border-left: 1px solid #2475fe;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .boxConerR {
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 1px solid #2475fe;
    border-right: 1px solid #2475fe;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .boxTop {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    line-height: 40px;
    color: #BDD8FF;

    &default {

      &::before,
      &::after {
        display: none;
      }
    }

    &::before {
      content: '';
      width: 7px;
      height: 3px;
      background: #06F;
      position: absolute;
      bottom: -2px;
      left: 0;
    }

    &::after {
      content: '';
      width: 7px;
      height: 3px;
      background: #06F;
      position: absolute;
      bottom: -2px;
      right: 0;
    }

    .title {
      text-align: left;
      font-size: 20px;

      .el-icon {
        position: relative;
        top: 3px;
      }
    }

    .middle {
      flex: 1;
    }

    .topRight {}
  }

  .boxContent {
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    box-sizing: border-box;

    &.contentCenter {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 0;
    }
  }
}

.tool {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #1d1d1d;
  color: #fff;
  display: none;
  cursor: pointer;

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      width: 50%;
      cursor: pointer;
    }
  }
}
</style>
