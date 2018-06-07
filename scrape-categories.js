const ProgressBar = require('progress')

const Inserter = require('./inserter')
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

const scrapeLetters = async (category) => {
  const {letters} = await scrape({
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
  return letters
}

const scrapePages = async (letter) => {
  const {pages} = await scrape({
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
  return pages
}

const scrapePodcasts = async (page) => {
  const {podcasts} = await scrape({
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
  return podcasts
}

const scrapePodcast = async (podcast) => {
  const details = await scrape({
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
  return details
}

(async () => {
  const inserter = new Inserter()
  const progressBar = new ProgressBar(':current :rate', {total: Number.MAX_SAFE_INTEGER})

  for (const category of await scrapeCategories()) {
    for (const letter of await scrapeLetters(category)) {
      for (const page of await scrapePages(letter)) {
        for (const podcast of await scrapePodcasts(page)) {
          const row = {
            category: category.title,
            title: podcast.title,
            url: podcast.url,
            ...await scrapePodcast(podcast)
          }
          await inserter.push(row)
          progressBar.tick()
        }
      }
    }
  }

  await inserter.insert()
})()