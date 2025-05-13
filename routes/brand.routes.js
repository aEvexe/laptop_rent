const {Router} = require('express');
const { getAll, create, getById, update, remove } = require('../controllers/brand.controller');


const router = Router()

router.get("/all", getAll)
router.post("/", create)
router.get("/:id", getById)
router.patch("/:id", update)
router.delete("/:id", remove)

module.exports = router