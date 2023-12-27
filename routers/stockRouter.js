const express = require("express");
const router = express.Router();

const {
    getStock
} = require("../controllers/stockController.js");
const { remove } = require("fs-extra");

//http://localhost:4000/api/order/



router.get("/",getStock)

//id -> category
module.exports = router;
