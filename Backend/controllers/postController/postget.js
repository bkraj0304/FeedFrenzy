var postgetDBController = require('../../helpers/userPostgetDB');

module.exports = async function (req, res, next) {
    const userId=req.query.userId
    // console.log("22",title,content,user_id)
    // console.log(req.body);
        var newMember = {
        user_id: userId,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await postgetDBController(newMember);
    console.log("postgetDBController",message);
    res.send(message);
}