var userFriendRequestDB = require('../../helpers/userFriendRequestDB');

module.exports = async function (req, res, next) {
    const sender_id=req.query.userId;
        var newMember = {
        sender_id:sender_id,
    };
    const friendRequest={
        message: null,
        data: null
    };

    let message = await userFriendRequestDB(newMember);
    // console.log("userFriendRequestDB",message);
    res.send(message);
}