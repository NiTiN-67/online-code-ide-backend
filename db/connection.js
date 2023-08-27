import mongoose from "mongoose";
const URL = 'mongodb+srv://NiTiN:NiTiN2002@mycluster.ydpmb7d.mongodb.net/userdb?retryWrites=true&w=majority';
const promise =  mongoose.connect(URL);
promise.then(data=>{
    console.log("DB Connected...");
}).catch(err=>{
    console.log("Error during DB Connection ", err);
})
export default mongoose;
