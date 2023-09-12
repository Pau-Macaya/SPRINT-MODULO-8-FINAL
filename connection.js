import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    database: 'skatepark',
    password: '199899Sep#',
    port: 5432
});

pool.connect();

export { pool };