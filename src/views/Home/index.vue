<template>
<div class="h-screen flex flex-col justify-center items-center bg-white dark:bg-black " :class="darkMode?'dark':''">
  <div class="flex flex-col w-full h-1/8 items-center bg-white dark:bg-black ">
    <div class="flex w-full justify-end">
      <a-switch v-model:checked="darkMode"></a-switch>
    </div>
    <span class="text-6xl text-black dark:text-white dark">大屏可视化</span>
  </div>
  <div class="flex flex-row gap-32 p-16 w-full h-full overflow-hidden">
    <div class="flex flex-col gap-16 items-center justify-center w-1/4">
      <TemperatureChart />
      <HumidnessChart />
    </div>
    <div class="flex flex-col gap-16 items-center justify-center w-2/4">
      <PowerChart />
      <HomeFooter />
    </div>
    <div class="flex flex-col gap-16 items-center justify-center w-1/4">
      <VoltageChart />
      <ElectricChart />
    </div>
  </div>
</div>

</template>

<script lang='ts' setup>
import HomeFooter from '@/views/Home/components/HomeFooter.vue'
import { useMqttClient } from '@/apis/useMqttClient'
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()
const { connect } = useMqttClient()

const initClient = async() => {
  await connect()
}

const darkMode = ref(false)

onMounted(() => {
  initClient()
})

</script>

<style lang='less' scoped></style>@/apis/useMqttClient