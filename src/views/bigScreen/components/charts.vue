<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, reactive } from 'vue';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');
const resData = { "code": 200, "info": "响应成功", "data": { "title": "产量(t)", "TargetValue": 1, "KPINames": "产量", "ChartType": "2", "Units": "t", "Period": "5,0,1,3,4", "TargetVisible": null, "pieChart": [], "webChart": { "times": null, "value1": null, "value2": null, "value3": null, "value4": null, "value5": null, "value6": null, "target1": null, "target2": null, "target3": null, "target4": null, "target5": null, "target6": null }, "lstWebChart": [{ "code": "15", "codeName": "产量", "codeUnit": "t", "visible": 1, "aboveVisible": 0, "belowVisible": 0, "ZCYS": "#7FBA7A", "MBYS": "#007AFF", "MBXXYS": "#7FBA7A", "MBSXYS": "#7FBA7A", "SXYS": "#7FBA7A", "XXYS": "#CC0000", "CSXYS": "#7FBA7A", "CXXYS": "#7FBA7A", "times": ["11时", "12时", "13时", "14时", "15时", "16时", "17时"], "value": ["21", "26", "19", "19", "19", "25", "19"], "target": ["23", "23", "23", "23", "23", "23", "23"], "above_target": [null, null, null, null, null, null, null], "below_target": [null, null, null, null, null, null, null], "StrFormat": 0, "ChartNumber": null, "ChartInterval": null }] } };
const chartsOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      //设置阴影指示器颜色
      shadowStyle: {
        color: "rgba(255, 255, 255,0.1)"
      },
      color: "#BDD8FF"
    }
  },
  color: 'red',//设定的正常颜色值
  legend: {
    data: {},
    show: true,
    icon: "circle",
    bottom: 0,
    textStyle: {
      color: "#BDD8FF"
    },
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 10
  },
  grid: {
    top: 50,
    left: 20,
    right: 0,
    bottom: 30,
    containLabel: true
  },
  xAxis: {
    // data: items[0].times,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: "24",
      textStyle: {
        color: "#5A9DFF",
      }
    },
    splitLine: {
      show: false
    },
  },
  yAxis: {
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#5A9DFF",
        fontSize: "24"
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(189,216,255,0.4)",
        type: 'solid'
      }
    }
  },
  // series: series
});
const option = ref({
  title: {
    text: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['28日11点', '28日12点', '28日13点', '28日14点', '28日15点'],
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '28日11点' },
        { value: 310, name: '28日12点' },
        { value: 234, name: '28日13点' },
        { value: 135, name: '28日14点' },
        { value: 1548, name: '28日15点' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

const option2 = ref({
  title: {
    text: '改判率趋势分析',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      return params[0].name + '<br/>' +
        params[0].marker + params[0].seriesName + ': ' + params[0].value + '%<br/>' +
        params[1].marker + params[1].seriesName + ': ' + params[1].value + '%';
    }
  },
  legend: {
    data: ['改判率', '目标值'],
    top: 30
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['01/21', '01/22', '01/23', '01/24', '01/25', '01/26', '01/27'],
    axisLabel: {
      color: '#666'
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 3.5,
    axisLabel: {
      formatter: '{value}%'
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: '改判率',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#5470C6'
      },
      lineStyle: {
        width: 3
      },
      data: [3, 2.91, 2.97, 2.5, 2, 1.5, 0.5]
    },
    {
      name: '目标值',
      type: 'line',
      symbol: 'none',
      lineStyle: {
        type: 'dashed',
        color: '#EE6666',
        width: 2
      },
      data: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
    }
  ]
});
const series = reactive([]);
const xAxisData = reactive([]);
const setColor = reactive([]);
// series.forEach(item => {
//     setColor.push(item.name);
// })
const max = ref(0);
const min = ref(0);
const interval = (max.value - min.value) / 5;
const barChartOption = reactive({
  max: max.value,
  min: min.value,
  interval: interval,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      //设置阴影指示器颜色
      shadowStyle: {
        color: "rgba(255, 255, 255,0.1)"
      },
      color: "#BDD8FF"
    }
  },
  color: setColor,//设定的正常颜色值
  legend: {
    data: setColor,
    show: true,
    icon: "circle",
    bottom: 0,
    textStyle: {
      color: "#BDD8FF"
    },
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 10
  },
  grid: {
    top: 20,
    left: 0,
    right: 0,
    bottom: 30,
    containLabel: true
  },
  xAxis: {
    data: xAxisData,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#BDD8FF"
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#BDD8FF"
      },
      showMaxLabel: true,
      showMinLabel: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(189,216,255,0.4)",
        type: 'solid'
      }
    }
  },
  series: series
}


)
const lineChartOption = reactive(


)
const barMultipleChartOption = reactive(
  {
    title: {
      top: 4,
      left: 0,
      text: name,
      textStyle: {
        color: '#BDD8FF',
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        //设置阴影指示器颜色
        shadowStyle: {
          color: "rgba(255, 255, 255,0.1)"
        },
        color: "#BDD8FF"
      }
    },
    legend: {
      show: false,
      right: 0,
      top: 0,
      textStyle: {
        color: "#BDD8FF"
      },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10
    },
    grid: {
      top: 34,
      left: 0,
      right: 0,
      bottom: 10,
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: xAxisData, //item[0].times
      axisLine: {
        show: false,
        lineStyle: {
          color: "#BDD8FF",
          width: 1,
          type: "solid"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#BDD8FF"
        }
      },
    }, {
      type: 'category',
      data: xAxisData,  //item.times
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
    }],
    yAxis: [{
      type: 'value',
      // name: '万m³',
      axisLabel: {
        formatter: '{value}'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#BDD8FF",
          width: 1,
          type: "solid"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(189,216,255,0.4)",
          type: 'solid'
        }
      }
    }],
    series: series
  }

)
const barChartStyleOption2 = reactive(
  {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        //设置阴影指示器颜色
                        shadowStyle: {
                            color: "rgba(255, 255, 255,0.1)"
                        },
                        color: "#BDD8FF"
                    }
                },
                legend: {
                    show: true,
                    icon: "circle",
                    bottom: 0,
                    textStyle: {
                        color: "#BDD8FF"
                    },
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 10
                },
                grid: {
                    top: 20,
                    left: 0,
                    right: 30,
                    bottom: 20,
                    containLabel: true
                },
                xAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#BDD8FF"
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    data: xAxisData, //items[0].times
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#BDD8FF"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(189,216,255,0.4)",
                            type: 'solid'
                        }
                    }
                },
                series: series
            }

)
const pieChartOption = reactive(
  {
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow',
                        //设置阴影指示器颜色
                        shadowStyle: {
                            color: "rgba(255, 255, 255,0.1)"
                        },
                        color: "#BDD8FF"
                    }
                },
                legend: {
                    show: true,
                    orient: "vertical",
                    icon: "circle",
                    type: "scroll",
                    right: 20,
                    top: "middle",
                    textStyle: {
                        color: "#BDD8FF"
                    },
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 10
                },
                grid: {
                    top: 20,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    containLabel: true
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: "90%",
                        center: ['30%', '50%'],
                        roseType: 'radius',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: series
                    }
                ],
            }

)
const pieChartOption2 = reactive(
  {
                grid: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    containLabel: true
                },
                legend: {
                    show: true,
                    icon: "circle",
                    top: "center",
                    right: 20,
                    textStyle: {
                        color: "#BDD8FF"
                    },
                    vitemWidth: 10,
                    itemHeight: 10,
                    itemGap: 2,
                    formatter: function (name) {
                        // return name + "        " + (objData[name].value)
                        return name + "        " 
                    },
                },
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a}<br>{b}:{c}({d}%)"
                },
                color: ['rgb(108, 93, 211)', 'rgb(0, 122, 255)', 'rgb(229, 171, 75)', 'rgb(127, 186, 122)'],
                xAxis: [{
                    show: false
                }],
                series: series
            }

)

</script>

<style scoped lang="less">
.chart {
  height: 100%;
}
</style>