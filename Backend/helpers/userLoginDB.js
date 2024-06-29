const connection = require('../utilities/db.js');
const bcrypt = require('bcrypt');
const express= require("express");
const app=express();

module.exports = async function userLoginDB(newMemberData) {
    let { userName, userPassword } = newMemberData;
    try {
        let userLoginData = await new Promise(function (resolve, reject) {
            const query = 'SELECT * FROM user_info WHERE user_name = ?';
            connection.query(query, [userName], (err, results) => {
                if (err) {
                    resolve('Error fetching data');
                } else {
                    if (results.length > 0) {
                        const user = results[0];
                        // console.log("Password",userPassword,user.user_password);
                        bcrypt.compare(userPassword, user.user_password, (err, isMatch) => {
                            if (err) {
                                resolve('Error comparing passwords');
                            } else if (isMatch) {
                                // console.log(user.user_id);
                                var data_object={
                                    message: 'Login successful',
                                    user_id: user.user_id,
                                    userGender: user.user_gender,
                                }
                                // resolve('Login successful');
                                resolve(data_object);
                            } else {
                                resolve('Invalid credentials');
                            }
                        });
                    } else {
                        resolve('Invalid credentials');
                    }
                }
            });

        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            return ('Exception: Error Reading data',err);
        });
        return (userLoginData);
    } catch (err) {
        console.log('error while finding user data from database');
        return ('Error');
    }
};