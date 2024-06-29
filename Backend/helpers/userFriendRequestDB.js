const connection = require('../utilities/db.js');
const express = require("express");
const app = express();

module.exports = async function userFriendRequestDB(newMemberData) {
    let { sender_id } = newMemberData;

    var friendReqestDB = {
        message: null,
        data: null
    }
    try {
        let usergetRequest = await new Promise(function (resolve, reject) {
            const query = `SELECT fr.req_id,
                        fr.userId_RequestedFrom,
                        fr.sender_name AS RequestedFromUserName,
                        ufrom.user_gender AS RequestedFromUserGender,
                        fr.userId_RequestedTo,
                        fr.receiver_name AS RequestedToUserName,
                        uto.user_gender AS RequestedToUserGender,
                        fr.req_status,
                        fr.Requestedon
                        FROM 
                        friends_request fr
                        JOIN 
                        user_info ufrom ON fr.userId_RequestedFrom = ufrom.user_id
                        JOIN 
                        user_info uto ON fr.userId_RequestedTo = uto.user_id
                        WHERE
                        fr.userId_RequestedTo = ? AND fr.req_status = "Not-Accepted" `;
            connection.query(query, [sender_id], (err, results) => {
                if (err) {
                    // console.log("Error fetching data");
                    friendReqestDB.message = "Error while fetching friend Requests";
                    resolve(friendReqestDB);
                } else {
                    // console.log("Result",results);
                    if (results.length > 0) {
                        friendReqestDB.message = "Friend Requests List:";
                        friendReqestDB.data = results;

                        // console.log("Raj3",results);
                        resolve(friendReqestDB);
                    } else {
                        friendReqestDB.message = "No Freiend Request Available";
                        resolve(friendReqestDB);
                    }
                }
            })
        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            friendReqestDB.message = err;
            return (friendReqestDB);
        });
        return (usergetRequest);
    } catch (err) {
        // console.log('error while finding user data from database');
        friendReqestDB.message = err;
        return (friendReqestDB);
    }

};