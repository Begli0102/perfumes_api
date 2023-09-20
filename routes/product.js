const express = require("express");
const router = express.Router();
const {
  getProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/products");

//GET PRODUCT
router.get("/:id", getOneProduct);

//GET ALL PRODUCTS
router.get("/", getProducts);

router.post("/", createProduct);

router.post("/:id", deleteProduct);

router.post("/:id", updateProduct);

module.exports = router;
