const scrape = require('./scrape')
const scrapeCategory = require('./scrape-category')

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
  const categories = await scrapeCategories()

  await Promise.all(categories.map(c => scrapeCategory(c)))
})()