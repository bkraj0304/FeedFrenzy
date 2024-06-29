var userAcceptedFriendDetails = require('../../helpers/userAcceptedFriendDetailsDB');

module.exports = async function (req, res, next) {
    // console.log("23");
    const {sender_id}=req.body;
    // console.log("23",sender_id);
    // console.log(req.body);
        var newMember = {
        user_id: sender_id,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let userAcceptFriendList = await userAcceptedFriendDetails(newMember);
    // console.log("userAcceptedFriendDetails ",userAcceptFriendList);
    
    res.send(userAcceptFriendList );
}