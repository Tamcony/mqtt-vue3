<template>
  <div ref="humidnessRef"
       class=" w-500 h-400 border-solid border-2 border-sky-500"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'

const humidnessRef = ref(null)
const humidnessChart = ref()

const init = () => {
  humidnessChart.value = echarts.init(humidnessRef.value)
  humidnessChart.value?.setOption({
    title: {
      text: '温度'
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ]
  })
}

onMounted(() => {
  init()
})
</script>

<style lang='less' scoped></style>