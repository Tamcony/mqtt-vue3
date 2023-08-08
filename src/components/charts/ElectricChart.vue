<template>
  <Chart :title="'电流'"
         :line-color="'#17a2b8'"
         :msg="currentMsg"
         :unit="'电流（A）'" />
</template>

<script lang='ts' setup>
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()

const currentMsg = ref('')


watch(() => clientStore.receivedMsg, msg => {
  if (msg && msg.slice(0, 3) == 'LHI') {
    currentMsg.value = msg
  }
})
</script>

<style lang='less' scoped></style>