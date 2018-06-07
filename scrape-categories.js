const ProgressBar = require('progress')

const Inserter = require('./inserter')
const scrape = require('./scrape')

const scrapeCategories = async () => {
  const data = await scrape({
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
  return data ? data.categories : []
}

const scrapeLetters = async (category) => {
  const data = await scrape({
    opts: {
      letters: {
        listItem: 'ul.alpha li a',
        data: {
          url: {
            attr: 'href',
          }
        }
      }
    },
    url: category.url,
  })
  return data ? data.letters : []
}

const scrapePages = async (letter) => {
  const data = await scrape({
    opts: {
      pages: {
        listItem: 'ul.paginate li a',
        data: {
          url: {
            attr: 'href',
          }
        }
      }
    },
    url: letter.url,
  })
  return data ? data.pages : []
}

const scrapePodcasts = async (page) => {
  const data = await scrape({
    opts: {
      podcasts: {
        listItem: '#selectedcontent ul li a',
        data: {
          title: '',
          url: {
            attr: 'href'
          }
        }
      }
    },
    url: page.url,
  })
  return data ? data.podcasts : []
}

const scrapePodcast = async (podcast) => {
  const data = await scrape({
    opts: {
      id: {
        attr: 'content',
        convert: (html) => {
          const num = parseInt(html, 10)
          return isNaN(num) ? null : num
        },
        selector: 'meta[name="apple:content_id"]',
      },
      reviewsAvg: {
        convert: (html) => {
          if (html) {
            const num = parseFloat(html)
            return isNaN(num) ? null : num
          }
        },
        selector: 'span[itemprop="ratingValue"]'
      },
      reviewsCnt: {
        convert: (html) => {
          if (html) {
            const num = parseInt(html.split(' ')[0], 10)
            return isNaN(num) ? null : num
          }
        },
        selector: '.rating-count',
      },
    },
    url: podcast.url,
  })
  return data || {}
}

const shuffle = arr => {
  return arr.sort(() => 0.5 - Math.random())
}

const processCategory = ({inserter, progressBar}) => async category => {
  for (const letter of shuffle(await scrapeLetters(category))) {
    for (const page of shuffle(await scrapePages(letter))) {
      for (const podcast of shuffle(await scrapePodcasts(page))) {
        const row = {
          category: category.title,
          title: podcast.title,
          url: podcast.url,
          ...await scrapePodcast(podcast)
        }
        await inserter.push(row)
        progressBar.tick({
          title: `${category.title} - ${podcast.title}`
        })
      }
    }
  }
}

(async () => {
  const inserter = new Inserter()
  const progressBar = new ProgressBar(':current scraped, :rate p/s, Last: :title', {total: Number.MAX_SAFE_INTEGER})

  const categories = shuffle(await scrapeCategories())
  const processFn = processCategory({inserter, progressBar})
  await Promise.all(categories.map(processFn))

  await inserter.insert()
})()