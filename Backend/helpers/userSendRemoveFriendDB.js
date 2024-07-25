

// const connection = require('../utilities/db.js');
// const express= require("express");
// const app=express();

// module.exports = async function userRemoveFriendDB(newMemberData) {
//     let {user_id,friend_id} = newMemberData;
//     // console.log("userRemoveFriendDB",user_id,friend_id)
//     var removefriendReqest={
//         message: null,
//     }  
//      // console.log(postid);
//     try {
//         // Delete the post
//         let removeFriend = await new Promise(function (resolve, reject) {
//             const deleteQuery = 'DELETE FROM friends_list WHERE (user_id = ? AND friend_id=?) OR (user_id = ? AND friend_id=?) ';
//             connection.query(deleteQuery, [user_id,friend_id,friend_id,user_id], (err, results) => {
//                 if (err) {
//                     removefriendReqest.message='Error Removing Friend';
//                     resolve(removefriendReqest);
//                 } else {
//                     removefriendReqest.message='Friend Remove Successfully';
                    
//                     resolve(removefriendReqest);
//                 }
//             });
//         });
        
//         return removeFriend;

//     } catch (err) {
//         removefriendReqest.message='Error processing request';
//         console.log('Error:', err);
//         return (removefriendReqest);
//     }

// };




const connection = require('../utilities/db.js');
const express = require("express");
const app = express();

module.exports = async function userRemoveFriendDB(newMemberData) {
    let { user_id, friend_id } = newMemberData;
    var removefriendReqest = {
        message: null,
    };

    try {
        // Start a transaction
        await new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        // Delete from friends_list
        await new Promise((resolve, reject) => {
            const deleteFriendsListQuery = 'DELETE FROM friends_list WHERE (user_id = ? AND friend_id=?) OR (user_id = ? AND friend_id=?)';
            connection.query(deleteFriendsListQuery, [user_id, friend_id, friend_id, user_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        // Delete from friends_request
        await new Promise((resolve, reject) => {
            const deleteFriendsRequestQuery = 'DELETE FROM friends_request WHERE (userId_RequestedFrom = ? AND userId_RequestedTo=?) OR (userId_RequestedTo= ? AND userId_RequestedFrom=?)';
            connection.query(deleteFriendsRequestQuery, [user_id, friend_id, friend_id, user_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        // Commit the transaction
        await new Promise((resolve, reject) => {
            connection.commit(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        removefriendReqest.message = 'Friend Remove Successfully';
        return removefriendReqest;

    } catch (err) {
        // Rollback the transaction in case of error
        await new Promise((resolve, reject) => {
            connection.rollback(() => {
                resolve();
            });
        });

        removefriendReqest.message = 'Error processing request';
        console.log('Error:', err);
        return removefriendReqest;
    }
};
