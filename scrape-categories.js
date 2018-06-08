const {shuffle} = require('./helpers')
const {scrapeCategories} = require('./scrape')
const {categoriesQueue} = require('./queues')

const main = async () => {
  for (const category of shuffle(await scrapeCategories())) {
    const job = categoriesQueue.createJob({category})
    job.save()
    // console.log(`Queued: ${category.title}`)
  }
}

main().then(process.exit)
