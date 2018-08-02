module.exports = {
  up: knex => (
    knex.schema.alterTable('podcasts', table => {
      table.integer('trending').index()
    })
  ),

  down: knex => (
    knex.schema.alterTable('podcasts', table => {
      table.dropColumn('trending')
    })
  )
}