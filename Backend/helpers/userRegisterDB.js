const connection =require('../utilities/db.js'); 
const bcrypt=require('bcrypt');


module.exports = async function userRegisterDB(newMemberData) {
    let {userName,userEmail,userPassword,userGender} = newMemberData; 
    try {

        let userRegisterationData = await new Promise(function (resolve, reject) { 
            const query = 'INSERT INTO user_info (user_name, user_email, user_password,user_gender) VALUES (?, ?, ?,?)';
            bcrypt.hash(userPassword,10,(err, hashedPassword)=>{
                if(err){
                    // console.error('Error hashing password:', err);
                    resolve('Error hashing password');
                } else{
                    // console.log("2",userName,userEmail,hashedPassword);
                    connection.query(query, [userName, userEmail, hashedPassword,userGender], (err, result) => { 
                    if (err) {
                        // console.error('Error inserting data:', err);
                        resolve('Error inserting data');
                    } else {

                        // console.log("1 record inserted");
                        resolve('User registered successfully');
                    }
                    });
                }
                });
        }).then(function (data) {
            // console.log("Here",data)
            return data
        }).catch(function (err) {
            // console.log('error while finding data from db');
            return('Exception: Error inserting data');
        });
        return (userRegisterationData);
    } catch (err) {
        console.log('error while finding user data from database');
        return ('Error');
    }
};