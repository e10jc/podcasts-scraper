const knex = require('./knex')

const BATCH_SIZE = 10
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
      const insertSQL = knex(TABLE_NAME).insert(this.rows).toString()
      this.rows = []
      await knex.raw(insertSQL.replace(/^insert/, 'insert ignore'))
    }
  }
}

module.exports = Inserter