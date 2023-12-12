import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const db = mysql.createConnection({
  // host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect(function (err) {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
  
  // Create 'users' table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        fname VARCHAR(320) DEFAULT NULL,
        lname VARCHAR(300) DEFAULT NULL,
        username VARCHAR(300) NOT NULL,
        email VARCHAR(300) NOT NULL,
        password VARCHAR(300) NOT NULL,
        profession VARCHAR(300) DEFAULT NULL,
        PRIMARY KEY (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `;

  db.query(createUsersTable, function (err, result) {
    if (err) throw err;
    console.log('Table "users" created');
  });

  // Create 'jobs' table
  const createJobsTable = `
    CREATE TABLE IF NOT EXISTS jobs (
        id INT NOT NULL AUTO_INCREMENT,
        company VARCHAR(300) NOT NULL,
        email VARCHAR(300) NOT NULL,
        dateUploaded DATE DEFAULT NULL,
        jobTitle VARCHAR(300) NOT NULL,
        status VARCHAR(100) DEFAULT NULL,
        jobDescription VARCHAR(300) DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY job_req_id_UNIQUE (id),
        KEY email (email),
        CONSTRAINT jobs_ibfk_3 FOREIGN KEY (email) REFERENCES users (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `;

  db.query(createJobsTable, function (err, result) {
    if (err) throw err;
    console.log('Table "jobs" created');
  });

  // Create 'documents' table
  const createDocumentsTable = `
    CREATE TABLE IF NOT EXISTS documents (
        id int NOT NULL AUTO_INCREMENT,
        email varchar(320) NOT NULL,
        title varchar(300) DEFAULT NULL,
        filename varchar(300) NOT NULL,
        file mediumtext NOT NULL,
        size int DEFAULT NULL,
        description varchar(300) DEFAULT NULL,
        type varchar(100) DEFAULT NULL,
        uploadDate date NOT NULL,
        uploadTime time NOT NULL,
        PRIMARY KEY (id),
        KEY email (email),
        CONSTRAINT documents_ibfk_1 FOREIGN KEY (email) REFERENCES users (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `;

  db.query(createDocumentsTable, function (err, result) {
    if (err) throw err;
    console.log('Table "documents" created');
  });

  // Create 'documents' table
  const createApplicationsTable = `
    CREATE TABLE IF NOT EXISTS applications (
        id int NOT NULL AUTO_INCREMENT,
        email varchar(320) NOT NULL,
        status varchar(30) NOT NULL,
        notes varchar(600) DEFAULT NULL,
        dateUploaded date NOT NULL,
        company varchar(300) NOT NULL,
        job_id int DEFAULT NULL,
        title varchar(255) NOT NULL,
        document_name varchar(255) DEFAULT NULL,
        PRIMARY KEY (id),
        KEY email (email),
        KEY applications_ibfk_2 (job_id),
        CONSTRAINT applications_ibfk_1 FOREIGN KEY (email) REFERENCES users (email),
        CONSTRAINT applications_ibfk_2 FOREIGN KEY (job_id) REFERENCES jobs (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `;

  db.query(createApplicationsTable, function (err, result) {
    if (err) throw err;
    console.log('Table "applications" created');
  });

  // Create 'interviews' table
  const createInterviewsTable = `
    CREATE TABLE IF NOT EXISTS interviews (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(320) NULL,
        company VARCHAR(300) NULL,
        time VARCHAR(45) NULL,
        date DATE NULL,
        status VARCHAR(100) NULL,
        jobTitle VARCHAR(300) NULL,
        application_id INT NULL,
        notes VARCHAR(320) NULL,
        PRIMARY KEY (id),
        INDEX email_idx (email ASC) VISIBLE,
        CONSTRAINT email FOREIGN KEY (email) REFERENCES users (email)
    ) ENGINE=InnoDB
    `;

  db.query(createInterviewsTable, function (err, result) {
    if (err) throw err;
    console.log('Table "interviews" created');
  });
});

export { db };
