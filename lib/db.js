import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "mahauditdubai",
  password: "mahauditdubai26",
  database: "RD1613499888_",
  port: 3306,
});

export default db;
