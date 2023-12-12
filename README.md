# Aspire
## Full Stack Web Application for Job Seekers
Authors: Riyad Abdullayev, Gaurav Ashar and Louis Kunstmann

### Introduction

In our increasingly technological world, job hunting has been mainly shifted to an online format, meaning that those interested must search for job listings from several websites, including first-party (the company's) and third-party aggregation sites. It has become challenging to keep track of job postings one is interested in or applied for, especially in the incredibly vast landscape that is the internet.

We have devised a web application that can track the details of all your job applications in one place and reduce the unnecessary stress that comes with job hunting in this regard. Read on for instructions on how to deploy the application and begin your personalized job search.

### Prerequisites

- Installation of `mysql` on local system (recent version preferred)
- Initialization of user with CRUD permissions on `mysql` server

### Running the Web Application

To start, ensure a database is created on your local `mysql` server named `asipredb`. To do so, run the following commands in a `mysql` command line client once logged in:

```
mysql> CREATE DATABASE aspiredb;
```

This will ensure that the necessary tables for the application are able to be created properly and in a place where they can be accessed.

Next, navigate to the `/backend` folder in the project directory. Create a file named `.env` and fill out this information, replacing the text outlined in `<>` with your server information.

`.env` file:
``` 
DB_HOST='127.0.0.1'
DB_USER='<mysql_username>'
DB_PASSWORD='<mysql_password>'
DB_DATABASE='aspiredb'
DB_PORT=3306
```

Now, we must ensure that all the packages relevant to the project are installed. Since this project utilizes `node.js`, this is as simple as running two commands in a terminal. 

Navigate to the `/backend` and `/frontend` folder each and run:
```
npm install
```

Finally, to run the application in a browser of your choice (Google Chrome is recommended), run this command when located in both the `/backend` and `/frontend` folders:

Navigate to the `/backend` and `/frontend` folder each (in separate terminals) and run:

```
npm start
```

The application should run now and the command run in the `/frontend` folder should automatically bring up the web application in a new tab of your browser.

Thank you for following along, and we hope you are able to use this application to better your job hunting experience!