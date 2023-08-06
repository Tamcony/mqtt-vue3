<template>
  <div ref="electricRef"
       class=" w-500 h-400 border-solid border-2 border-sky-500"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'

const electricRef = ref(null)
const electricChart = ref()

const init = () => {
  electricChart.value = echarts.init(electricRef.value)
  electricChart.value?.setOption({
    title: {
      text: '电流'
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