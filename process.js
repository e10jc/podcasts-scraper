const {shuffle} = require('./helpers')
const knex = require('./knex')
const queue = require('./queue')
const {
  scrapeLetters,
  scrapePages,
  scrapePodcast,
  scrapePodcasts,
} = require('./scrape')

let startDatePerS
let numScrapes = 0

queue.process(process.env.NUM_PROCESSES, async ({data: {category, podcast}}) => {
  try {
    if (podcast) {
      if (!startDatePerS) startDatePerS = new Date()

      const details = await scrapePodcast(podcast)
      if (!details.id) {
        console.error('Unable to find id for scrape details', details)
        return
      }

      const row = {
        category: category.title,
        title: unescape(encodeURIComponent(podcast.title)),
        url: podcast.url,
        ...details
      }

      try {
        let podcastRow = await knex('podcasts').where({id: row.id}).first()
        if (!podcastRow) {
          podcastRow = await knex('podcasts').insert(row)
        }
        else {
          const scrapeRow = await knex('scrapes').where({podcastId: row.id}).orderBy('createdAt', 'DESC').first()
          await knex('podcasts').where({id: row.id}).update({
            publisher: row.publisher,
            reviewsCnt: row.reviewsCnt, 
            reviewsAvg: row.reviewsAvg, 
            trending: scrapeRow ? row.reviewsCnt - scrapeRow.reviewsCnt : null,
            updated_at: new Date()
          })
        }
        await knex('scrapes').insert({podcastId: row.id, reviewsCnt: row.reviewsCnt, reviewsAvg: row.reviewsAvg, createdAt: new Date()})
      } catch (err) {
        console.error(`Error:`, err)
      }

      ++numScrapes
      const totalTimeS = (new Date() - startDatePerS) / 1000
      if (totalTimeS >= 10) {
        console.log(new Date(), 'scrapes per/s:', (numScrapes / totalTimeS).toFixed(2))
        numScrapes = 0
        startDatePerS = new Date()
      }

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