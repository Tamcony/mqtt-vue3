import { useClientStore } from '@/stores/modules/clientStore'
import { handleError } from '@/utils/handlerError'
import Paho from 'paho-mqtt'

const defaultTopic = 'LHTOPIC/0301'

export const useMqttClient = () => {
  const loading = ref(false)
  const clientStore = useClientStore()
const connect = () => {
  try {
    loading.value = true;
    clientStore.client = new Paho.Client(
      clientStore.options.ServerUri,
      Number(clientStore.options.ServerPort),
      clientStore.options.clientId
    );
    clientStore.client.connect({
      onSuccess: () => {
        clientStore.client?.subscribe(defaultTopic);

        // 在连接成功后发送消息
        // const message = new Paho.Message('test');
        // message.destinationName = defaultTopic;
        // clientStore.client?.send(message);

        loading.value = false;
      },
    });
  } catch (error) {
    handleError(error);
  }
};

  const send = (message: string) => {
    try {
      const msg = new Paho.Message(message)
      msg.destinationName = defaultTopic
      clientStore.client?.send(msg)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    connect,
    send
  }
}
