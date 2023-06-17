import Brand from "../model/brandModel.js"


export const getAllBrand = async (req,resp)=>{

    try {
        const brand = await Brand.find();
        resp.status(200).json(brand);
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

// create brand
export const createBrand = async (req,resp)=>{
    try {
        const brand = await Brand.create(req.body);

        resp.status(201).json(brand);
        
    } catch (error) {
        resp.status(201).json({
            status:false,
            error
        });
    }
}

// get brand by id 
export const getBrandById = async (req,resp)=>{
    try {
        const brand = await Brand.findById(req.params.id);
        resp.status(200).json(brand);

    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

//update product by id
export const updateBrandById = async (req,resp)=>{
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true});
        resp.status(200).json(brand);
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}