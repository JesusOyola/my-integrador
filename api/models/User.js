const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
    name:{
        type: String,
        required:true,
        trim: true, 
    },
    email:{
        type: String,
        required: true, 
        unique: true,
        lowercase:true,
        trim: true, 
    },
    password:{
        type: String, 
        required:true,
    },
    isAdmin:{
        type:Boolean,
        defaultValue:false,
    },
    salt: {
        type: String,
      }
    
},{
    timestamps: true
})


    UserSchema.pre("save", function(next) {
    if(!this.isModified("password") ) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
    }); 

   


   /*  UserSchema.pre("findOneAndUpdate", async function (next) {
        try {
          if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10);
            this._update.password = hashed;
          }
          next();
        } catch (err) {
          return next(err);
        }
      }); */

    UserSchema.methods.matchPassword =  function(password) {
    return bcrypt.compare(password, this.password)
    };  
  
 


 

const User = model("User", UserSchema )

module.exports = User;



//PARA USAR ESTO ME FALTA AGREGAR EL SALT COMO PROPIEDAD. PERO NO FUNCIONA, ME TIRA UN ERROR DE QUE EL SALT TIENE QUE SER UN NÚMERO Y NO SE COMO ARREGLARLO



/*  UserSchema.pre("save", (password, salt)=> {
    return bcrypt.hash(password, salt);
}); */ 


/* UserSchema.pre("save", (password, salt)=> {
    return bcrypt.hash(password, salt);
});  


    UserSchema.pre ("save", user => {
    return bcrypt
    .genSalt(10)
    .then(salt => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then(hash => (user.password = hash));
    
});  */ 









