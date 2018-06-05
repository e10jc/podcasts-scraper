module.exports = {
  up: knex => (
    knex.schema.createTable('podcasts', table => {
      table.increments()
      table.string('category')
      table.string('title')
      table.string('url')
      table.integer('reviewsCnt')
      table.float('reviewsAvg')

      table.index('category')
      table.index('reviewsCnt')
      table.index('reviewsAvg')
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('podcasts')
  )
}