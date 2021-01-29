// "use strict";
const SignUp = require("../models/SignUp");
const mongoose = require("mongoose");
// const config = require("../config/db");
const bcrypt = require("bcryptjs");
var _ = require("lodash");
const jwt = require("jsonwebtoken");

async function addSignUp(req, res) {
    try {
        let checkEmail = await SignUp.findOne({ email: req.body.email });
        if (checkEmail) {
            res.status(200).send({
                success: false,
                message: "duplicate",
                code: 422
            })
        } else {
            let newUser = new SignUp(req.body);
            const result = await newUser.save();

            const userPick = _.pick(newUser, [
                "name", "email", "password"
            ])

            const token = jwt.sign(userPick, process.env.SECRET, {
                expiresIn: '1d' //1 day
            });
            result
                ? res.status(200).send({
                    success: true,
                    message: "SignUp registered",
                    res: {
                        token: token,
                        user: {
                            id: newUser._id,
                            email: newUser.email
                        }
                    }
                })
                : res
                    .status(422)
                    .send({ success: false, message: "fail to register", res: result });

        }

    } catch (err) {
        console.log(err);
        res.send(err);
    }
}
async function getSignUps(req, res) {
    try {
        var limit = req.body.pageSize || 5;
        var pageNum = req.body.page || 1;

        var skip = limit * (pageNum - 1);

        let SignUpCount = await SignUp.count();
        const result = await SignUp.find().select('name email occupation profilePicUrlUrl')
        .limit(parseInt(limit)).skip(parseInt(skip));;
        result
            ? res.status(200).send({
                success: true,
                message: "all SignUps",
                res: result,
                count:SignUpCount
            })
            : res.status(422).send({
                success: false,
                message: "not getting any SignUp"
            });
    } catch (err) {
        res.send(err);
    }
}

async function editSignUp(req, res) {
    try {
        const result = await SignUp.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    profilePicUrlUrl: req.body.profilePicUrlUrl
                }
            }
        );
        result
            ? res.status(200).send({
                success: true,
                message: "data is successfully edit",
                res: result
            })
            : res.status(422).send({
                success: false,
                message: "data not edit"
            });
    } catch (err) {
        console.log("catch err in get user profile update........", err);
        res.send(err);
    }
}

async function authenticateSignUp(req, res) {
    let password = req.body.password;
    let email = req.body.email;

    await SignUp.findOne({ email: email }).exec((err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "email or password mismatch" });
        } else {
            user.comparedPassword(password, (error, isMatch) => {
                if (isMatch && !error) {

                    const userPick = _.pick(user, [
                        "name", "email", "password"
                    ])

                    const token = jwt.sign(userPick, process.env.SECRET, {
                        expiresIn: '1d' //1 day
                    });
                    res.json({
                        success: true,
                        token: token,
                        user: {
                            id: user._id,
                            email: user.email,
                            name:user.name,
                            image: user.profilePicUrl
                        }
                    });
                } else {
                    return res.json({ success: false, msg: "email or password mismatch" });
                }
            })
        }

    })
}

async function getSpecificSignUp(req, res) {
    try {
        const result = await SignUp.findById({
            _id: req.params.id
        }).select("-password")
        result ? res.status(200).send({
            message: "particular SignUp is recieved",
            success: true,
            Data: result
        }) :
            res.status(422).send({
                message: "particular SignUp is not recieved",
                success: false
            })
    } catch (error) {
        res.send(error);
    }
}

async function deleteSignUp(req, res) {
    try {
        let result = await SignUp.findByIdAndDelete({
            _id: req.params.id
        }).remove();

        result ? res.status(200).send({
            message: 'SignUp deleted successfully',
            success: true,
            res: result
        }) :
            res.status(422).send({
                success: false,
                message: 'SignUp not deleted'
            });
    } catch (error) {
        res.send(error);
    }
}
module.exports = {
    addSignUp,
    editSignUp,
    authenticateSignUp,
    getSignUps,
    getSpecificSignUp,
    deleteSignUp
};
