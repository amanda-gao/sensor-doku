import mqtt from 'mqtt'
import { myIp } from '../server'

const client = mqtt.connect(`mqtt://${myIp}`)

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

client.on('connect', () => {
  setInterval(() => {
    client.publish(
      'Sensor/Doku',
      JSON.stringify({
        home: 'Pythonhouse',
        cl2: { initials: 'CL2', name: 'Cloro', level: getRandomArbitrary(0, 30) },
        no2: { initials: 'NO2', name: 'Dióxido de Nitrogênio', level: getRandomArbitrary(0, 40) },
        r22: { initials: 'R22', name: 'Clorodifluorometano', level: getRandomArbitrary(0, 70) },
        co2: { initials: 'CO2', name: 'Monóxido de Carbono', level: getRandomArbitrary(0, 80) },
        status: new Date().getTime()
      })
    )
    console.log('message sent')
  }, 2000)
})
