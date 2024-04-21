import mongoose from "mongoose";
import { NextResponse } from "next/server";

const connState = mongoose.connection.readyState;

const conn = async () => {
    try {
        if (connState === 1) {
            console.log("Connection already established");
            return new NextResponse("Connection already established");
        }
        if (connState === 2) {
            console.log("Connecting to database");
            return new NextResponse("Connecting to database");
        }
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "myDB",
            bufferCommands: false
        })
    } catch (error) {
        console.error(error);
    }
}

export default conn;