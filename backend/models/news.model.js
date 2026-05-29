import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum: ["DIVIDEND",
        "BONUS",
        "STOCK_SPLIT",
        "DEMERGER",
        "IPO",
        "RIGHTS_ISSUE",
        "RESULTS",
        "GENERAL"],
        required:true
    },
    url:{
        type:String,
        required:true
    },
    publishedAt:{
        type:Date,
        required:true
    },
    image:{
        type:String,
        default:""
    }
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);

export default News;
