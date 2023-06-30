// server.js
//console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://buinghialk180303:1232133312a@cluster0.gg4bh7v.mongodb.net/'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
  
        const db = client.db('toyshopdb')
        const quotesCollection = db.collection('product')
        
        app.set('view engine', 'ejs') 
        
        app.use(bodyParser.urlencoded({ extended: true }))

        app.use(express.static('public'))

        app.use(bodyParser.json())

        app.get('/', (req, res) => {
            db.collection('product').find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { quotes: results })
                })
                .catch()
        })

        app.post('/product', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                
                // results -> server -> console
                console.log(result)

                // -> redirect -> '/'
                res.redirect('/')
             })
            .catch(error => console.error(error))
        })
        
        // server -> listen -> port -> 3000
        app.listen(3000, function() {
            console.log('listening on 3000')
        })
    })


