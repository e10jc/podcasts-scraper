const {shuffle} = require('./helpers')
const {podcastsQueue} = require('./queues')
const {scrapePodcast} = require('./scrape')

const inserter = require('./inserter')

podcastsQueue.process(10, async ({data: {category, podcast}}) => {
  const details = await scrapePodcast(podcast)
  const row = {
    category: category.title,
    title: podcast.title,
    url: podcast.url,
    ...details
  }
  await inserter.push(row)
  process.stdout.write(`${category.title} - ${podcast.title}...`)
})
