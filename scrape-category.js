const Inserter = require('./inserter')
const scrape = require('./scrape')

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
        convert: (html) => parseInt(html, 10),
        selector: 'meta[name="apple:content_id"]',
      },
      reviewsAvg: {
        convert: (html) => {
          if (html) {
            return parseFloat(html)
          }
        },
        selector: 'span[itemprop="ratingValue"]'
      },
      reviewsCnt: {
        convert: (html) => {
          if (html) {
            return parseInt(html.split(' ')[0], 10)
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

  const category = {
    title: process.argv[2],
    url: process.argv[3],
  }
  
  for (const letter of await scrapeLetters(category)) {
    const pages = await scrapePages(letter)

    for (let pageI = 0; pageI < pages.length; ++pageI) {
      const page = pages[pageI]
      const podcasts = await scrapePodcasts(page)

      for (const podcast of podcasts) {
        await inserter.push({
          category: category.title,
          title: podcast.title,
          url: podcast.url,
          ...await scrapePodcast(podcast)
        })

        process.send('tick')
      }
    }
  }

  await inserter.insert()
})()