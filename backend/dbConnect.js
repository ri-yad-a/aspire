import mysql from "mysql";


export const db = mysql.createConnection({
    //host:"localhost",
    user:"root",
    password:"Aspire@2023!",
    database:"aspiredb",
    port:3306
});
