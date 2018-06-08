const {shuffle} = require('./helpers')
const {categoriesQueue, lettersQueue} = require('./queues')
const {scrapeLetters} = require('./scrape')

categoriesQueue.process(async ({data: {category}}) => {
  for (const letter of shuffle(await scrapeLetters(category))) {
    const job = lettersQueue.createJob({category, letter})
    job.save()
    // console.log(`Queued: ${letter.url}`)
  }
})
