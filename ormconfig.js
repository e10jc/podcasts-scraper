const dirPrefix = process.env.NODE_ENV === 'production' ? `.next/production-server/` : ''
const fileSuffix = process.env.NODE_ENV === 'production' ? 'js' : 'ts'

module.exports = {
  'type': 'mysql',
  'host': process.env.RDS_HOSTNAME,
  'port': process.env.RDS_PORT,
  'username': process.env.RDS_USERNAME,
  'password': process.env.RDS_PASSWORD,
  'database': process.env.RDS_DB_NAME,
  'synchronize': true,
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