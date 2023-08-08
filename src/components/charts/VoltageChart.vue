<template>
  <Chart :title="'电压'"
         :line-color="'#28a745'"
         :msg="currentMsg"
         :unit="'电压（V）'" />
</template>

<script lang='ts' setup>
import { useClientStore } from '@/stores/modules/clientStore'

const clientStore = useClientStore()

const currentMsg = ref('')


watch(() => clientStore.receivedMsg, msg => {
  if (msg && msg.slice(0, 3) == 'LHV') {
    currentMsg.value = msg
  }
})
</script>

<style lang='less' scoped></style>