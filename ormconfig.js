const typeorm = require('typeorm');
require('dotenv').config();

console.log(process.env.PGSQL_USER);
console.log(process.env.PGSQL_PASSWORD);
console.log(process.env.PGSQL_DATABASE);

module.exports = new typeorm.DataSource({
  type: 'postgres',
  host: process.env.PGSLQ_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  database: process.env.PGSQL_DATABASE,
  entities: ['dist/**/**.entity{.ts,.js}'],
  migrations: ['dist/**/**.migration{.ts,.js}'],
  synchronize: false,
  verboseRetryLog: true,
  autoLoadEntities: true,
  logging: true,
});
