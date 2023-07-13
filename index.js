const express = require("express");
const { connection } = require("./db");

const app = express();
const cors = require("cors");
const { userRouter } = require("./Routes/user.route");
const { employeeRouter } = require("./Routes/employee.route");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/employee", employeeRouter);
app.listen(4500, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is runing at 5050");
});
