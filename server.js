const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
// const err = new MongooseError(message);
const { MongoClient } = require('mongodb');



// const uri = "mongodb+srv://MinhajSadik:MongoDB1@cluster0.4y50m.mongodb.net/pizzaApp?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("pizzaApp").collection("menus");
//   console.log('data')
// });
const uri = "mongodb+srv://MinhajSadik:MongoDB1@cluster0.4y50m.mongodb.net/pizzaApp?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  // we're connected!
  console.log('connected')
});





//Assets
app.use(express.static('public'));



// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs')


require('./routes/web')(app);



app.listen(PORT, () => {
    console.log(`Listing on Port ${PORT}`);
})

