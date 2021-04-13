const express = require('express')
const { checkJwt } = require('../controllers/auth')
const { getPortfolios, getPortfolioById,createPortfolio } = require('../controllers/portfolios')
const router = express.Router()

router.get('/',getPortfolios)
router.get('/:id',getPortfolioById)

router.post('/',checkJwt,createPortfolio)

module.exports = router