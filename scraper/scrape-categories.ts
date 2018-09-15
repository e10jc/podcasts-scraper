import {scrapeCategories} from './helpers'
import {queue} from './queue'

const main = async () => {
  await queue.destroy()

  for (const category of await scrapeCategories()) {
    await queue.createJob({category}).save()
    console.log(`Queued: ${category.title}`)
  }
}

main().then(() => process.exit())
