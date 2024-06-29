var userRequestsendDB = require('../../helpers/userRequestsendDB');

module.exports = async function (req, res, next) {
    // console.log("New",req.body);
    const {req_id,sender_id,sender_name,receiver_name}=req.body;

    // console.log(req.body);
        var newMember = {
        sender_id: sender_id,
        req_id: req_id,
        sender_name:sender_name,
        receiver_name:receiver_name,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await userRequestsendDB(newMember);
    // console.log("postgetDBController",message);
    res.send(message);
}