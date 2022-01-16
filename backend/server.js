const app=require('./app');

const cloudinary =require('cloudinary')
const connectDatabase=require('./config/database');

if(process.env.NODE_ENV!=="PRODUCTION")
{
    require('dotenv').config({path:"backend/config/config.env"});
}


process.on("uncaughtException",(err)=>{
console.log(`Error:${err.message}`);
console.log(`shutting down the server due to uncaught Exception `); 
process.exit(1);
})

connectDatabase();
cloudinary.config({
    cloud_name: "dubzmbbue",
    api_key: "973887956224999",
    api_secret: "GmI884nMmIafM9eFQw7atXl4fEY"
   
})
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise recjection `);
    server.close(()=>
    {
process.exit(1);
    })
})