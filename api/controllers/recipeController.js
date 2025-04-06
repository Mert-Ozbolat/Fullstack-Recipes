import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import crypto from 'crypto'
import isInValid from './../utils/isInValid.js';

const data = readRecipes()
console.log('Tüm verielr', data)


export const getAllRecipes = (req, res) => {
    let recipes = [...data];

    const search = req.query?.search?.toLowerCase();

    if (search) {
        recipes = data.filter((recipe) =>
            recipe.recipeName.toLowerCase().includes(search)
        );
    }

    if (req.query.order) {
        recipes.sort((a, b) =>
            req.query.order === "asc"
                ? a.recipeTime - b.recipeTime
                : b.recipeTime - a.recipeTime
        );
    }

    res.status(200).json({
        status: "success",
        results: recipes.length,
        recipes: recipes,
    });
};



export const createRecipes = (req, res) => {
    let newRecipe = req.body

    if (isInValid(newRecipe)) {
        return res.status(404).json({ message: 'Lütfen Bütün Değerleri Tanimlayin' })
    }

    newRecipe = {
        ...newRecipe,
        id: crypto.randomUUID(),
        photo: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
    }

    data.push(newRecipe)

    writeRecipes(data)

    res.status(201).json({ message: 'Tarif Oluşturuldu', recipe: newRecipe })
};



export const getRecipe = (req, res) => {
    res
        .status(200)
        .json({ message: "Aradığınız tarif bulundu", found: req.foundRecipe });
};



export const deleteRecipes = (req, res) => {
    const index = data.findIndex((i) => i.id === req.params.id)

    data.splice(index, 1)

    writeRecipes(data)

    res.status(204).json({})
};



export const uptadeRecipes = (req, res) => {
    const updated = { ...req.foundRecipe, ...req.body }

    const index = data.findIndex((i) => i.id === req.params.id)

    data.splice(index, 1, updated)

    writeRecipes(data)

    res.status(200).json({
        message: 'Tarif Başarıyla Güncellendi',
        recipe: updated
    })
};