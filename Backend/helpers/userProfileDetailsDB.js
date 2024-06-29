const connection = require('../utilities/db.js');
const bcrypt = require('bcrypt');
const express= require("express");
const app=express();

module.exports = async function userProfileDB(newMemberData) {
    let { user_id } = newMemberData;
    var userDetails={
        message: null,
        data: null
    }
    try {
        let userProfileDetails= await new Promise(function (resolve, reject) {
            const query = 'SELECT * FROM user_info WHERE user_id = ?';
            connection.query(query, [user_id], (err, results) => {
                if (err) {
                    resolve('Error fetching data');
                } else {
                    if (results.length > 0) {
                        userDetails.message="Details Fetched Successfully";
                        userDetails.data=results;
                        resolve(userDetails);
                        
                    } else {
                        userDetails.message="Details Not Fetched";
                        resolve(userDetails);
                    }
                }
            });

        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            // return ('Exception: Error Reading data',err);
            userDetails.message='Exception: Error Reading data'+err;
            return(userDetails);

        });
        return (userProfileDetails);
    } catch (err) {
        userDetails.message='error while finding user data from database';
        return(userDetails);
    }
};