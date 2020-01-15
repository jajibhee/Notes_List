const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
      // reconnectInterval: 500
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
      console.log(err => {
        console.error(err.message);
        process.exit(1);
      });
    });

  // try {
  //   await mongoose.connect(db, {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false,
  //     useUnifiedTopology: true
  //   });
  //   console.log("MongoDB Connected...");
  // } catch (err) {
  //   console.error(err.message);
  //   process.exit(1);
  //   console.log("MongoDB DIConnected...");
  // }
};

module.exports = connectDB;
