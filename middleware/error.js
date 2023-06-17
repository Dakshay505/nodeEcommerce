class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }

}


export const errorMiddleware = (err,req,resp,next)=>{
    return resp.status(err.statusCode || 400).json({
        success:false,
        message:err.message
      })
}

export default ErrorHandler;