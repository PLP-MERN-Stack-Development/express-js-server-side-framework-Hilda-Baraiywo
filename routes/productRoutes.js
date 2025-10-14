const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { validateProductCreation, validateProductUpdate } = require("../middleware/validationMiddleware");
const {getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct} = require("../controllers/productController");

// Define routes and link to controller functions
router.get("/", authMiddleware, getAllProducts);
router.get("/:id",authMiddleware, getProductById);

router.post("/", authMiddleware, validateProductCreation, createProduct);
router.put("/:id", validateProductUpdate, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;