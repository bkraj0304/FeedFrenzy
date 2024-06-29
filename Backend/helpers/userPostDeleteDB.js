const connection = require('../utilities/db.js');
const express= require("express");
const app=express();

module.exports = async function userPostdeleteDB(newMemberData) {
    let { postid } = newMemberData;
    // console.log(postid);
    try {
        // Delete the post
        let deleteResult = await new Promise(function (resolve, reject) {
            const deleteQuery = 'DELETE FROM user_posts WHERE post_id = ?';
            connection.query(deleteQuery, [postid], (err, results) => {
                if (err) {
                    resolve('Error deleting post');
                } else {
                    
                    resolve('Post deleted successfully');
                }
            });
        });
        
        return deleteResult;

    } catch (err) {
        console.log('Error:', err);
        return 'Error processing request';
    }

};

