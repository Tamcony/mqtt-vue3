<template>
  <div ref="powerRef"
       class=" w-1000 h-816 border-solid border-2 border-sky-500"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'

const powerRef = ref(null)
const powerChart = ref()

const init = () => {
  powerChart.value = echarts.init(powerRef.value)
  powerChart.value?.setOption({
    title: {
      text: '功率'
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