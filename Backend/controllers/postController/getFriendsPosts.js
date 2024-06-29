var getFriendsPostsDB = require('../../helpers/userFriendsPostsDB');

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
    let message = await getFriendsPostsDB(newMember);
    // console.log("getDBController",message);
    res.send(message);
}
