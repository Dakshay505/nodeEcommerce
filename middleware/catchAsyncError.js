let cAE = func => (req,resp,next)=>{

    Promise.resolve(func(req,resp,next)).catch(next);
}   

export default cAE;