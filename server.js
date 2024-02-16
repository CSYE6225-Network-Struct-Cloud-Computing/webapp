require("dotenv").config();
const { app } = require("./app");
const db = require("./models/index.js");

// db.sequelize
//     .sync({ alter: true })
//     .then(() => {})
//     .catch((error) => {
//         console.log("Error connecting to database : ", error);
//     });

db.checkDatabaseConnectivityAndCreation()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server is Running on Port :", process.env.PORT);
        });
    })
    .catch(() => {
        console.log("Error in connecting to database");
    });
