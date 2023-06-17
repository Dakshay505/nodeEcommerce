import Category from "../model/categoryModel.js"

// get all category
export const getAllCategory = async (req,resp)=>{

    try {
        const category = await Category.find();
        resp.status(200).json(category)
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}


// create category
export const createCategory = async (req,resp)=>{
    try {
        const category = await Category.create(req.body);
        resp.status(201).json(category);
        
    } catch (error) {
        resp.status(201).json({
            status:false,
            error
        });
    }
}

// get category by id 
export const getCategoryById = async (req,resp)=>{
    try {
        const category = await Category.findById(req.params.id);
        resp.status(200).json(category);

    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

//update category by id
export const updateCategoryById = async (req,resp)=>{
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
        resp.status(200).json(category);
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}