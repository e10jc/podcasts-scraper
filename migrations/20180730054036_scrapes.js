module.exports = {
  up: knex => (
    knex.schema.createTable('scrapes', table => {
      table.increments()
      table.integer('podcastId').index()
      table.integer('reviewsCnt')
      table.float('reviewsAvg')
      table.timestamp('createdAt')
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('scrapes')
  )
}