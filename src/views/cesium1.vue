<template>
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMTQ0NzI2Zi05MjI3LTQzNzktYWRkNi04MzUzMjQ5MTA3MmEiLCJpZCI6Mjc0OTU5LCJpYXQiOjE3MzkyMzQ1NzB9.Qr2bGnNvjAHuXUtr0plDfNXirXapXVwRC2p-NFzM8yU'
  // viewer 是所有API的开始
  // 默认谷歌影像图层 这里使用ArcGIS影像图层
  const esri = new Cesium.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/Mapserver",
    enablePickFeatures: false,
  })
  const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: esri,// 自定义图层
    terrainProvider: Cesium.createWorldTerrain(), //地形图层
    requestWaterMask: true, //水面特效 没必要的话无需设置
    // 隐藏控件
    timeline: false, // 控制下方时间轴控件
    animation: false, // 控制左下角的动画控件
    geocoder: false, // 控制右上角第一个位置的搜索按钮
    homeButton: false, // 控制右上角第二个位置的home图标-主页按钮
    sceneModePicker: false, // 投影方式按钮 控制右上角第三个位置的选择视角模式，2d，3d
    baseLayerPicker: false, // 控制右上角第四个位置的图层选择按钮
    navigationHelpButton: false, // 控制右上角第五个位置的帮助按钮
    vrButton: false, // 右下角vr按钮
    infoBox: false, // 不显示点击要素之后显示的信息
    selectionIndicator: false, // 隐藏选中状态
    shouldAnimate: true, // 允许动画同步
    fullscreenButton: false, // 右下角全屏按钮
  })
  viewer._cesiumWidget._creditContainer.style.display = "none";//取消版权信息

  const point = new Cesium.Entity({
    position: Cesium.Cartesian3.fromDegrees(120, 30),
    point: {
      pixelSize: 20, // 点像素大小
      color: Cesium.Color.BLUE
    }
  })
  viewer.entities.add(point)
  viewer.zoomTo(point)
  const billboard = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(121, 30, 10),
    billboard: {
      image: '/src/assets/logo.jpg',
      scale: 0.3,
      color: Cesium.Color.WHITE
    }
  })
  // viewer.zoomTo(billboard)

  // 标题
  const label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(112, 30, 20000),
    label: {
      text: '文字标题label',
      fillColor: Cesium.Color.YELLOWGREEN, // 颜色变量
      showBackground: true,
      backgroundColor: new Cesium.Color(255, 255, 0) // new 因为后面是个类 要实例化
    }
  })
  // viewer.zoomTo(label)
  const polyline = viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([120, 20, 121, 20, 121, 20.5]),
      width: 10,
      material: Cesium.Color.YELLOW,
    }
  })
  viewer.zoomTo(polyline)
  const polygon = viewer.entities.add({
    name: "polygon_height",
    polygon: {
      hierarchy: {
        positions: Cesium.Cartesian3.fromDegreesArray([110, 30, 120, 230, 115, 40])
      },
      height: 100000,
      extrudedHeight: 200000, // 设置后会拉升
      material: Cesium.Color.RED,
      outline: true, //是否显示外线
      outlineColor: Cesium.Color.WHITE,
      fill: false //是否填充
    }
  })

  // viewer.zoomTo(polygon)
  let lon, lat, num = 0
  // 线
  const line = viewer.entities.add({
    polyline: {
      positions: new Cesium.CallbackProperty(() => {
        num += 0.005
        lon = 120 + num
        lat = 30 + num
        // 到121时停止延长
        if (lon < 121) {
          return Cesium.Cartesian3.fromDegreesArray([120, 30, lon, lat])
        } else {
          //给positions赋值一个新的对象，不再需要callbackProperty提供 否则一直循环
          line.polyline.positions = Cesium.Cartesian3.fromDegreesArray([120, 30, 121, 31])
        }
      }, false), // 不传false不动
      width: 10,
      material: Cesium.Color.YELLOW,
    }
  })
  viewer.zoomTo(line)
})
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

// 隐藏图标 不要放在scoped的样式中无效
<style>
.cesium-viewer-bottom {
  display: none;
}
</style>
