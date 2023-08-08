<template>
  <div ref="chartRef"
       class=" w-full  h-400  border-solid border-2 rounded-2xl border-sky-500 flex justify-center items-end p-4"></div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts/core'
import {
  BarChart,
  LineChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useSystemStore } from '@/stores/modules/systemStore'
import dayjs from 'dayjs'
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()
const systemStore = useSystemStore()

const props = defineProps<{
  title: string
  unit: string
  msg: string
  lineColor: string
}>()


const chartRef = ref()
const chart = ref()
const option = ref({
  title: {
    text: props.title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: [] as string[],
  },
  yAxis: {
    type: 'value',
    name: props.unit
  },
  series: [
    {
      data: [] as number[],
      type: 'line',
      label: {
        show: true,
        position: 'top',
        textStyle: {
          fontSize: 20
        }
      },
      itemStyle: {
        color: props.lineColor
      },
      lineStyle: {
        color: props.lineColor,
        shadowBlur: 20,
        shadowColor: props.lineColor,
      },
      areaStyle: { // 设置区域填充样式
        color: `${props.lineColor}30`, // 填充颜色，可以设置透明度
      },
    }
  ]
})

const init = (darkMode: boolean = false) => {
  if (!chartRef.value) return
  if (darkMode) {
    chart.value = echarts.init(chartRef.value, 'dark')
    chart.value.setOption(option.value)
  } else {
    chart.value = echarts.init(chartRef.value)
    chart.value.setOption(option.value)
  }
}

watch(() => clientStore.receivedMsg, msg => {
  console.log(msg)
  if (props.msg && chart.value) {
    const num = parseInt(props.msg.slice(3, -1))
    option.value.series[0].data.push(num)
    option.value.xAxis.data.push(dayjs().format('HH:mm:ss'))
    if (option.value.series[0].data.length > 10) {
      option.value.series[0].data.shift()
      option.value.xAxis.data.shift()
    }
    chart.value?.setOption({
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
}, {
  deep: true
})

watch(() => systemStore.darkMode, mode => {
  if (!chart.value) return
  if (!mode) {
    chart.value.setOption({
      title: {
        textStyle: {
          color: '#000'
        }
      },
      backgroundColor: '#f5f5f5',
      textStyle: {
        color: '#333',
      },
    })
  } else {
    chart.value.setOption({
      title: {
        textStyle: {
          color: '#fff'
        }
      },
      backgroundColor: '#000',
      textStyle: {
        color: '#fff',
      },
    })
  }
  console.log('darkMode changed')
}, {
  deep: true
})

// watch(option.value, () => {
//   if (!chart.value) return
//   chart.value.setOption(option.value)
// }, {
//   deep: true
// })

onMounted(() => {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ])
  init()
})
</script>

<style lang='less' scoped></style>