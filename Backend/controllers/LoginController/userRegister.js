/*
Usage of Controller :
    1. Read data comming from UI
    2. Write all the business logic
    3. If logic satisfies --> create/send data which you want to store in database to helper-->function
    4. Once helper function is executed, send the appropriate response to UI
*/

var userRegisterDBController = require('../../helpers/userRegisterDB');

module.exports = async function (req, res, next) {
    const {username,email,password,gender} = req.body; 
    // console.log("userRegisterDBController",req.body);
        var newMember = {
        userName: username,
        userEmail: email,
        userPassword: password,
        userGender: gender,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await userRegisterDBController(newMember);
    // console.log("userRegisterController",message);
    res.send(message);
}
