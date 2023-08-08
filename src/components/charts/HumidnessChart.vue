<template>
  <Chart :title="'湿度'"
         :line-color="'#ffc107'"
         :msg="currentMsg"
         :unit="'湿度（％）'" />
</template>

<script lang='ts' setup>
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()

const currentMsg = ref('')


watch(() => clientStore.receivedMsg, msg => {
  if (msg && msg.slice(0, 3) == 'LHW') {
    currentMsg.value = msg
  }
})
</script>

<style lang='less' scoped></style>