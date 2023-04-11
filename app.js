const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const beansRouter = require("./routes/beansRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());

app.use("/api/beans", beansRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Server started");
});
