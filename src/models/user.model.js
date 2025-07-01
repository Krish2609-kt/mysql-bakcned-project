import dbConnection from "../config/db.js"

// Create a new user
const createUser = async (username, password) => {
  const db = await dbConnection();
  const [result] = await db.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password]
  );
  const [rows] = await db.query("SELECT DATABASE()");
  console.log(rows); 
  return result.insertId; // Return only the new user's ID
};

// Read (get user by id)
const getUserById = async (id) => {
  const db = await dbConnection();
  const [rows] = await db.execute(
    "SELECT id, username FROM users WHERE id = ?",[id] );
  return rows[0]; 
};

const getUserByUsername = async (username) => {
  const db = await dbConnection();
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE username = ?",[username] );
  return rows[0]; 
};

// Update user by id
const updateUser = async (id, username, password) => {
  const db = await dbConnection();
  const [result] = await db.execute("UPDATE users SET username = ?, password = ? WHERE id = ?",[username, password, id]);
  return result.affectedRows > 0; 
};

// Delete user by id
const deleteUser = async (id) => {
  const db = await dbConnection();
  const [result] = await db.execute("DELETE FROM users WHERE id = ?",[id]);
  return result.affectedRows > 0; 
};

export {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
