const { User } = require("../models");
const bcrypt = require("bcrypt");

async function updateUser(req, res) {
    try {
        const { first_name, last_name, password } = req.body;

        if (req.body.username != undefined) {
            return res.status(400).end();
        }

        if (!first_name && !last_name && !password) {
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
        // console.log("Final User ", user);

        await User.update(user, { where: { username: username } });

        return res.status(204).end();
    } catch (error) {
        console.error("Error updating user:", error);
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
        console.log(user);
        // Return user information
        return res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            account_created: user.account_created,
            account_updated: user.account_updated,
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function createNewUser(req, res) {
    try {
        const { first_name, last_name, password, username } = req.body;

        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log("first_name", first_name);
        console.log("first_name", last_name);
        console.log("first_name", password);
        console.log("first_name", username);

        if (!first_name || !last_name || !password || !regex.test(username)) {
            console.log("CALLED 1");
            return res.status(400).end();
        }
        console.log("CALLED 1-1");
        const chechIfExistingUser = await User.findOne({ where: { username } });
        if (chechIfExistingUser) {
            console.log("CALLED 2");
            return res.status(400).end();
        }
        console.log("CALLED 3");
        const BcryptPassword = await bcrypt.hash(password, 10);

        const newCreatedUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: BcryptPassword,
        });
        console.log("CALLED 4");
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
        console.error("Error creating user:", error);
        return res.status(400).end();
    }
}

module.exports = {
    createNewUser,
    updateUser,
    getUser,
};
