const express = require('express')
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/database')
const imgur = require('imgur')
const fs = require('fs')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload')
const app= express()


mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine','ejs')
app.use(fileUpload())

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt : 'desc'})
    res.render('articles/index',{articles: articles})
})
// app.post('/upload', (req, res) => {
//     if (!req.files) {
//         return res.status(400).send('No files were uploaded.')
//     }
//
//     let sampleFile = req.files.sampleFile
//     let uploadPath = __dirname + '/uploads/' + sampleFile.name
//
//     sampleFile.mv(uploadPath, function (err) {
//         if (err) {
//             return res.status(500).send(err)
//         }
//
//         imgur.uploadFile(uploadPath).then((urlObject) => {
//             fs.unlinkSync(uploadPath)
//             res.render('uploaded.ejs', { link: urlObject.link })
//         })
//     })
// })


app.use('/articles',articleRouter)
app.listen(process.env.PORT || 3002);