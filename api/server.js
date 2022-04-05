const express = require("express");
const morgan = require("morgan");
const db = require("./config/db")
const routes = require("./routes")
const cookieParser = require('cookie-parser');
const passport = require("passport")
const passportConfig = require("./config/passport")
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Esto nos permite recibir los datos desde el cliente, el extend:false indica que no voy a recibir imagenes y nada raro, solamente datosque vienen desde un formulario.

app.use(cookieParser())

app.use(
    session({
      secret: 'user',
      resave: true,
      saveUninitialized: true,
    })
  );
  
app.use(passport.initialize());
app.use(passport.session());

passport.use(passportConfig.localStrategyInstance);

passport.serializeUser(passportConfig.serializeUser);

passport.deserializeUser(passportConfig.deserializeUser);

app.use("/api", routes);

app.use('/api', (req, res) => {
  res.sendStatus(404);
});

 app.use((err,req,res,next)=>{
    res.status(500).send(err.message)
}); 


const PORT = 3001;


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))