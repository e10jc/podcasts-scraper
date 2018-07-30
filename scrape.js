const scrapeIt = require('scrape-it')

const scrape = async ({opts, url}) => {
  try {
    const {data} = await scrapeIt(url, opts)
    return data
  } catch (err) {
    console.error(`Scrape error: ${err.message}`)
    return null
  }
}

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
            return isNaN(num) ? 0 : num
          } else {
            return 0
          }
        },
        selector: 'span[itemprop="ratingValue"]'
      },
      reviewsCnt: {
        convert: (html) => {
          if (html) {
            const num = parseInt(html.split(' ')[0], 10)
            return isNaN(num) ? 0 : num
          } else {
            return 0
          }
        },
        selector: '.rating-count',
      },
    },
    url: podcast.url,
  })
  return data || {}
}

module.exports = {scrapeCategories, scrapeLetters, scrapePages, scrapePodcasts, scrapePodcast}
