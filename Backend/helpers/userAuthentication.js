var fs = require("fs");
var jwt= require('jsonwebtoken');
var {jwtKey} =require('../config/authKey');
let userAuthController = require('./userLoginDB');

async function createJWT(userName) {
    try {
        let jwtToken = await new Promise(function (resolve, reject) {
            jwt.sign({userName: userName}, jwtKey, function (err, generated_token) {
                if (err) {
                    throw new Error('Could not create JWT')
                }
                resolve(generated_token);
            });

        }).then(function (token) {
            return token;
        }).catch(function (err) {
            console.log('error while creating Token');
            return err;
        });
        return jwtToken;
    } catch (err) {
        console.log('error while creating Token');
        return "Exception: Error while creating jwt Token";
    }
}

module.exports={createJWT};