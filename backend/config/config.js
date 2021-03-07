module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: null,
    database: process.env.POSTGRES_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    host: process.env.DATABASE_URL || 'postgres',
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
