const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please Enter your Product Name"]
    },
    description:{
        type:String,
        required: [true,"Please Enter your Product Description"]
    },
    price:{
        type:Number,
        required: [true,"Please Enter your Product Price"],
        maxLength:[8,"Price can not exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[{
        public_id:{
            type:String,
            required:true
        },
        url:
        {
            type:String,
            required:true
        }
    }],
    category:
    {
        type:String,
        required: [true,"Please Enter your Product Category"],
    },
    stock:
    {
        type:Number,
        required: [true,"Please Enter your Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 character"],
        default:1
    },
    numOfReviews:
    {
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        } ,
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        Comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    } ,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",productSchema);