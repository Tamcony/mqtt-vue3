<template>
  <div ref="voltageRef"
       class=" w-500 h-400 border-solid border-2 border-sky-500"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'

const voltageRef = ref(null)
const voltageChart = ref()

const init = () => {
  voltageChart.value = echarts.init(voltageRef.value)
  voltageChart.value?.setOption({
    title: {
      text: '电压'
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