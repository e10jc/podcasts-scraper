const Queue = require('bee-queue')

const categoriesQueue = new Queue('categories')
const lettersQueue = new Queue('letters')
const pagesQueue = new Queue('pages')
const podcastsQueue = new Queue('podcasts')
const detailsQueue = new Queue('details')

module.exports = {categoriesQueue, lettersQueue, pagesQueue, podcastsQueue, detailsQueue}
