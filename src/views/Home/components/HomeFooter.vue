<template>
  <div class="flex flex-col justify-center gap-16 items-center">
    <div class="flex flex-row justify-center gap-16 items-center">
      <a-switch class="bg-slate-400 text-white dark:bg-slate-300 dark:text-black"
                v-model:checked="switchValue"
                checked-children="开"></a-switch>
      <div>
        <span>设备状态:{{ status ? "开" : "关" }}</span>
      </div>
      <div class="flex flex-row items-center gap-8">
        <div class="h-16 w-16 rounded-full blur-2 "
             :class="danger ? 'bg-red-500' : 'bg-green-500'"></div>
        <span>{{ danger ? '警告' : '' }}</span>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useMqttClient } from "@/apis/useMqttClient"
import { useClientStore } from "@/stores/modules/clientStore"

const clientStore = useClientStore()
const { send } = useMqttClient()

const switchValue = ref(false)
const status = ref(false)
const danger = ref(false)

watch(switchValue, (value) => {
  if (value) {
    send("LHSTA")
  } else {
    send("LHSOA")
  }
})

watch(
  () => clientStore.receivedMsg,
  (msg) => {
    console.log(msg,'footer')
    if (msg == "BLHSTA") {
      status.value = true
    } else if (msg == "BLHSOA") {
      status.value = false
    } else if (msg == 'LHSTW') {
      danger.value = true
      console.log(danger.value)
    } else if (msg == 'LHSOW') {
      danger.value = false
      console.log(danger.value)
    }
  }
)
</script>

<style lang="less" scoped></style>
