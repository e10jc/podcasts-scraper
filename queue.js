const Queue = require('bee-queue')

const queue = new Queue('processor', {
  redis: {host: process.env.REDIS_HOST},
  removeOnFailure: true,
  removeOnSuccess: true,
  stallInterval: 60000,
  storeJobs: false,
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
