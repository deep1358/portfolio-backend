const express = require('express')
const { checkJwt } = require('../controllers/auth')
const {getBlogs, getBlogById, getBlogBySlug, createBlog, updateBlog } = require('../controllers/blogs')
const { checkRole } = require("../controllers/auth")
const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlogById)
router.get('/s/:slug', getBlogBySlug)
router.post('/', checkJwt,checkRole('admin'),createBlog)
router.patch('/:id', checkJwt,checkRole('admin'),updateBlog)


module.exports = router