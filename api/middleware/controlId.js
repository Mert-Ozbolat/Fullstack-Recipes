import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

const controlId = (req, res, next) => {
    const found = data.find((i) => i.id === req.params.id);

    if (!found) {
        return res
            .status(404)
            .json({ message: "Aradığınız id'li eleman bulunamadı" });
    }

    // req nesnesi içerisine bulunan ekle
    req.foundRecipe = found;

    next();
};

export default controlId;