import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});
console.log(connection);
export default connection;
