const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String, minlength: 3},
    author: {type: String, minlength:3},
    url: String,
    likes: {type : Number, default: 0},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'}
  })

blogSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
}
})

module.exports = mongoose.model('Blog', blogSchema)