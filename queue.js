const Queue = require('bee-queue')

const queue = new Queue('processor', {
  redis: {host: process.env.REDIS_HOST},
  removeOnFailure: true,
  removeOnSuccess: true,
  storeJobs: false,
})

module.exports = queue
