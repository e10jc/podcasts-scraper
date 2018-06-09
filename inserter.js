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
    if (this.rows.length > 0) {
      const rows = this.rows.map(row => ({
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
        ...row
      }))
      this.rows = []

      const insertSQL = knex(TABLE_NAME).insert(rows).toString() + ' ON DUPLICATE KEY UPDATE title = VALUES(title), category = VALUES(category), url = VALUES(url), reviewsCnt = VALUES(reviewsCnt), reviewsAvg = VALUES(reviewsAvg), updated_at = VALUES(updated_at)'
      await knex.raw(insertSQL)
    }
  }
}

module.exports = Inserter