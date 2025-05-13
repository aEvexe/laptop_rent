const mysql2 = require('mysql2')
require('dotenv').config();

const connection = mysql2.createConnection({
    host: process.env.DB_HOUSE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
    console.error("MySQL ulanish xatosi:", err);
  } else {
    console.log("MySQLga muvaffaqiyatli ulandi! ✅");
  }
})

module.exports = connection;