const {shuffle} = require('./helpers')
const {pagesQueue, podcastsQueue} = require('./queues')
const {scrapePodcasts} = require('./scrape')

pagesQueue.process(async ({data: {category, page}}) => {
  for (const podcast of shuffle(await scrapePodcasts(page))) {
    const job = podcastsQueue.createJob({category, podcast})
    job.save()
    // console.log(`Queued: ${category.title} - ${podcast.title}`)
  }
})
