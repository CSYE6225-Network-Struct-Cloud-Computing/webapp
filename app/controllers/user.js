const { User } = require("../models");
const bcrypt = require("bcrypt");
const logger = require("../logs-app/index")

async function updateUser(req, res) {
    try {
        const { first_name, last_name, password } = req.body;

        if (req.body.username != undefined) {
            logger.warn(`Update should not have username in it ${req.body.username}`)
            return res.status(400).end();
        }

        if (!first_name || !last_name || !password || first_name == "" || last_name == "" || password == "") {
            logger.warn(`When updating for username ${req.user.username} details such as first name : ${first_name} , last name : ${last_name} and password should not be empty `);
            return res.status(400).end();
        }

        // console.log("REQ User : ", req.user);
        const username = req.user.username;
        // console.log("UserName Auth wala", username);

        const user = req.user;

        if (first_name) {
            user.first_name = first_name;
        }
        if (last_name) {
            user.last_name = last_name;
        }
        if (password) {
            const BcryptPassword = await bcrypt.hash(password, 10);
            user.password = BcryptPassword;
        }
        user.account_updated = new Date();
        console.log("Final User ", user);

        await User.update(user, { where: { username: username } });

        logger.info(`Update user has been sucessfull for username ${username} with details provided ( ${first_name} ${last_name} )`)

        return res.status(204).end();
    } catch (error) {
        // console.error("Error updating user:", error);
        logger.error(` Error While Updating user : ${error}`);
        return res.status(400).end();
    }
}

async function getUser(req, res) {
    try {
        const username = req.user.username;
        // console.log(username);
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // console.log(user);
        // Return user information
        logger.info(`Information for user with username ${user.username} has been retrieved : { first name : ${user.first_name}, last name : ${user.last_name} } `);
        return res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            account_created: user.account_created,
            account_updated: user.account_updated,
        });
    } catch (error) {
        // console.error("Error retrieving user:", error);
        logger.error(`error retrieving user : ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function createNewUser(req, res) {
    try {
        const { first_name, last_name, password, username } = req.body;

        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // console.log("first_name", first_name);
        // console.log("first_name", last_name);
        // console.log("first_name", username);
        logger.info(`User Create Process Started for ${first_name} ${last_name} with email id ${username}`);

        if (!first_name || !last_name || !password || !regex.test(username)) {
            logger.warn(`User ${first_name} ${last_name} with email id ${username} has incorrect or insufficent details`);
            return res.status(400).end();
        }
        
        const chechIfExistingUser = await User.findOne({ where: { username } });
        if (chechIfExistingUser) {
            logger.warn(`User with email id ${username} already exists`);
            return res.status(400).end();
        }
        
        const BcryptPassword = await bcrypt.hash(password, 10);

        const newCreatedUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: BcryptPassword,
        });
        console.log(newCreatedUser.dataValues.first_name);
        logger.info(`User Create Process Successfull for ${newCreatedUser.dataValues.first_name} ${newCreatedUser.dataValues.last_name} with email id ${newCreatedUser.dataValues.username}`);
        // return res.status(201).end();
        delete newCreatedUser.dataValues.password;
        return res.status(201).json(newCreatedUser);

        // .json({
        //     id: newCreatedUser.id,
        //     first_name: newCreatedUser.first_name,
        //     last_name: newCreatedUser.last_name,
        //     username: newCreatedUser.email,
        //     account_created: newCreatedUser.account_created,
        //     account_updated: newCreatedUser.account_updated,
        // });
    } catch (error) {
        // console.error("Error creating user:", error);
        logger.error(`Error Creating user : ${error}`)
        return res.status(400).end();
    }
}

module.exports = {
    createNewUser,
    updateUser,
    getUser,
};
