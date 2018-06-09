module.exports = {
  up: knex => (
    knex.schema.alterTable('podcasts', table => {
      table.timestamps()
    })
  ),

  down: knex => (
    knex.schema.alterTable('podcasts', table => {
      table.dropTimestamps()
    })
  )
}