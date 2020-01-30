const express = require("express");
const connectDB = require("./config/db");
//intialize express
const app = express();

//COnnect db
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome, TheBhee" }));
const PORT = process.env.port || 5000;

//define our routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
// app.listen(PORT, () => console.log(`Server started on ${PORT}`));
//
//npm run server cause that is the server we told nodemon to use. That way the app doesnt have to restart on every change
