const Knex = require('knex')
const knexfile = require('./knexfile')

module.exports = new Knex(knexfile)
