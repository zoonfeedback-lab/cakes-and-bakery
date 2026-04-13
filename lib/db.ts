import { Pool } from 'pg';

declare global {
    var __cakesAndBakesPool: Pool | undefined;
}

function createPool() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL is not set. Add it to your .env.local file.');
    }

    return new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
    });
}

export const db = global.__cakesAndBakesPool ?? createPool();

if (process.env.NODE_ENV !== 'production') {
    global.__cakesAndBakesPool = db;
}
