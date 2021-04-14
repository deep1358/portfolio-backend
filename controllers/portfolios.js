const mongoose = require("mongoose");
const Portfolio = mongoose.model("Portfolio");

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({});
  res.json(portfolios);
};

exports.getPortfolioById = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await Portfolio.findById(id);
    res.json(portfolio);
  } catch (e) {
    return res.status(422).status(e.message);
  }
};
exports.createPortfolio = async (req, res) => {
  const portfolioData = req.body;
  const uId = req.user.sub;
  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = uId;
  try {
    const newPortfolio = await portfolio.save();
    return res.json(newPortfolio);
  } catch (e) {
    return res.status(422).status(e.message);
  }
};

exports.updatePortfolio = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });
    return res.json(updatedPortfolio);
  } catch (e) {
    return res.status(422).status(e.message);
  }
};

exports.deletePortfolio = async(req,res)=>{
  const portfolio = await Portfolio.findOneAndDelete({_id:req.params.id})
  res.json({_id:portfolio.id})
}

