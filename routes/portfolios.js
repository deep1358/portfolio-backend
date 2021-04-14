const express = require('express')
const { checkJwt } = require('../controllers/auth')
const { getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolios')
const { checkRole } = require("../controllers/auth")
const router = express.Router()

router.get('/', getPortfolios)
router.get('/:id', getPortfolioById)

router.post('/', checkJwt, checkRole('admin'), createPortfolio)

router.patch('/:id', checkJwt, checkRole('admin'), updatePortfolio)

router.delete('/:id', checkJwt, checkRole('admin'), deletePortfolio)

module.exports = router