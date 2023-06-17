import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },  
  email:{
    type:String,
    unique:[true,"Email should be unique"],
    required:[true,"Email is required."]
  },
  password:{
    type:String,
    required:[true,"Password is required."]
  },
  role:{
    type:String,
    default:"user"
  },
  addresses:{
     type:[mongoose.Schema.Types.Mixed]
  },
  orders:{
    type:[mongoose.Schema.Types.Mixed]
  }

});
const virtual = userSchema.virtual('id');
virtual.get(function(){
  return this._id;
})

userSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform : function (doc,ret){ delete ret._id} 
})

const userModel = mongoose.model("User", userSchema);
export default userModel;
