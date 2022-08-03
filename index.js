const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors());
app.use(express.json());

const connectionUrl =
  "mongodb+srv://admin:admin@cluster0.gzbps.mongodb.net/?retryWrites=true&w=majority";

app.use("/users", require("./routes/UserRoutes"));

//connect to mongoDB

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((s) => {
    //after connection is established connecting to server
    app.listen(PORT, () => {
      console.log("server running on " + PORT);
    });
    console.log("database connected");
  })
  .catch((e) => {
    console.log("error" + e.message);
  });
