import Product from "../model/productModel.js";

// adding product
//admin 
export const addProduct =async (req,resp)=>{
    try {
        const product = new Product(req.body);
        await product.save();
        resp.status(201).json(product)
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

export const getAllCategory = async(req,resp)=>{
    let product =await Product.find();
    function createUniqueCategoryArray(productsArray) {
        const resultArray = [];
        const categoryMap = {};
      
        for (let i = 0; i < productsArray.length; i++) {
          const currentProduct = productsArray[i];
          const category = currentProduct.category;
      
          if (!categoryMap[category]) {
            const newObject = {
              label: category,
              value:category,
              checked: false
            };
      
            categoryMap[category] = true;
            resultArray.push(newObject);
          }
        }
      
        return resultArray;
      }
      const cat = createUniqueCategoryArray(product)
      
      resp.status(200).json(cat) ;   
}

// get all products

export const getProduct =async (req,resp) => {

    let product = Product.find({deleted:{$ne:true}});
    let countProduct = Product.find({deleted:{$ne:true}});
    if(req.query.category){
        product = product.find({category:req.query.category});
        countProduct = countProduct.find({category:req.query.category});
    }
    if(req.query.brand){
        product = product.find({brand:req.query.brand});
        countProduct = countProduct.find({brand:req.query.brand});
    }
    if(req.query._sort && req.query._order){
        product = product.sort({[req.query._sort]:req.query._order});
        countProduct = countProduct.sort({[req.query._sort]:req.query._order});
    }

    if(req.query._page && req.query._limit){
        const productLimit = req.query._limit;
        const page = req.query._page;
        product = product.skip(productLimit*(page-1)).limit(productLimit);

    }

    try {
        // const totalCount = await product.count().exec();

        const docs = await product.exec();
        const count = await countProduct.count().exec();
      
       resp.set("X-Total-Count",count);
      
        resp.status(200).json(docs)
    } catch (error) {
        resp.status(200).json({
            success:true,
            error
        })   
    }
}
// get all products

export const getAllProductAdmin =async (req,resp) => {

    let product = Product.find();
    let countProduct = Product.find();
    if(req.query.category){
        product = product.find({category:req.query.category});
        countProduct = countProduct.find({category:req.query.category});
    }
    if(req.query.brand){
        product = product.find({brand:req.query.brand});
        countProduct = countProduct.find({brand:req.query.brand});
    }
    if(req.query._sort && req.query._order){
        product = product.sort({[req.query._sort]:req.query._order});
        countProduct = countProduct.sort({[req.query._sort]:req.query._order});
    }

    if(req.query._page && req.query._limit){
        const productLimit = req.query._limit;
        const page = req.query._page;
        product = product.skip(productLimit*(page-1)).limit(productLimit);

    }

    try {
        // const totalCount = await product.count().exec();

        const docs = await product.exec();
        const count = await countProduct.count().exec();
       resp.set("X-Total-Count",count);
      
        resp.status(200).json(docs)
    } catch (error) {
        resp.status(200).json({
            success:true,
            error
        })   
    }
}

// get product by id 
export const getProductById = async (req,resp)=>{
    try {
        const product = await Product.findById(req.params.id);
        resp.status(200).json(product);

    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

//update product by id
export const updateProductById = async (req,resp)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        resp.status(200).json(product);
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

// filter 
export const filterbyBrand = async(req,resp)=>{
    const brands = req.query.brands ? req.query.brands.split(',') : [];
    const categories = req.query.categories ? req.query.categories.split(',') : [];
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
  
    const filters = {};
    if (brands.length > 0) {
      filters.brand = { $in: brands };
    }
    if (categories.length > 0) {
      filters.category = { $in: categories };
    }
  
    const prd = await Product.find(filters).skip((page - 1) * limit).limit(limit)
      
    resp.status(200).json({
        success:true,
        message:"got all prd",
        prd
    })
}
