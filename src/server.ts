import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./app/config/env.js";
import app from "./app.js";
const port = envVars.PORT;
let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`${envVars.DB_URL}`);
    console.log("Server Connected to MongoDB!");
    server = app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
};

startServer();

process.on("unhandledRejection", ()=>{
    console.log("Unhandled Rejection detected....Server Sutting down");

    if(server){
        server.close(()=>{
            process.exit(1);
        });
    };
    process.exit(1);
})

process.on("uncaughtException", (error)=>{
    console.log("Uncaught Exception detected....Server Shutting down");
    console.error(error);

    if(server){
        server.close(()=>{
            process.exit(1);
        });
    };
    process.exit(1);
})