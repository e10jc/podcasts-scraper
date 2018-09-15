import {getManager} from 'typeorm'

import {queue} from './queue'
import {scrapeLetters, scrapePages, scrapePodcasts, scrapePodcast} from './helpers'
import initTypeorm from '../connect-db'
import {Podcast} from '../entities/podcast'
import {Scrape} from '../entities/scrape'

let startDatePerS
let numScrapes = 0
const SECS_BETWEEN_LOG = 30

initTypeorm().then(() => {
  const entityManager = getManager()

  queue.process(parseInt(process.env.NUM_PROCESSES || '10'), async ({data: {category, podcast}}) => {
    try {
      if (podcast) {
        if (!startDatePerS) startDatePerS = new Date()

        const details = await scrapePodcast(podcast)
        if (!details.id) {
          console.error('Unable to scrape details for', podcast.url)
          return
        }

        const podcastRow = await entityManager.create(Podcast, {
          category: category.title,
          title: unescape(encodeURIComponent(podcast.title)),
          url: podcast.url,
          ...details
        })

        const lastScrapeRow = await entityManager.findOne(Scrape, {where: {podcastId: podcastRow.id}, order: {createdAt: 'DESC'}})
        podcastRow.trending = lastScrapeRow ? podcastRow.reviewsCnt - lastScrapeRow.reviewsCnt : null

        await entityManager.save(podcastRow)
        await entityManager.insert(Scrape, {
          podcast: podcastRow,
          reviewsCnt: podcastRow.reviewsCnt,
          reviewsAvg: podcastRow.reviewsAvg,
          createdAt: new Date(),
        })

        return
      }
      
      if (category) {
        console.log(`${new Date()} Scraping ${category.title}...`)
        for (const letter of await scrapeLetters(category)) {
          for (const page of await scrapePages(letter)) {
            for (const podcast of await scrapePodcasts(page)) {
              await queue.createJob({category, podcast}).save()
            }
          }
        }
        return
      }
    } catch (err) {
      console.error(`Process error: ${err.message}`)
    } finally {
      ++numScrapes
      const totalTimeS = (new Date().getTime() - startDatePerS) / 1000
      if (totalTimeS >= SECS_BETWEEN_LOG) {
        console.log(new Date(), 'scrapes per/s:', (numScrapes / totalTimeS).toFixed(2))
        numScrapes = 0
        startDatePerS = new Date()
      }
    }
  })
})

process.on('SIGINT', () => {
  queue.close()
  process.exit()
})