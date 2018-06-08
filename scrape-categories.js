const {shuffle} = require('./helpers')
const {scrapeCategories} = require('./scrape')
const queues = require('./queues')

const main = async () => {
  for (const key in queues) {
    await queues[key].destroy()
  }

  for (const category of shuffle(await scrapeCategories())) {
    const job = queues.categoriesQueue.createJob({category})
    job.save()
    // console.log(`Queued: ${category.title}`)
  }
}

main().then(process.exit)
