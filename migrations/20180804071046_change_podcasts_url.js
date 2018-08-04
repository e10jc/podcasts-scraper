module.exports = {
  up: knex => knex.schema.raw('ALTER TABLE podcasts MODIFY url TEXT;'),
  down: knex => knex.schema.raw('ALTER TABLE podcasts MODIFY url VARCHAR(255);'),
}