<template>
  <div ref="temperatureRef"
       class=" w-500 h-400 border-solid border-2 border-sky-500"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'
import { useMqttClient } from '@/apis/useMqttClient'

const { send } = useMqttClient()

const temperatureRef = ref(null)
const temperatureChart = ref()

const init = () => {
  temperatureChart.value = echarts.init(temperatureRef.value)
  temperatureChart.value?.setOption({
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
  send('LHT')
})
</script>

<style lang='less' scoped></style>