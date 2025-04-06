import {
    createRecipes,
    deleteRecipes,
    getAllRecipes,
    getRecipe,
    uptadeRecipes,
} from "../controllers/recipeController.js";
import express from "express";
import controlId from "../middleware/controlId.js";

const router = express.Router();

router
    .route("/api/v1/recipes")
    .get(getAllRecipes)
    .post(createRecipes);

router
    .route("/api/v1/recipes/:id")
    .get(controlId, getRecipe)
    .delete(controlId, deleteRecipes)
    .patch(controlId, uptadeRecipes);


export default router;