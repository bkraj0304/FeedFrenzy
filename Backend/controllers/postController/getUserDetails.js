var getUserDetailsDB = require('../../helpers/userProfileDetailsDB');

module.exports = async function (req, res, next) {
    const {userId}=req.body
    // console.log("getFriendsPostsDB",userId);
    // console.log("22",title,content,user_id)
    
        var newMember = {
        user_id: userId,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await getUserDetailsDB(newMember);
    // console.log("getUserDetails",message);
    res.send(message);
}
