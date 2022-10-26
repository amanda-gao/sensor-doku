import mqtt from 'mqtt'
import { myIp } from '../server'

const client = mqtt.connect(`mqtt://${myIp}`)

client.on('connect', () => {
  client.subscribe('Sensor/Doku')
  client.subscribe('Alert/House')
})

client.on('message', function (topic, message) {
  console.log(topic)
  const context = message.toString()
  console.log(context)
})
