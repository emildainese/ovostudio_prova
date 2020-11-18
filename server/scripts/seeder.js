const connectDB = require("../db/database");
const dotenv = require("dotenv");
const users = require("../data/users");
const User = require("../models/User");
dotenv.config({ path: "../.env" });

connectDB();

const importData = async () => {
  try {
    await User.create(users);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//node seeder -i
if (process.argv[2] === "-i") {
  importData();
  //node seeder -d
} else if (process.argv[2] === "-d") {
  deleteData();
}
