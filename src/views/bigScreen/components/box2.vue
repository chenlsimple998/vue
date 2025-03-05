<template>
  <DecorativeBox>
    <template #title>
      {{ title }}
    </template>
    <template #tool>
      <div style="display: flex;align-items: center;"> <i class="fa fa-refresh"></i>
        <i class="roundArrow fa fa-angle-left"></i>
        <span class="pagination"> 3/6</span>
        <i class="roundArrow fa fa-angle-right"></i>
      </div>

    </template>
    <template #content>
      <div class="sim1EchartTitle">
        <span id="plab" style="float:left;">改判率(%)</span>
        <!-- <ul class="sim1EchartClass" style="margin-left:10px;">
                  <li v-for="(item, index) in dateSelectArr1" :key="index" :value="item.value">{{ item.name }}</li>
              </ul>
              <ul class="sim1EchartClass " style="margin-left:10px;">
                  <li v-for="(item, index) in dateSelectArr2" :key="index" :value="item.value">{{ item.name }}</li>
              </ul> -->
        <div class="time">
          <span v-for="(item, index) in dateSelectArr3" :key="index">{{ item.name }}</span>
        </div>
        <div class="operation">
          <div title="添加" class="lr-add-chart"><i class="fa fa-plus"></i></div>
          <div title="修改" class="updateChart" @click="openEditChart"><i class="fa fa-pencil"></i></div>
          <div title="删除" class="delChart"><i class="fa fa-trash"></i></div>
        </div>
      </div>
      <div class="sim1Echart" id="chart">
        <charts></charts>
      </div>
      <fullPagePop v-model="showDialog">
        <charts></charts>
      </fullPagePop>
      <MultipleCharEdit ref="MultipleCharEditRef"></MultipleCharEdit>
    </template>
  </DecorativeBox>
</template>

<script setup lang="js">
import DecorativeBox from '@/components/bigScreen/DecorativeBox.vue';
</script>
