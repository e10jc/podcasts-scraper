const Queue = require('bee-queue')

const queue = new Queue('processor', {
  redis: {host: process.env.REDIS_HOST},
  stallInterval: 60000,
})

queue.on('error', (err) => {
  console.error(`Queue error: ${err.message}`)
})

queue.on('retrying', (job, err) => {
  console.error(`Queue retrying: ${err.message}`)
})

queue.on('stalled', (jobId) => {
  console.error(`Queue stalled on job ID ${jobId}!`)
})

queue.on('failed', (job, err) => {
  console.error(`Queue failure: ${err.message}`)
})

module.exports = queue
