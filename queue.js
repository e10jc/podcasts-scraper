const Queue = require('bee-queue')

const queue = new Queue('processor', {
  getEvents: false,
  redis: {host: process.env.REDIS_HOST},
  removeOnFailure: true,
  removeOnSuccess: true,
  sendEvents: false,
  storeJobs: false,
})

module.exports = queue
