const blogRouter = require("../controllers/blogRoute")
const _= require('lodash')
const blogs = require("../models/blogs")

const dummy = (blogs) => {
return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
}

    const likes = blogs.map(like => like.likes)

    return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
    const max = blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })

    const favorite = {
        "title": max.title,
        "author":max.author,
        "likes": max.likes
    }

    return favorite

}

const mostBlogs = (blogs) => {

    let most = _.countBy(blogs.map(blog => blog.author))
    console.log(most)

    let maxValue = Object.entries(most).sort((x,y)=>y[1]-x[1])[0]

    const winner = {
        "author":maxValue[0],
        "blogs":maxValue[1]
    }

    return winner

}

module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs
}