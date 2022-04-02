const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
 
//copy-paste url from web api
fetch('https://api.sampleapis.com/beers/ale')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })
 
//all beers
//localhost:3000/beers
//copy/paste URL from api.sampleapis.com
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/beers/ale'
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/beers', {
                title: 'All Beers',
                name: 'Beer Cooler',
                body: 'all',
                data
            })
        })
})
 
//single-beer
//localhost:3000/beers/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/beers/ale/${id}`
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-beer', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    body: 'single',
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})
 

//change section to match current api
//by creator
//localhost:3000/cartoon/creator
// router.get('/creator/:creator', (req, res) => {
//     const creator = req.params.creator
//     const URL = 'https://api.sampleapis.com/cartoons/cartoons2D'
 
//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             for (let i = 0; i < data.creator.length; i++) {
//                 if(creator == data.creator[i]) {
//                     res.render('pages/cartoons', {
//                         title: creator,
//                         name: creator,
//                         data
//                     })
//                 }
//             }
//         })
// })
 
 
//by genre
 
module.exports = router