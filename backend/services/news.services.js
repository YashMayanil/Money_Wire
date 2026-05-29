import axios from "axios";

export const getNewzData = async()=>{
    try{
        const response = await axios.get(`https://newsapi.org/v2/everything?q=stock market india&apiKey=${process.env.NEWS_API_KEY}`)
        return response.data.articles;
    
    }catch(error){
        console.log(error);
    }
}