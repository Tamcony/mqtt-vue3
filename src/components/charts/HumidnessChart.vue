<template>
  <div ref="humidnessRef"
       class="w-full h-400  border-solid border-2 border-sky-500 flex justify-center items-end"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts'
import { useClientStore } from '@/stores/modules/clientStore'
import dayjs from 'dayjs'

const clientStore = useClientStore()

const humidnessRef = ref(null)
const humidnessChart = ref()
const option = ref({
  title: {
    text: '湿度',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: [] as string[]
  },
  yAxis: {
    type: 'value'
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
  humidnessChart.value = echarts.init(humidnessRef.value)
  humidnessChart.value?.setOption(option.value)
}

watch(() => clientStore.receivedMsg, msg => {
  if (msg && msg.slice(0, 3) == 'LHW') {
    const temperate = parseInt(msg.slice(3, -1))
    option.value.series[0].data.push(temperate)
    option.value.xAxis.data.push(dayjs().format('HH:mm:ss'))
    humidnessChart.value?.setOption({
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
})

onMounted(() => {
  init()
})
</script>

<style lang='less' scoped></style>