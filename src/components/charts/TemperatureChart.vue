<template>
  <div ref="temperatureRef"
       class=" w-full  h-400  border-solid border-2 border-sky-500 flex justify-center items-end p-4" ></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts/core'
import { useClientStore } from '@/stores/modules/clientStore'
import dayjs from 'dayjs'

const clientStore = useClientStore()

const temperatureRef = ref(null)
const temperatureChart = ref()
const option = ref({
  title: {
    text: '温度',
    left: 'center',
    textStyle: {
      color:'#fff'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: [] as string[],
    name: '时间'
  },
  yAxis: {
    type: 'value',
    name: '温度（℃）'
  },
  series: [
    {
      data: [] as number[],
      type: 'line',
      label: {
        show: true,
        position: 'bottom',
        textStyle: {
          fontSize: 20
        }
      }
    }
  ]
})

const init = () => {
  temperatureChart.value = echarts.init(temperatureRef.value)
  temperatureChart.value?.setOption(option.value)
}

watch(() => clientStore.receivedMsg, msg => {
  msg='LHT34.7X'
  if (msg && msg.slice(0, 3) == 'LHT') {
    const temperate = parseInt(msg.slice(3, -1))
    option.value.series[0].data.push(temperate)
    option.value.xAxis.data.push(dayjs().format('HH:mm:ss'))
    temperatureChart.value?.setOption({
      xAxis: {
        data: option.value.xAxis.data
      },
      series: [
        {
          data: option.value.series[0].data
        }
      ]
    })
  }
},{
  immediate:true
})

onMounted(() => {
  init()
})
</script>

<style lang='less' scoped></style>