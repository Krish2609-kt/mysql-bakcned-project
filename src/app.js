import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";
const app = express()


app.use(cors())
app.use(express.json( {limit: '16kb'} ));
app.use(express.urlencoded({ extended: true,limit: '16kb' }));
// app.use(errorMiddleware())

import userRouter from './routes/auth.routes.js'

app.use('/api/v1/user',userRouter)

export {app}