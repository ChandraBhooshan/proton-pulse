// const mongoose = require("mongoose");

// const mongo_url = process.env.MONGO_CONN;

// mongoose
//   .connect(mongo_url)
//   .then(() => {
//     console.log("MongoDB Connected...");
//   })
//   .catch((err) => {
//     console.log("MongoDB Connection Error: ", err);
//   });

const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // Reuse an existing active connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }
  // Reuse a connection attempt already in progress
  if (!cached.promise) {
    const mongoUrl = process.env.MONGO_CONN;

    if (!mongoUrl) {
      throw new Error("MONGO_CONN environment variable is missing");
    }

    cached.promise = mongoose
      .connect(mongoUrl, {
        serverSelectionTimeoutMS: 10000,
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB Connected:", mongoose.connection.name);
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        cached.conn = null;
        console.error("MongoDB Connection Error:", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
