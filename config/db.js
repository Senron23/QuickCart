import mongoose from "mongoose";

let catched = global.mongoose;

if (!catched) {
  catched = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    
    if (catched.conn) {
        return catched.conn;
    }
    
    if (!catched.promise) {
        const opts = {
        bufferCommands: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        };
    
        catched.promise = mongoose.connect(`${process.env.MONGO_URI}/QuickCart`,opts).then((mongoose) => {
        return mongoose;
        });
    }
    
    catched.conn = await catched.promise;
    return catched.conn;
}

export default connectDB;