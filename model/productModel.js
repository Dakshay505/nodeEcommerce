import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  description: {
    type: String,
    required: [true, "description is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "The minimum value of price is 100."],
    max: [1000000, "the max value for price is 1000000."],
  },
  discountPercentage: {
    type: Number,
    min: [1, "The minimum value for discount is 10."],
    max: [95, "The maximum value for discount is 95."],
  },
  rating: {
    type: Number,
    default: 0,
    max: [5, "rating should be under 5."],
  },
  stock: {
    type: Number,
    default: 1,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
const virtual = productSchema.virtual('id');
virtual.get(function(){
  return this._id;
})

productSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform : function (doc,ret){ delete ret._id} 
})

const productModel = mongoose.model("Product", productSchema);
export default productModel;
