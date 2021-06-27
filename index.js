
var express=require('express')
const bodyParser=require('body-parser')
var app=express()

//ejs view engine uses
app.set('view engine', 'ejs')

//use static file
app.use(express.static('public'))

//use body parser
app.use(bodyParser.urlencoded({extended:true}))

//database connect
const MongoClient=require('mongodb').MongoClient
//url
const url='mongodb://127.0.0.1:27017'

//connect mongo db
MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>{
    if(err){
        console.log('Error occur'+err)
    }

    //specify db
    const db=client.db('starwar')
    const quouteCollection=db.collection('quote')
    console.log(`MongoDB Connect ${url}`)

    app.get('/quote', (req, res)=>{
        res.render('quote.ejs')
    })
    
    
    app.post('/quote', (req, res, next)=>{
        quouteCollection.insertOne(req.body).then(result=>{
            console.log(result)
        }).catch(err=>{
            console.log(error)
        })
        next()
    }, function(req, res){
        res.redirect('/quote')
    })
})

app.get('/', function(req, res){
    res.send('Hello World')
})



app.listen(3000, ()=>{
    console.log('server running on pot 3000')
})