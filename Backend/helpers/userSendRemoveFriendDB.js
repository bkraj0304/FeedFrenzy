

const connection = require('../utilities/db.js');
const express= require("express");
const app=express();

module.exports = async function userRemoveFriendDB(newMemberData) {
    let {user_id,friend_id} = newMemberData;
    // console.log("userRemoveFriendDB",user_id,friend_id)
    var removefriendReqest={
        message: null,
    }  
     // console.log(postid);
    try {
        // Delete the post
        let removeFriend = await new Promise(function (resolve, reject) {
            const deleteQuery = 'DELETE FROM friends_list WHERE (user_id = ? AND friend_id=?) OR (user_id = ? AND friend_id=?) ';
            connection.query(deleteQuery, [user_id,friend_id,friend_id,user_id], (err, results) => {
                if (err) {
                    removefriendReqest.message='Error Removing Friend';
                    resolve(removefriendReqest);
                } else {
                    removefriendReqest.message='Friend Remove Successfully';
                    
                    resolve(removefriendReqest);
                }
            });
        });
        
        return removeFriend;

    } catch (err) {
        removefriendReqest.message='Error processing request';
        console.log('Error:', err);
        return (removefriendReqest);
    }

};

