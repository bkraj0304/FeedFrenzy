var sendAcceptRequestDB = require('../../helpers/usersendAcceptReqDB');

module.exports = async function (req, res, next) {
    // console.log("New",req.body);
    const {friendId, friendName,friendGender, sender_id, sender_name,senderGender }=req.body;

    // console.log(req.body);
        var newMember = {
        sender_id: sender_id,
        sender_name:sender_name,
        senderGender:senderGender,
        friendId: friendId,
        friendName: friendName,
        friendGender: friendGender,
    };



    // console.log("newMember",newMember);
    let message = await sendAcceptRequestDB(newMember);
    // console.log("sendAcceptRequestDB",message.message.message);
    res.send(message);
}