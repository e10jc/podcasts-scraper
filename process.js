const {shuffle} = require('./helpers')
const queue = require('./queue')
const {
  scrapeLetters,
  scrapePages,
  scrapePodcast,
  scrapePodcasts,
} = require('./scrape')

const Inserter = require('./inserter')
const inserter = new Inserter()

queue.process(process.env.NUM_PROCESSES, async ({data: {category, podcast}}) => {
  try {
    if (podcast) {
      const details = await scrapePodcast(podcast)
      const row = {
        category: category.title,
        title: podcast.title,
        url: podcast.url,
        ...details
      }
      await inserter.push(row)
      return
    }
    
    if (category) {
      console.log(`${new Date()} Scraping ${category.title}...`)
      for (const letter of shuffle(await scrapeLetters(category))) {
        for (const page of shuffle(await scrapePages(letter))) {
          for (const podcast of shuffle(await scrapePodcasts(page))) {
            await queue.createJob({category, podcast}).save()
          }
        }
      }
      return
    }
  } catch (err) {
    console.error(`Process error: ${err.message}`)
  }
})

process.on('SIGINT', () => {
  queue.close()
  process.exit()
})