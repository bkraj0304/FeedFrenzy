

const connection = require('../utilities/db.js');
const express= require("express");
const app=express();

module.exports = async function userPostdeleteDB(newMemberData) {
    let {user_id,friend_id  } = newMemberData;
    var rejectfriendReqest={
        message: null,
    }  
     // console.log(postid);
    try {
        // Delete the post
        let deleteResult = await new Promise(function (resolve, reject) {
            const deleteQuery = 'DELETE FROM friends_request WHERE userId_RequestedFrom = ? AND userId_RequestedTo=?';
            connection.query(deleteQuery, [friend_id,user_id], (err, results) => {
                if (err) {
                    rejectfriendReqest.message='Error Rejecting post';
                    resolve(rejectfriendReqest);
                } else {
                    rejectfriendReqest.message='Request Rejected Successfully';
                    
                    resolve(rejectfriendReqest);
                }
            });
        });
        
        return deleteResult;

    } catch (err) {
        rejectfriendReqest.message='Error processing request';
        console.log('Error:', err);
        return (rejectfriendReqest);
    }

};

