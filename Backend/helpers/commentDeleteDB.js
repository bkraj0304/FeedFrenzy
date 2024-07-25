const connection = require('../utilities/db.js');
const express= require("express");
const app=express();

module.exports = async function userCommentdeleteDB(newMemberData) {
    let { commentid } = newMemberData;
    // console.log(postid);
    try {
        // Delete the post
        let deleteResult = await new Promise(function (resolve, reject) {
            const deleteQuery = 'DELETE FROM user_comments WHERE comment_id = ?';
            connection.query(deleteQuery, [commentid], (err, results) => {
                if (err) {
                    resolve({message:'Error Deleting Comment'});
                } else {
                    
                    resolve({message:'comment deleted Successfully'});
                }
            });
        });
        
        return deleteResult;

    } catch (err) {
        console.log('Error:', err);
        return ({message:'Error in commentDelete'});
    }

};

