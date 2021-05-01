const blogRouter = require("../controllers/blogRoute")

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
    const max = blogs.reduce(function(prev, current) {
        return (prev.blogs > current.blogs) ? prev : current
    })
}

module.exports = {
    dummy,totalLikes,favoriteBlog
}