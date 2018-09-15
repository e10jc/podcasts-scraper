import {scrapeCategories, scrapeLetters, scrapePages, scrapePodcasts, scrapePodcast} from './helpers'
import initTypeorm from '../connect-db'

initTypeorm().then(async () => {
  console.log('Scraping categories...')

  // for (const category of await scrapeCategories()) {
  //   console.log(`Scraping letters for ${category.title}...`)
  //   for (const letter of await scrapeLetters(category)) {
  //     console.log(`Scraping pages for ${letter.url}...`)
  //     for (const page of await scrapePages(letter)) {
  //       console.log(`Scraping podcasts for ${page.url}...`)
  //       for (const podcast of await scrapePodcasts(page)) {
  //         console.log(`Scraping details for ${podcast.url}...`)
  //         for (const details of await scrapePodcast(podcast)) {
  //           console.log(`Got details for ${JSON.stringify(details)}`)
  //         }
  //       }
  //     }
  //   }
  // }

  await Promise.all((await scrapeCategories()).map(async category => {
    console.log(`Scraping letters for ${category.title}...`)
    await Promise.all((await scrapeLetters(category)).map(async letter => {
      console.log(`Scraping pages for ${letter.url}...`)
      await Promise.all((await scrapePages(letter)).map(async page => {
        console.log(`Scraping podcasts for ${page.url}...`)
        await Promise.all((await scrapePodcasts(page)).map(async podcast => {
          console.log(`Scraping details for ${podcast.url}...`)
          await Promise.all((await scrapePodcast(podcast)).map(async details => {
            console.log(details)
          }))
        }))
      }))
    }))
  }))
  console.log('done!')
}).then(() => {
  process.exit()
})