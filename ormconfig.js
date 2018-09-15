module.exports = {
  'type': 'mysql',
  'host': process.env.RDS_HOSTNAME,
  'port': process.env.RDS_PORT,
  'username': process.env.RDS_USERNAME,
  'password': process.env.RDS_PASSWORD,
  'database': process.env.RDS_DB_NAME,
  'synchronize': true,
  'logging': true,
  'entities': [
    'entities/**/*.ts'
  ],
  'migrations': [
    'migrations/**/*.ts'
  ],
  'subscribers': [
    'subscribers/**/*.ts'
  ],
  'cli': {
    'entitiesDir': 'entities',
    'migrationsDir': 'migrations',
    'subscribersDir': 'subscribers'
  }
}