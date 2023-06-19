import Cart from "../model/cartModel.js";


// get all items in cart by user
export const getAllCartItemsByUser = async (req,resp)=>{
   try {
    const user = req.user.id;
    const cart = await Cart.find({user:user}).populate("user").populate("product").exec();
    resp.status(200).json(cart);
    
   } catch (error) {
    resp.status(400).json(error);
   }  
}


// add to cart
export const addToCart = async(req,resp)=>{
   try {
    const user = req.user.id
    const {product,quantity} = req.body;
    const cart = await Cart.create({user,product,quantity});
    console.log("this is cart",cart);
    const result = await cart.populate("product");
    
    resp.status(201).json(result);
    
   } catch (error) {
    resp.status(400).json(error);
   }

}
export const deleteFromCart = async(req,resp)=>{
   try {
    console.log(req.params.id);
    const cart = await Cart.findByIdAndDelete(req.params.id);
    console.log(cart);
    resp.status(201).json(cart);
    
   } catch (error) {
    resp.status(400).json(error);
   }

}
// 
export const updateCartById = async (req,resp)=>{
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true});
        const result = await cart.populate("product");
        resp.status(200).json(result);
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}
// export dellete all cart item after order

export const delleteAllItemInCart = async (req,resp)=>{
    try {
        const user = req.user;
         await Cart.deleteMany({user:user.id});
        resp.status(200).json({
            success:true
        });
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}
