import * as productControllers from "./../controllers/productController.js";
import * as uploadController from "./../controllers/uploadController.js";

import express from "express";

const router = express.Router();

router.route("/").get(productControllers.getAllProducts).post(productControllers.createProduct);
router.route("/uploads").post(uploadController.uploadProductImage);

export default router;
