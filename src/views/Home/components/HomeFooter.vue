<template>
  <div class="flex flex-row justify-center gap-16">
    <a-switch v-model:checked="switchValue"
              checked-children="开"></a-switch>

    <div>
      <span>设备状态:{{ status ? '开' : '关' }}</span>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useMqttClient } from '@/apis/useMqttClient'
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()
const { send } = useMqttClient()

const switchValue = ref(false)
const status = ref(false)

watch(switchValue, (value) => {
  if(value) {
    send('LHSTA')
  } else {
    send('LHSOA')
  }
})

watch(() => clientStore.receivedMsg, msg => {
  if (msg == 'BLHSTA') {
    status.value = false
  } else if (msg == 'BLHSOA') {
    status.value = true
  }
})

</script>

<style lang='less' scoped></style>