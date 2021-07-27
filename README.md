# RealTime-Pizza-App

## YOU Know how To Connect Mongoose? this repo can help you

```description
First be sure you have MongoDB and Node.js installed.
Next install Mongoose from the command line using npm:
```

## $ npm install mongoose --save

```description
Now say we like fuzzy kittens and want to record every kitten we ever meet in MongoDB. The first thing we need to do is include mongoose in our project and open a connection to the test database on our locally running instance of MongoDB.
```

## getting-started.js

```code
const mongoose = require('mongoose');
const uri = "mongodb+srv://UserName:<YourPassword></YourPassword>@cluster0.4y50m.mongodb.net/YourAppName?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
```

```description
We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
```

```code
const db = mongoose.connection;
db.once('open', () => {
  // we're connected!
  console.log('connected')
});
```

## you can use this data your database

```data
_id: ObjectId("5eee66a5a27a66807cf2bea5")
name: "Americana"
image: "pizza.png"
price: "500"
size: "large"

_id: ObjectId("5eee66cfa27a66807cf2bea7")
name: "Paneer pizza"
image: "pizza.png"
price: "200"
size: "small"

_id: ObjectId("5eee651f739f8c674fd736ee")
name: "Margherita"
image: "pizza.png"
price: "250"
size: "small"

_id: ObjectId("5eee66c4a27a66807cf2bea6")
name: "Chicken Mushroom"
image: "pizza.png"
price: "350"
size: "medium"

_id: ObjectId("5eee66eea27a66807cf2bea8")
name: "Vegies pizza"
image: "pizza.png"
price: "600"
size: "large"

_id: ObjectId("5eee6671a27a66807cf2bea3")
name: "Marinara"
image: "pizza.png"
price: "300"
size: "medium"

_id: ObjectId("5eee6692a27a66807cf2bea4")
name: "Carbonara"
image: "pizza.png"
price: "200"
size: "small"

_id: ObjectId("5eee6717a27a66807cf2bea9")
name: "Pepperoni"
image: "pizza.png"
price: "500"
size: "medium"
```
