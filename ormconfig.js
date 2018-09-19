const dirPrefix = (() => {
  if (process.env.IS_SERVER) return '.next/production-server/'
  else if (process.env.IS_SCRAPER) return '.scraper-dist/'
  else return ''
})()

const fileSuffix = (() => {
  if (process.env.IS_SERVER || process.env.IS_SCRAPER) return 'js'
  else return 'ts'
})()

module.exports = {
  'type': 'mysql',
  'host': process.env.RDS_HOSTNAME,
  'port': process.env.RDS_PORT,
  'username': process.env.RDS_USERNAME,
  'password': process.env.RDS_PASSWORD,
  'database': process.env.RDS_DB_NAME,
  'synchronize': false,
  'logging': true,
  'entities': [`${dirPrefix}entities/**/*.${fileSuffix}`],
  'migrations': [`${dirPrefix}migrations/**/*.${fileSuffix}`],
  'subscribers': [`${dirPrefix}subscribers/**/*.${fileSuffix}`],
  'cli': {
    'entitiesDir': `${dirPrefix}entities`,
    'migrationsDir': `${dirPrefix}migrations`,
    'subscribersDir': `${dirPrefix}subscribers`,
  }
}