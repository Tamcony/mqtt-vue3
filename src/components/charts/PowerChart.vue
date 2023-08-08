<template>
  <Chart :title="'功率'"
         :line-color="'#dc3545'"
         :msg="currentMsg"
         :unit="'功率（kW·h）'" />
</template>

<script lang='ts' setup>
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()

const currentMsg = ref('')


watch(() => clientStore.receivedMsg, msg => {
  if (msg && msg.slice(0, 3) == 'LHP') {
    currentMsg.value = msg
  }
})
</script>

<style lang='less' scoped></style>