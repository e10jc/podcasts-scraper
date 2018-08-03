module.exports = {
  up: knex => (
    knex.schema.alterTable('podcasts', table => {
      table.string('publisher').index()
    })
  ),

  down: knex => (
    knex.schema.alterTable('podcasts', table => {
      table.dropColumn('publisher')
    })
  )
}