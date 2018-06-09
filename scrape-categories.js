const {shuffle} = require('./helpers')
const {scrapeCategories} = require('./scrape')
const queue = require('./queue')

const main = async () => {
  await queue.destroy()

  for (const category of shuffle(await scrapeCategories())) {
    const job = queue.createJob({category})
    job.save()
    console.log(`Queued: ${category.title}`)
  }
}

main().then(process.exit)
