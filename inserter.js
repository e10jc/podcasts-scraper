const knex = require('./knex')

const BATCH_SIZE = 100
const TABLE_NAME = 'podcasts'

class Inserter {
  constructor() {
    this.rows = []
  }

  async push(row) {
    this.rows.push(row)

    if (this.rows.length >= BATCH_SIZE) {
      await this.insert()
    }
  }

  async insert() {
    try {
      if (this.rows.length > 0) {
        const now = knex.fn.now()
        const rows = this.rows.map(row => ({
          created_at: now,
          updated_at: now,
          ...row
        }))
        this.rows = []

        const insertSQL = knex(TABLE_NAME).insert(rows).toString() + ' ON DUPLICATE KEY UPDATE title = VALUES(title), category = VALUES(category), url = VALUES(url), reviewsCnt = VALUES(reviewsCnt), reviewsAvg = VALUES(reviewsAvg), updated_at = VALUES(updated_at)'
        const insertRes = await knex.raw(insertSQL)
        const numDuplicates = parseInt(insertRes[0].info.match(/Duplicates: (\d+)/)[1], 10)
        const memUsage = parseInt(process.memoryUsage().heapUsed / 1024 / 1024, 10)
        console.log(`${new Date()} ${rows.length - numDuplicates} inserts, ${numDuplicates} updates, ${memUsage} MB in use`)
      }
    } catch (err) {
      console.error(`Insertion error: ${err.message}`)
    }
  }
}

module.exports = Inserter