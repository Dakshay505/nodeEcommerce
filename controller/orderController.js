import Order from "../model/orderModel.js";

// get all orders admin
export const getAllOrder =async (req,resp) => {
   
    let order = Order.find();
    let countOrder = Order.find();
    
    if(req.query._sort && req.query._order){
        order = order.sort({[req.query._sort]:req.query._order});
        countOrder = countOrder.sort({[req.query._sort]:req.query._order});
    }
    if(req.query._page && req.query._limit){
        const orderLimit = req.query._limit;
        const page = req.query._page;
        order = order.skip(orderLimit*(page-1)).limit(orderLimit);

    }

    try {
        // const totalCount = await order.count().exec();

        const docs = await order.exec();
        const count = await countOrder.count().exec();
       resp.set("X-Total-Count",count);
      
        resp.status(200).json(docs)
    } catch (error) {
        resp.status(200).json({
            success:true,
            error
        })   
    }
}



// get all items in order by user
export const getAllOrderItemsByUser = async (req,resp)=>{

   try {
    const user = req.params.id;
    const order = await Order.find({user:user}).populate("user").exec();
    resp.status(200).json(order);
    
   } catch (error) {
    resp.status(400).json(error)
    
   }  
   
}

// add to order

export const addToOrder = async(req,resp)=>{
   try {
    const order = await Order.create(req.body);
    const result = await order.populate("user");
    resp.status(201).json(result);
    
   } catch (error) {
    resp.status(400).json(error);
   }

}
export const deleteFromOrder = async(req,resp)=>{
   try {
    const order = await Order.deleteOne({id:req.params.id});
    resp.status(201).json(order);
    
   } catch (error) {
    resp.status(400).json(error);
   }

}
// 
export const updateOrderById = async (req,resp)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,req.body,{new:true});
        resp.status(200).json(order);
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}


