var createTokenController = require('../../helpers/userAuthentication');
var userLoginDBController = require('../../helpers/userLoginDB');


module.exports = async function (req, res, next){
    const {username,password} = req.body; 
    // console.log(req.body);
        var newLogin = {
        userName: username,
        userPassword: password,
    
    };
    // console.log("newMember",newLogin);
    let object_received = await userLoginDBController(newLogin);
    // console.log("userLoginController",object_received);
    var object ={
        jwtToken:null,
        message:'Invalid User Credentials',
        userDetails: {
            username: null,
            userid: null,
            userGender:null,
        }
    };
    // console.log(object_received);
    if(object_received.message=="Login successful"){
        token = await createTokenController.createJWT(username);
        // console.log("Generated Token",token);
        object = {...object, jwtToken:token, message:'Login successful',userDetails:{
            username:username,
            userid: object_received.user_id,
            userGender:object_received.userGender,
        }};

    }
    res.send(object);
}