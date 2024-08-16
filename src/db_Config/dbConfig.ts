import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB Connected");
    });

    connection.on("error", (err) => {
      console.log("DB Connection Error");
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log("Sommething Went wrong in DB connection");
    console.log(error);
  }
}
