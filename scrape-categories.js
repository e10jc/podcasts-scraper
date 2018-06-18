const {shuffle} = require('./helpers')
const {scrapeCategories} = require('./scrape')
const queue = require('./queue')

const main = async () => {
  await queue.destroy()

  for (const category of shuffle(await scrapeCategories())) {
    await queue.createJob({category}).save()
    console.log(`Queued: ${category.title}`)
  }
}

main().then(process.exit)
