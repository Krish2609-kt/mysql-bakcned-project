import mysql from "mysql2/promise";

const dbConnection = async () => {
  try {
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "5467",
      database: "book_api",
      waitForConnections: true,
      multipleStatements: true,
      connectionLimit: 10, // Max number of concurrent connections
      queueLimit: 0,       // 0 = unlimited queued requests
    });
    console.log("MySQL Connected!");
    return pool;
  } catch (error) {
    console.error("DB connection failed:", error);
    throw error;
  }
};

export default dbConnection;


