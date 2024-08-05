const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DEVConnectionString);
        console.log("Connected to DB");
    }
    catch(err){
        console.error("Error connecting to database", err);
        process.exit(1);
    }
}

module.exports = connectDB;