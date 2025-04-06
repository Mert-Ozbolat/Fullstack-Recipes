import { readRecipes } from "../model/recipeModel.js";


const data = readRecipes()

const controlId = (req, res, next) => {
    const found = data.find((i) => i.id === req.params.id)

    if (!found) {
        return res.status(404).json({ message: 'Ardaığınız id li eleman bulunamadı' })
    }

    next()
}

export default controlId