const Queue = require('bee-queue')

const queue = new Queue('processor', {
  redis: {host: process.env.REDIS_HOST},
  removeOnFailure: true,
  removeOnSuccess: true,
  storeJobs: false,
})

queue.on('error', (err) => {
  console.error(`Queue error: ${err.message}`)
})

queue.on('failed', (job, err) => {
  console.error(`Queue failure: ${err.message}`)
})

module.exports = queue
