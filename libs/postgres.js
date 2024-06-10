const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'myappDBpassword',
    database: 'myappDB'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
