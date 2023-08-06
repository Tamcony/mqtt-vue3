<template>
    <div class="flex flex-row justify-center gap-16">
      <a-switch v-model="switchA">关灯</a-switch>
      <a-switch v-model="switchB">开灯</a-switch>
    </div>
</template>

<script lang='ts' setup>
const switchA = ref(false)
const switchB = ref(false)

watch(switchA, (value) => {
  console.log(value)
})
watch(switchB, (value) => {
  console.log(value)
})
</script>

<style lang='less' scoped>

</style>