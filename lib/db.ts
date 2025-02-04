import mongoose from "mongoose";
const MONGODB_URI =
  process.env.MONGODB_URI! ||
  "mongodb+srv://gsbo21:gsb021@cluster0.zcrvj.mongodb.net/";
if (!MONGODB_URI) {
  throw new Error(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
}

let chached = global.mongoose;
if (!chached) chached = global.mongoose = { conn: null, promise: null };
export default async function dbConnect() {
  if (chached.conn) return chached.conn;
  if (!chached.promise) {
    const opts = {
      bufferMaxEntries: 0,
      maxPoolSize: 5,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    chached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose.connection);
    }
    try {
        chached.conn = await chached.promise;
    }
    catch (e) {
        chached.conn = null;
        chached.promise = null;
        throw new Error("Error connecting to database");
    }
    return chached.conn;
}
