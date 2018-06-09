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
      const rows = this.rows.slice(0)
      this.rows = []

      const insertSQL = knex(TABLE_NAME).insert(rows).toString() + ' ON DUPLICATE KEY UPDATE updated_at = NOW()'
      await knex.raw(insertSQL)
    }
  }
}

module.exports = Inserter