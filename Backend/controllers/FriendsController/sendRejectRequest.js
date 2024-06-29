var sendRejectRequestDB = require('../../helpers/userSendRejectRequestDB');

module.exports = async function (req, res, next) {
    // console.log("New",req.body);
    const { friendId, userId}=req.body;

    // console.log(req.body);
        var newMember = {
        user_id: userId,
        friend_id: friendId,
    };



    // console.log("newMember",newMember);
    let message = await sendRejectRequestDB(newMember);
    // console.log("sendRejectRequestDB",message.message);
    res.send(message);
}