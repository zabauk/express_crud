
var express=require('express')
const bodyParser=require('body-parser')
var app=express()

//ejs view engine uses
app.set('view engine', 'ejs')

//use static file
app.use(express.static('public'))

//use body parser
app.use(bodyParser.urlencoded({extended:true}))

//use json from server
app.use(bodyParser.json())

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
        db.collection('quote').find().toArray().then(result=>{
            res.render('quote.ejs', {quotes: result})
        }).catch(err=>console.log(err))
        
    })
    
    
    app.post('/quote', (req, res)=>{
        quouteCollection.insertOne(req.body).then(result=>{
            res.redirect('/quote')
        }).catch(err=>{
            console.log(error)
        })
    })

    //update data
    app.put('/quote', (req, res)=>{
        quouteCollection.findOneAndUpdate(
            {name:'Yoda'},
            {
                $set:{
                    quote:req.body.quote,
                    name:req.body.name,
                }
            },
            {
                upsert:true
            }).then(result=>res.redirect('/quote')).catch(err=>console.log(err))
    })

    //delete
    app.delete('/quote', (req, res)=>{
        quouteCollection.deleteOne({
            name:req.body.name
        }).then(console.log('abc')).catch(err=>console.log(err))
    })


})



app.get('/', function(req, res){
    res.send('Hello World')
})



app.listen(3000, ()=>{
    console.log('server running on pot 3000')
})