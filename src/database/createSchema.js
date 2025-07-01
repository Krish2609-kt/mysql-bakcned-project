import fs from "fs"
import dbConnection from "../config/db.js"
import path from "path";

const createSchema = async() => {
    const db = await dbConnection()
    const data = fs.readFileSync("src\\database\\table.sql","utf-8")
    await db.query(data)
    console.log("all schema created succesfully")
}

export {createSchema}