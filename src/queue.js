const Queue = require('bee-queue')

const queue = new Queue('processor', {
  redis: {host: process.env.REDIS_HOST},
  stallInterval: 60000,
  storeJobs: false,
})

queue.on('error', (err) => {
  console.error(`Queue error: ${err.message}`)
})

queue.on('retrying', (_, err) => {
  console.error(`Queue retrying: ${err.message}`)
})

queue.on('stalled', () => {
  console.error(`Queue stalled!`)
})

queue.on('failed', (_, err) => {
  console.error(`Queue failure: ${err.message}`)
})

module.exports = queue
