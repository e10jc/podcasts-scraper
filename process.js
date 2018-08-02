const {shuffle} = require('./helpers')
const knex = require('./knex')
const queue = require('./queue')
const {
  scrapeLetters,
  scrapePages,
  scrapePodcast,
  scrapePodcasts,
} = require('./scrape')

queue.process(process.env.NUM_PROCESSES, async ({data: {category, podcast}}) => {
  try {
    if (podcast) {
      const details = await scrapePodcast(podcast)
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
          console.log(new Date(), `Inserted ${row.url}`)
        }
        else {
          const scrapeRow = await knex('scrapes').where({podcastId: row.id}).orderBy('createdAt', 'DESC').first()
          const trending = scrapeRow ? row.reviewsCnt - scrapeRow.reviewsCnt : null
          await knex('podcasts').where({id: row.id}).update({reviewsCnt: row.reviewsCnt, reviewsAvg: row.reviewsAvg, trending, updated_at: new Date()})
          console.log(new Date(), `Updated ${row.url}`)
        }
        await knex('scrapes').insert({podcastId: row.id, reviewsCnt: row.reviewsCnt, reviewsAvg: row.reviewsAvg, createdAt: new Date()})
      } catch (err) {
        console.error(`Error:`, err)
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