module.exports=(thisfun)=>(req,res,next)=>{
    Promise.resolve(thisfun(req,res,next)).catch(next);
}