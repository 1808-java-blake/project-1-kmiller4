import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
    database: 'postgres',
    host: 'revature-1808.cts053xfilwk.us-east-2.rds.amazonaws.com',
    max: 2,
    password: '2077LibertyPrime',
    port: 5432,
    user: process.env["1808_MOVIE_DB_USERNAME"]
})