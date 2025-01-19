import express from "express";
import router from "./src/Routes/routes.js";
import connection from "./src/Connection/connect.js";
import staticRouter from "./src/Routes/staticRoutes.js"
import path from "path";
const PORT = process.env.PORT || 8009;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//DB onnection 
// const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
// connection(MONGODB_URL);
connection("mongodb+srv://himanshutamoli2005:himanshutamoli2005@cluster0.wyzbs.mongodb.net/"
);

// routes
app.use("/url", router);
app.use('/', staticRouter);

// ejs structured routes
app.set('view engine', "ejs")
app.set('views', path.resolve("./views"))

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

