<template>
  <div class="h-screen flex flex-col justify-center items-center bg-white dark:bg-black "
       :class="darkMode ? 'dark' : ''">
    <div class="flex flex-row w-full h-1/8 items-center justify-center bg-white dark:bg-black p-8">
      <span class="text-9xl	 text-black dark:text-white dark">大屏可视化</span>
      <div class="flex flex-row items-center absolute right-32">
        <a-switch v-model:checked="darkMode">
          <template #checkedChildren>
            <!-- <span class="i-heroicons-solid:moon text-black dark:text-white"></span> -->
            <span>🌙</span>
          </template>
          <template #unCheckedChildren>
            <!-- <span class="i-heroicons-solid:sun text-black dark:text-white"></span> -->
            <span>☀️</span>
          </template>
        </a-switch>

      </div>
    </div>
    <div
         class="flex flex-row gap-32 p-16 w-full h-full overflow-hidden bg-white dark:bg-black text-black dark:text-white">
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

<style lang='less' scoped></style>@/apis/useMqttClient