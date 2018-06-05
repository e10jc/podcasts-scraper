const Inserter = require('./inserter')
const scrapeIt = require('scrape-it')

const scrape = async ({opts, url}) => {
  const {data} = await scrapeIt(url, opts)
  return data
}

(async () => {
  const inserter = new Inserter()

  // scrape all of the major categories
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
  
  // for each major category:
  for (const category of categories) {
    // scrape all of the alphabet letter urls
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

    // for each letter of the alphabet:
    for (const letter of letters) {
      // scrape all the page numbers
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

      // for each page of podcasts:
      for (const page of pages) {
        // scrape urls to each podcast
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

        // for each podcast:
        for (const podcast of podcasts) {
          // scrape the podcast details
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

          inserter.push({
            category: category.title,
            title: podcast.title,
            url: podcast.url,
            ...details
          })
        }
      }
    }
  }
})()