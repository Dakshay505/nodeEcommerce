import User from "../model/userModel.js";

// get all users
//admin
export const getUser =async (req,resp) => {

    let user = User.find({});
    let countUser = User.find({});
    if(req.query.category){
        user = User.find({category:req.query.category});
        countUser = countUser.find({category:req.query.category});
    }
    if(req.query.brand){
        user = User.find({brand:req.query.brand});
        countUser = countUser.find({brand:req.query.brand});
    }
    if(req.query._sort && req.query._order){
        user = User.sort({[req.query._sort]:req.query._order});
        countUser = countUser.sort({[req.query._sort]:req.query._order});
    }

    if(req.query._page && req.query._limit){
        const userLimit = req.query._limit;
        const page = req.query._page;
        user = User.skip(userLimit*(page-1)).limit(userLimit);

    }

    try {
        // const totalCount = await user.count().exec();

        const docs = await user.exec();
        const count = await countUser.count().exec();
       resp.set("X-Total-Count",count);
      
        resp.status(200).json(docs)
    } catch (error) {
        resp.status(200).json({
            success:true,
            error
        })   
    }
}

// get user by id 
export const getUserById = async (req,resp)=>{
    try {
        console.log(req.user)
        resp.status(200).json(req.user);

    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

//update user by id
export const updateUserById = async (req,resp)=>{
    try {
        const user = await User.findByIdAndUpdate(req.user.id,req.body,{new:true});
        console.log(user);
        resp.status(200).json(user);
    } catch (error) {
        resp.status(400).json({
            success:false,
            error
        })
    }
}

// logout
export const logout = (req, resp) => {
    resp
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User logged out successfully",
      });
  };