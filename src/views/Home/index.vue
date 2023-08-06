<template>
  <div class="h-screen flex flex-col justify-center items-center gap-48">
    <div class="flex flex-row">
    </div>
    <div class="flex flex-row  gap-16">
      <div class="flex flex-col gap-16">
        <TemperatureChart />
        <HumidnessChart />
      </div>
      <div class="flex flex-col gap-16">
        <PowerChart />
        <HomeFooter />
      </div>
      <div class="flex flex-col gap-16">
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

onMounted(() => {
  initClient()
})

</script>

<style lang='less' scoped></style>@/apis/useMqttClient