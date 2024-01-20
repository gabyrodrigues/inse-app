import express from "express";
import fileUpload from "express-fileupload";
const route = express.Router();

import controller from "./controller";

route.get("/inse/filter", controller.filterData);
route.get("/inse/list", controller.listInseData);
route.get("/inse/:id", controller.findSchoolInseData);
route.get("/inse", controller.searchData);
route.post("/import-excel", fileUpload(controller.uploadOpts), controller.excelData);

route.all("/*", function (req, res) {
  res.status(400).send({ status: false, message: "The page you request is not available" });
});

export default route;
