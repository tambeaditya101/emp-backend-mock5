const express = require("express");
const { EmployeeModel } = require("../Model/employee.model");
const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
  const queryObj = {};
  const sortObj = {};
  const { _sort, _order, department, _limit, page } = req.query;
  if (_sort) {
    if (_order == "asc") {
      sortObj[_sort] = 1;
    }
    if (_order == "desc") {
      sortObj[_sort] = -1;
    }
  }
  if (department) {
    queryObj.department = { $in: department };
    // { $regex: brand_name, $options: "i" }
  }
  let Limit = 5;
  if (_limit) {
    Limit = _limit;
  }

  try {
    let userdata = await EmployeeModel.find(queryObj)
      .sort(sortObj)
      .skip((page - 1) * Limit)
      .limit(Limit);
    res.status(200).send(userdata);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

employeeRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await EmployeeModel.findOne({ _id: id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

employeeRouter.post("/add", async (req, res) => {
  try {
    const data = await EmployeeModel(req.body);
    await data.save();
    res.status(200).send({ msg: "Employee Added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

employeeRouter.patch("/update/:ID", async (req, res) => {
  const id = req.params.ID;
  try {
    await EmployeeModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send("Data is been updated");
  } catch (error) {
    res.status(400).send(error);
  }
});

employeeRouter.delete("/delete/:ID", async (req, res) => {
  const id = req.params.ID;
  try {
    await EmployeeModel.findByIdAndDelete({ _id: id });
    res.status(200).send("Data is been deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { employeeRouter };
