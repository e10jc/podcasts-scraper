const scrapeIt = require('scrape-it')

module.exports = async ({opts, url}) => {
  const {data} = await scrapeIt(url, opts)
  return data
}
