import mongoose from "mongoose";
import 'dotenv/config'

type ConnectionObject = {
    isConnected?: number
}

const connection : ConnectionObject = {}

const connectDB = async () : Promise<void> => {
    if(connection.isConnected){
        console.log("Already connected to DB");
        return;
    }

    try {
        const DB = await mongoose.connect(process.env.MONGO_URI || "")
        connection.isConnected = DB.connections[0].readyState

        console.log("Database Connected",DB.connection.host);
        
    } catch (error) {
        console.log("Error in connecting DB",error);
        process.exit(1)
    }
} 

export default connectDB;