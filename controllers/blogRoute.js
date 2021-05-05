const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const Logger = require('../utils/logger')

blogRouter.get('/', (request, response) => {
  Blog
    .find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()))
    })
})

blogRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})
  
blogRouter.post('/', async (request, response, next) => {

    const blog = new Blog(response.body)
  
    try { 
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
    
  }

  Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogRouter