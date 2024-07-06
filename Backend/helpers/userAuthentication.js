
var fs = require("fs");
var jwt = require('jsonwebtoken');
var { jwtKey } = require('../config/authKey');
const connection = require('../utilities/db.js');

function verifyJWT(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, jwtKey, async function (err, decoded) {
            if (err) {
                return reject(new Error('Could not decode JWT'));
            }
            // console.log("Decoded", decoded.userName);
            let userName = decoded.userName;

            const query = 'SELECT * FROM user_info WHERE user_name = ?';
            connection.query(query, [userName], (err, results) => {
                if (err) {
                    return reject(new Error('Error fetching data from database'));
                } else {
                    if (results.length > 0) {
                        resolve({ message: "User Verified", user: decoded });
                    } else {
                        resolve({ message: "User Not Verified" });
                    }
                }
            });
        });
    }).catch(function (err) {
        console.log('Error verifying token');
        console.log(err);
        return { message: 'Error verifying token', error: err };
    });
}

async function createJWT(userName) {
    try {
        let jwtToken = await new Promise(function (resolve, reject) {
            jwt.sign({ userName: userName }, jwtKey, function (err, generated_token) {
                if (err) {
                    return reject(new Error('Could not create JWT'));
                }
                resolve(generated_token);
            });
        }).catch(function (err) {
            console.log('Error while creating token');
            return err;
        });
        return jwtToken;
    } catch (err) {
        console.log('Error while creating token');
        return "Exception: Error while creating JWT token";
    }
}

module.exports = {
    createJWT: createJWT,
    verifyJWT: verifyJWT
};
