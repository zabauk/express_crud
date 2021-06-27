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
})