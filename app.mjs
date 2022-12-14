import express from "express";
import ProductRoute from "./Routes/Product/Product.mjs";
import bodyParser from "body-parser";
import cors from "cors"
import ErrorMiddleware from "./middleware/error.mjs";
import UserRoute from "./Routes/User/User.mjs";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import OrderRoute from "./Routes/Order/Order.mjs";
import helmet from "helmet";


const app = express()

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)
app.use(helmet())
// app.use(bodyParser.urlencoded({
//     extended: true
// }))

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// app.use(bodyParser.json())
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))

app.use("/products", ProductRoute)
app.use("/user", UserRoute)
app.use("/order", OrderRoute)




if (process.env.NODE_ENV === "production") {
    app.use(express.static("../frontend/build"))
}


app.get('/', (req, res) => {
    res.send('Hello from Express!')
})

// Error  🤦‍♂️🤦‍♂️


app.use((req, res) => {
    res.status(404).json({
        Error: "🤬🤬🤬🤬🤬🤬 URL Not Found 🤬🤬🤬🤬🤬🤬"
    })
})

// Errormiddleware
app.use(ErrorMiddleware)




export default app