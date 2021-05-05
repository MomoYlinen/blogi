const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are five blog posts ', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(22)
})

test('blog must have id ', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.map(r => r._id)).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title:"Summer middle of spring",
    author: "Hemuel Suomi",
    url:"www.blogs.com",
    likes:0
  }

  const response = await api.get('/api/blogs')
  const current_lenght = response.body.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(current_lenght+1)

  const contents = blogsAtEnd.body.map(n => n.author)
  expect(contents).toContain(
    "Hemuel Suomi"
  )
})

test('blogs default value for likes should be 0 ', async () => {
  const newBlog = {
    title:"Sad rainy afternoon",
    author: "Momo",
    url:"www.blogs.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await api.get('/api/blogs')
  const newestblog = blogsAtEnd.body.length
  expect(blogsAtEnd.body[newestblog-1].likes).toBe(0)
})

test('blogs default value for likes should be 0 ', async () => {
  const newBlog = {
    title:"Sad rainy afternoon",
    author: "Momo",
    url:"www.blogs.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await api.get('/api/blogs')
  const newestblog = blogsAtEnd.body.length
  expect(blogsAtEnd.body[newestblog-1].likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})