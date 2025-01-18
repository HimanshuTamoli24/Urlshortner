import express from 'express';
const app = express();
const PORT = 8009
import router from './src/Routes/routes.js'
import connection from './src/Connection/connect.js';
app.use(express.json());
app.use("/url", router);
connection("mongodb+srv://himanshutamoli2005:himanshutamoli2005@cluster0.wyzbs.mongodb.net/")
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})