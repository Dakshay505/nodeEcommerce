import passport from "passport";



export const sanitizeUser = (user)=>{
    return {id:user.id,role:user.role};

}

export function isAuth(req,resp,next){
   return passport.authenticate('jwt');
}  
export const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };