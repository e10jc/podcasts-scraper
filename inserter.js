const knex = require('./knex')

const BATCH_SIZE = 1000
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
    const insertSQL = knex(TABLE_NAME).insert(this.rows).toString()
    await knex.raw(insertSQL.replace(/^insert/, 'insert ignore'))
    this.rows = []
  }
}

module.exports = Inserter