const {fork} = require('child_process')
const ProgressBar = require('progress')

const scrape = require('./scrape')

const scrapeCategories = async () => {
  const {categories} = await scrape({
    opts: {
      categories: {
        listItem: 'a.top-level-genre',
        data: {
          title: '',
          url: {
            attr: 'href',
          }
        }
      }
    },
    url: 'https://itunes.apple.com/us/genre/podcasts/id26?mt=2',
  })
  return categories
}

(async () => {
  const createCategorySymbol = (category) => category.replace(/\W/g, '').toLowerCase()

  const categories = await scrapeCategories()
  const categorySymbols = categories.map(c => createCategorySymbol(c.title))
  const progressBarStr = categorySymbols.map(cs => `${cs}::${cs}`).join(' ')
  const progressBar = new ProgressBar(progressBarStr, {total: Number.MAX_SAFE_INTEGER})

  const ticks = categorySymbols.reduce((obj, sym) => {
    obj[sym] = 0
    return obj
  }, {})

  for (const category of categories) {
    const child = fork('scrape-category.js', [category.title, category.url], {stdio: 'ignore'})

    child.on('message', () => {
      ++ticks[createCategorySymbol(category.title)]
      progressBar.tick(ticks)
    })
  }
})()