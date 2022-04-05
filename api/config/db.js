const mongoose = require("mongoose");

 const db = mongoose.connect("mongodb://localhost/planetaHonda", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(db => console.log("Base de datos conectada"))
.catch(err => console.log(`EROOR ${err}`))

module.exports = db;

