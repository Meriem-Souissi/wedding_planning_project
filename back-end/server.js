const express = require("express");
const connectDB = require("./helpers/ConnectDB");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));

connectDB();

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/avatar", require("./routes/avatar"));
app.use("/generalInfos", require("./routes/generalInfos"));
app.use("/socialInfos", require("./routes/socialInfos"));
app.use("/securityInfos", require("./routes/securityInfos"));
app.use("/gallery", require("./routes/gallery"));
app.use("/offer", require("./routes/offer"));
app.use("/comment", require("./routes/comment"));
app.use("/rating", require("./routes/rating"));
app.use("/testimonial", require("./routes/testimonial"));
app.use("/contact", require("./routes/contactUs"));
app.use("/services", require("./routes/services"));
app.use("/profile", require("./routes/profile"));

app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw err.message;
  }
  console.log(`Server is runnig on PORT ${PORT}`);
});
