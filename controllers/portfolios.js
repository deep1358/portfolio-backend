const mongoose = require("mongoose")
const Portfolio = mongoose.model('Portfolio')

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({})
  res.json(portfolios)
}

exports.getPortfolioById = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await Portfolio.findById(id)
    res.json(portfolio)
  } catch (e) {
    return res.status(422).status(e.message)
  }
}
exports.createPortfolio = async (req, res) => {
  const portfolioData = req.body
  const uId = 'google-oauth2|115227964770374211286'
  const portfolio = new Portfolio(portfolioData)
  portfolio.userId = uId
  try {
    const newPortfolio = await portfolio.save()
    // console.log(JSON.stringify(newPortfolio))
    return res.json(newPortfolio)
  } catch (e) {
    return res.status(422).status(e.message)
  }
}