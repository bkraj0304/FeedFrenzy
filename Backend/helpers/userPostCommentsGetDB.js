const connection = require('../utilities/db.js');
const express= require("express");
const app=express();

module.exports = async function userPostCommentgetDB(newMemberData) {
    let { postId } = newMemberData;
    console.log(postId);
    var commentsDetails={
        message: null,
        data: null
    }
    // console.log(user_id);
    try{
        let userPostsCommentData = await new Promise(function (resolve, reject){
            const query = 'SELECT * FROM user_comments WHERE postId = ?';
            connection.query(query, [postId], (err, results)=>{
                if (err) {
                    // resolve('Error fetching data');
                    commentsDetails.message="Error fetching data";
                    resolve(commentsDetails);

                } else{
                    console.log("Comments",results);
                    if (results.length > 0){
                        // console.log("Raj3",results);
                        commentsDetails.message="Comments Fetched Successfully";
                        commentsDetails.data=results;
                        resolve(commentsDetails);
                    }else {
                        commentsDetails.message="Invalid credentials";
                        resolve(commentsDetails);
                        // resolve('Invalid credentials');
                    }
                }
            })
        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            commentsDetails.message="Exception: Error Reading data"+err;
            return(commentsDetails);
            // return ('Exception: Error Reading data',err);
        });
        return (userPostsCommentData);
    }catch (err) {
        commentsDetails.message="error while finding user data from database";
        return(commentsDetails);
    }

};