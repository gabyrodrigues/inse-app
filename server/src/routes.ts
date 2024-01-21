import express from "express";
const route = express.Router();

import controller from "./controller";

route.get("/inse/filter", controller.filterData);
route.get("/inse/list", controller.listInseData);
route.get("/inse/:id", controller.findSchoolInseData);
route.get("/inse", controller.searchData);

route.all("/*", function (req, res) {
  res.status(400).send({ status: false, message: "Página não disponível" });
});

export default route;
