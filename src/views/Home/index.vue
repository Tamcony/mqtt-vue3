<template>
  <div class="h-screen flex flex-col justify-center items-center   main-bg-custom"
       :class="darkMode ? 'dark' : ''">
    <div class="flex flex-row w-full h-1/8 items-center justify-center  p-8">
      <span class="text-9xl  text-white ">数据可视化</span>
      <div class="flex flex-row items-center absolute right-32">
        <!-- <a-switch v-model:checked="darkMode">
          <template #checkedChildren>
            <span>🌙</span>
          </template>
          <template #unCheckedChildren>
            <span>☀</span>
          </template>
        </a-switch> -->

      </div>
    </div>
    <div
         class="flex flex-row gap-32 p-16 w-full h-full overflow-hidden  text-white">
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
import { useSystemStore } from '@/stores/modules/systemStore'

const systemStore = useSystemStore()
const { connect } = useMqttClient()

const initClient = async () => {
  await connect()
}

const darkMode = ref(false)

watch(darkMode, val => {
  systemStore.darkMode = val
})

onMounted(() => {
  initClient()
})

</script>
  
<style lang='less' scoped>
.main-bg-custom {
  background: url('src/assets/image/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>