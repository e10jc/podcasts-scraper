const scrapeIt = require('scrape-it')

module.exports = async ({opts, url}) => {
  try {
    const {data} = await scrapeIt(url, opts)
    return data
  } catch (err) {
    return null
  }
}
