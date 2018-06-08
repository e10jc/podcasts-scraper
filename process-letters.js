const {shuffle} = require('./helpers')
const {lettersQueue, pagesQueue} = require('./queues')
const {scrapePages} = require('./scrape')

lettersQueue.process(async ({data: {category, letter}}) => {
  for (const page of shuffle(await scrapePages(letter))) {
    const job = pagesQueue.createJob({category, page})
    job.save()
    // console.log(`Queued: ${page.url}`)
  }
})
