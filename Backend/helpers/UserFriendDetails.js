const connection = require('../utilities/db.js');
const express= require("express");
const app=express();

module.exports = async function usergetDB(newMemberData) {
    let { user_id } = newMemberData;
    var friendDetails={
        message: null,
        data: null
    }
    try{
        let availableFriendsData = await new Promise(function (resolve, reject){
            const query ='SELECT user_id,user_name,user_gender FROM user_info WHERE user_id != ?';
            connection.query(query, [user_id], (err, results)=>{
                if (err) {
                    resolve('Error fetching data');
                } else{
                    if (results.length > 0){
                        // console.log("")
                        friendDetails.message='Valid Credentials';
                        friendDetails.data=results;
                        resolve(friendDetails);
                    }else {
                        friendDetails.message='InValid Credentials';
                        resolve(friendDetails);
                    }
                }
            })
        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            friendDetails.message=err;
            return (friendDetails);
            
        });
        return (availableFriendsData);
    }catch (err) {
        console.log('error while finding user data from database');
        friendDetails.message="Error";
        return (friendDetails);
        
    }

};