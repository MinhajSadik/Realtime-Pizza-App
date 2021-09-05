const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));


//Assets
app.use(express.static('public'));

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs')


require('./routes/web')(app);


const uri = "mongodb+srv://Realtime-Pizza-App:realtime-pizza-app@cluster0.4y50m.mongodb.net/pizzaApp?retryWrites=true&w=majority";

mongoose.connect(uri,{useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`Listing on Port ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);



