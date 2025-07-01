import { app } from "./src/app.js";
import dbConnection from "./src/config/db.js";
import { createSchema } from "./src/database/createSchema.js";


dbConnection()
  .then(() => {
    console.log("Connection established successfully");
    createSchema().catch(console.error);
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Optional: exit the process if DB connection fails
  });