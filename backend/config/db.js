import pkg from 'pg';
import dotenv from 'dotenv'
dotenv.config(); 

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    ssl: {'rejectUnauthorized':false}
});

pool.on("connect", () => {
    console.log("PG Pool successfully established.")
});

export default pool;