var userFriendDetails = require('../../helpers/UserFriendDetails');

module.exports = async function (req, res, next) {
    const userId=req.query.userId;
    // console.log("22",userId)
    // console.log(req.body);
        var newMember = {
        user_id: userId,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await userFriendDetails(newMember);
    // console.log("postgetDBController1",message);
    res.send(message);
}