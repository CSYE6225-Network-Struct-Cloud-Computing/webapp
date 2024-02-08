const { User } = require("../models");
const bcrypt = require("bcrypt");

async function updateUser(req, res) {
    try {
        const { first_name, last_name, password } = req.body;

        if (!first_name && !last_name && !password) {
            return res.status(204).end();
        }

        // console.log("REQ User : ", req.user);
        const username = req.user.username;
        // console.log("UserName Auth wala", username);

        const user = req.user;

        if (first_name) {
            user.firstName = first_name;
        }
        if (last_name) {
            user.lastName = last_name;
        }
        if (password) {
            const BcryptPassword = await bcrypt.hash(password, 10);
            user.password = BcryptPassword;
        }
        user.account_updated = new Date();
        // console.log("Final User ", user);

        await User.update(user, { where: { username: username } });

        return res.status(201).end();
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
            first_name: user.firstName,
            last_name: user.lastName,
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

        if (!first_name || !last_name || !password || !regex.test(username)) {
            return res.status(400).end();
        }

        const chechIfExistingUser = await User.findOne({ where: { username } });
        if (chechIfExistingUser) {
            return res.status(400).end();
        }

        const BcryptPassword = await bcrypt.hash(password, 10);

        const newCreatedUser = await User.create({
            firstName: first_name,
            lastName: last_name,
            username: username,
            password: BcryptPassword,
        });

        return res.status(201).end();
        // .json({
        //     id: newCreatedUser.id,
        //     first_name: newCreatedUser.firstName,
        //     last_name: newCreatedUser.lastName,
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
