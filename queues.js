const Queue = require('bee-queue')

const settings = {redis: {host: process.env.REDIS_HOST}}
const categoriesQueue = new Queue('categories', settings)
const lettersQueue = new Queue('letters', settings)
const pagesQueue = new Queue('pages', settings)
const podcastsQueue = new Queue('podcasts', settings)
const detailsQueue = new Queue('details', settings)

module.exports = {categoriesQueue, lettersQueue, pagesQueue, podcastsQueue, detailsQueue}
