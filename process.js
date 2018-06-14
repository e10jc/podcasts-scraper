const ProgressBar = require('progress')

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

const progressBar = ProgressBar && new ProgressBar(':letters letters, :pages pages, :podcasts podcasts, :details details, :memory MB used, :rate per sec', {total: Number.MAX_SAFE_INTEGER})
const ticks = {letters: 0, pages: 0, podcasts: 0, details: 0}

queue.process(15, async ({data: {category, letter, page, podcast}}) => {
  if (podcast) {
    const details = await scrapePodcast(podcast)
    const row = {
      category: category.title,
      title: podcast.title,
      url: podcast.url,
      ...details
    }
    await inserter.push(row)
    // process.stdout.write(`${category.title} - ${podcast.title}...`)
    ++ticks.details
  } else if (page) {
    for (const podcast of shuffle(await scrapePodcasts(page))) {
      await queue.createJob({category, podcast}).save()
      // console.log(`Queued: ${category.title} - ${podcast.title}`)
      ++ticks.podcasts
    }
  } else if (letter) {
    for (const page of shuffle(await scrapePages(letter))) {
      await queue.createJob({category, page}).save()
      // console.log(`Queued: ${page.url}`)
      ++ticks.pages
    }

  } else if (category) {
    for (const letter of shuffle(await scrapeLetters(category))) {
      await queue.createJob({category, letter}).save()
      // console.log(`Queued: ${letter.url}`)
      ++ticks.letters
    }
  }

  if (ProgressBar) {
    ticks.memory = parseInt(process.memoryUsage().heapUsed / 1024 / 1024, 10)
    progressBar.tick(ticks)
  }
})
