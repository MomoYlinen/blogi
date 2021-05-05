const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String, minlength: 3},
    author: {type: String, minlength:3},
    url: String,
    likes: {type : Number, default: 0}
  })

blogSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
}
})

module.exports = mongoose.model('Blog', blogSchema)