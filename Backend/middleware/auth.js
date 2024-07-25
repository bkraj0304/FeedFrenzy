var {verifyJWT} = require('../helpers/userAuthentication');

module.exports =async function(req,res,next){
    let token = req.headers.token;
    console.log("Token",token);
    try{
        let isVerified = await verifyJWT(token);
        // console.log("Token Message",isVerified.message);
        if(isVerified.message=="User Verified"){
            // console.log("yES");
            next();
        }
    }
    catch(err){
      console.log('error: authentication middleware')
        res.send(err);

    }    
}