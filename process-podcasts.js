const ProgressBar = require('progress')

const {shuffle} = require('./helpers')
const {podcastsQueue} = require('./queues')
const {scrapePodcast} = require('./scrape')

const inserter = require('./inserter')
const progressBar = new ProgressBar(':current inserts in :elapseds, last: :title', {total: Number.MAX_SAFE_INTEGER})

podcastsQueue.process(async ({data: {category, podcast}}) => {
  const details = await scrapePodcast(podcast)
  const row = {
    category: category.title,
    title: podcast.title,
    url: podcast.url,
    ...details
  }
  await inserter.push(row)
  progressBar.tick({title: `${category.title} - ${podcast.title}`})
  // console.log(`Inserted: ${category.title} - ${podcast.title}`)
})
