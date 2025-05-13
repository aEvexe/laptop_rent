const {Router} = require('express');
const { getAll, create, getById, update, remove, getOverdueCustomers, getSoldProductsInDateRange } = require('../controllers/contracts.controller');


const router = Router()

router.get("/all", getAll)
router.get("/getOverdueCustomers", getOverdueCustomers)
router.get('/getSoldProductsInDateRange', getSoldProductsInDateRange)
router.post("/", create)
router.get("/:id", getById)
router.patch("/:id", update)
router.delete("/:id", remove)

module.exports = router