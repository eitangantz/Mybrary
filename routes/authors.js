const express = require('express')
const author = require('../models/author')
const router = express.Router()

//all authors route
router.get('/', async (req,res)=>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try {
        const authors = await author.find(searchOptions)
        res.render("authors/index",{
            authors:authors,
            searchOptions: req.query
            }
        )
    } catch {
        res.redirect('/')
    }
    
})
//new author route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author: new author()})
})
//create author route
router.post('/',async (req,res)=>{
    const Author = new author({
        name: req.body.name
    })
    try {
        const newAuthor = await Author.save()
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: Author,
            errorMessage: 'error creating author'
        })
    }
//     //save to database
//     Author.save((err,newAuthor)=>{
//         if(err){
//             res.render('authors/new', {
//                 author: Author,
//                 errorMessage: 'error creating author'
//             })
//         }else{
//             res.redirect(`authors`)
//         }
//     })
})



module.exports = router