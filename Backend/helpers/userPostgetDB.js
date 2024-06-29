const connection = require('../utilities/db.js');
const express= require("express");
const app=express();

module.exports = async function userPostgetDB(newMemberData) {
    let { user_id } = newMemberData;
    // console.log(user_id);
    try{
        let usergetPostsData = await new Promise(function (resolve, reject){
            const query = 'SELECT * FROM user_posts WHERE user_id = ?';
            connection.query(query, [user_id], (err, results)=>{
                if (err) {
                    resolve('Error fetching data');
                } else{
                    if (results.length > 0){
                        // console.log("Raj3",results);
                        resolve(results);
                    }else {
                        resolve('Invalid credentials');
                    }
                }
            })
        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            return ('Exception: Error Reading data',err);
        });
        return (usergetPostsData);
    }catch (err) {
        console.log('error while finding user data from database');
        return ('Error');
    }

};