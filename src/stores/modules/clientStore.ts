import { defineStore } from 'pinia'
import { Client } from 'paho-mqtt'
import { v4 as uuidv4 } from 'uuid'
import { init } from 'echarts'

export const useClientStore = defineStore('clientStore', () => {
  const client = ref<Client>()

  const options = {
    ServerUri: '43.142.84.94',
    ServerPort: '8083',
    path: '/mqtt',
    clean: true, // 保留回话
    connectTimeout: 4000, // 超时时间
    // 认证信息
    clientId: '',
    keepalive: 40,
    username: '',
    password: '',
    will: {
      topic: 'Minilast',
      payload: 'Connection Closed abnormally..!',
      retain: false,
      qos: 0
    }
  }

  // 连接丢失处理
  const onConnectionLost = (responseObject: any) => {
    if (responseObject.errorCode !== 0) console.log('onConnectionLost:' + responseObject.errorMessage)
  }

  // 消息送达处理
  const onMessageArrived = (message: any) => {
    console.log('onMessageArrived:' + message.payloadString)
    receivedMsg.value = message.payloadString
  }

  const receivedMsg = ref('')

  const initClient = (currentClient: any) => {
    currentClient.onConnectionLost = onConnectionLost // 定义连接丢失方法
    currentClient.onMessageArrived = onMessageArrived // 定义消息送达方法
  }

  onMounted(() => {
    options.clientId = uuidv4()
  })

  onUnmounted(() => {
    client.value?.disconnect()
  })

  watch(client, (val) => {
    if (val) {
      initClient(client.value)
    }
  })

  return {
    client,
    options,
    receivedMsg
  }
})
