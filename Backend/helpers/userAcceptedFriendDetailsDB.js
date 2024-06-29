const connection = require('../utilities/db.js');
const express = require("express");
const app = express();

module.exports = async function usergetDB(newMemberData) {
    let { user_id } = newMemberData;
    var userfriendsData = {
        message: null,
        data: null
    }

    try {
        let userAcceptedFriendsData = await new Promise(function (resolve, reject) {
            const query = 'SELECT friend_id,friend_name,id,friend_gender FROM friends_list WHERE user_id = ?';
            connection.query(query, [user_id], (err, results) => {
                if (err) {
                    userfriendsData.message = 'Error fetching data';
                    resolve(userfriendsData);
                } else {
                    if (results.length > 0) {
                        userfriendsData.message = 'Available Friends List';
                        userfriendsData.data = results;
                        resolve(userfriendsData);

                    } else {
                        userfriendsData.message = 'No Friends Available';
                        resolve(userfriendsData);
                    }
                }

            })
        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            userfriendsData.message = err;
            return (userfriendsData);
        });
        return (userAcceptedFriendsData);
    } catch (err) {

        userfriendsData.message = 'error while finding user data from database';
        return (userfriendsData);
    }

};