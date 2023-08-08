<template>
  <Chart :title="'温度'"
         :line-color="'#007bff'"
         :msg="currentMsg"
         :unit="'温度（℃）'" />
</template>

<script lang='ts' setup>
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()

const currentMsg = ref('')


watch(() => clientStore.receivedMsg, msg => {
  if (msg && msg.slice(0, 3) == 'LHT') {
    currentMsg.value = msg
    console.log(currentMsg.value)
  }
})
</script>

<style lang='less' scoped></style>