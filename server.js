require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
const path = require("path");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Use client app
app.use(express.static(path.join(__dirname, "/client/dist")));

// Render client for any path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});
