// import mysql from "mysql";


// export const db = mysql.createConnection({
//     //host:"localhost",
//     user:"root",
//     password:"Aspire@2023!",
//     database:"aspiredb",
//     port:3306
// });

import mysql from "mysql";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});
