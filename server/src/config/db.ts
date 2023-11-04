import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then((res) => {
      console.log(`Database Name : ${res.connection.db.databaseName}`);
      console.log(`Database Port : ${res.connection.port}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Database Connection Is Working!...");
  });
  mongoose.connection.on("error", (error) => {
    console.log(error.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Connection is Disconnected!..");
  });
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectToDatabase;
